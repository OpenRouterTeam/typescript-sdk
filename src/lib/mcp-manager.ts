/**
 * MCP (Model Context Protocol) Client Manager
 * Handles connections to MCP servers, tool discovery, and tool execution
 */

import { MCPClient, McpError } from "mcp-client";
import type { Tool, CallToolResult } from "@modelcontextprotocol/sdk/types.js";

/**
 * MCP Tool with server context
 */
export type MCPToolWithServer = Tool & {
  serverUrl: string;
  serverLabel: string;
};

/**
 * MCP Connection manages a single MCP server connection
 */
class MCPConnection {
  private client: MCPClient;
  private connected: boolean = false;
  private tools: Tool[] | null = null;
  private connectionPromise: Promise<void> | null = null;

  constructor(
    private serverUrl: string,
    private serverLabel: string,
  ) {
    this.client = new MCPClient({
      name: "@openrouter/sdk",
      version: "1.0.0",
    });
  }

  /**
   * Connect to the MCP server
   */
  async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    // Prevent multiple concurrent connection attempts
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = (async () => {
      try {
        await this.client.connect({
          type: "sse",
          url: this.serverUrl,
        });
        this.connected = true;
      } catch (error) {
        this.connectionPromise = null;
        throw new Error(
          `Failed to connect to MCP server ${this.serverLabel}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    })();

    return this.connectionPromise;
  }

  /**
   * Get all tools from this MCP server
   */
  async getTools(): Promise<MCPToolWithServer[]> {
    if (!this.connected) {
      await this.connect();
    }

    if (this.tools === null) {
      try {
        this.tools = await this.client.getAllTools();
      } catch (error) {
        throw new Error(
          `Failed to list tools from MCP server ${this.serverLabel}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    return this.tools.map((tool) => ({
      ...tool,
      serverUrl: this.serverUrl,
      serverLabel: this.serverLabel,
    }));
  }

  /**
   * Call a tool on this MCP server
   */
  async callTool(
    name: string,
    args: Record<string, unknown>
  ): Promise<CallToolResult> {
    if (!this.connected) {
      await this.connect();
    }

    try {
      return await this.client.callTool({
        name,
        arguments: args,
      });
    } catch (error) {
      if (error instanceof McpError) {
        throw error;
      }
      throw new Error(
        `Failed to call tool ${name} on MCP server ${this.serverLabel}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Close the connection
   */
  async close(): Promise<void> {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
      this.tools = null;
      this.connectionPromise = null;
    }
  }
}

/**
 * MCP Manager handles multiple MCP server connections
 */
export class MCPManager {
  private connections: Map<string, MCPConnection> = new Map();

  /**
   * Get or create a connection for an MCP server
   */
  private getConnection(
    serverUrl: string,
    serverLabel: string,
  ): MCPConnection {
    let connection = this.connections.get(serverUrl);
    if (!connection) {
      connection = new MCPConnection(serverUrl, serverLabel);
      this.connections.set(serverUrl, connection);
    }
    return connection;
  }

  /**
   * Get all tools from all registered MCP servers
   */
  async getAllTools(
    mcpServers: Array<{
      server_url: string;
      server_label: string;
      server_description?: string;
    }>
  ): Promise<MCPToolWithServer[]> {
    const toolPromises = mcpServers.map((server) => {
      const connection = this.getConnection(
        server.server_url,
        server.server_label,
      );
      return connection.getTools();
    });

    const toolArrays = await Promise.all(toolPromises);
    return toolArrays.flat();
  }

  /**
   * Call a tool on the appropriate MCP server
   */
  async callTool(
    serverUrl: string,
    toolName: string,
    args: Record<string, unknown>
  ): Promise<CallToolResult> {
    const connection = this.connections.get(serverUrl);
    if (!connection) {
      throw new Error(`No connection found for MCP server: ${serverUrl}`);
    }

    return connection.callTool(toolName, args);
  }

  /**
   * Close all connections
   */
  async closeAll(): Promise<void> {
    const closePromises = Array.from(this.connections.values()).map((conn) =>
      conn.close()
    );
    await Promise.all(closePromises);
    this.connections.clear();
  }

  /**
   * Close a specific connection
   */
  async close(serverUrl: string): Promise<void> {
    const connection = this.connections.get(serverUrl);
    if (connection) {
      await connection.close();
      this.connections.delete(serverUrl);
    }
  }
}
