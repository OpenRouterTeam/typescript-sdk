import { OpenRouter } from '@openrouter/sdk'
import z from 'zod'

const openRouter = new OpenRouter()



const chatResponse = await openRouter.chat.experimental_send({
    model: "openai/gpt-4o",
    messages: [
        {
            role: "user",
            content: "What is the weather in Bogotá, Colombia?",
        },
    ],
    stream: false,
    tools: [
        {
            "type": "mcp",
            "server_label": "dmcp",
            "server_description": "A Dungeons and Dragons MCP server to assist with dice rolling.",
            "server_url": "https://dmcp-server.deno.dev/sse",
            "require_approval": "never"
        },
        {
            type: 'function',
            function: {
                name: "get_weather",
                description: "Get current temperature for a given location.",
                parameters: z.object({
                    location: z.string().describe("City and country e.g. Bogotá, Colombia"),
                }).strict(),
                // Required
                returns: z.object({
                    temperature: z.number(),
                    description: z.string(),
                }).describe("Temperature and description of the weather"),

                // if a function is provided, it will be called with the parameters and the result will be returned, re-calling the model again
                // rather then simply having the tool call be the final response
                run: async (parameters) => {
                    // type checking will enfoce that the return value matches the schema defined in returns
                    return {
                        temperature: 20,
                        description: "Clear skies",
                    }
                }
            }
        }
    ],
    outputSchema: z.object({
        temperature: z.number(),
        description: z.string(),
    }),
})

if ('choices' in chatResponse) {
    // chatResponse 
    // the raw response from the API in openai chat format
    chatResponse.choices[0].message
    // Will contain all the new turns of the conversation. all tool calls and responses are fully typed
    // and cleaned up to not have choices etc. a more user friendly version of the raw response
    chatResponse.allNewMessages
    // Will contain the final message of the conversation. content is always an array. all tool calls and responses are fully typed
    chatResponse.responseMessage
    // The text only response of the conversation or null if the final response was a tool call
    chatResponse.responseText
    // The final message of the conversation as a fully typed function call
    chatResponse.responseFunctionCall
    // the output that is fully validated and typed in json/object/array format
    chatResponse.output

} else {
    // chatResponse is a stream
    for await (const chunk of chatResponse.fullStream) {
        // the raw response from the API in openai chat streaming format
        chunk.raw.data.choices[0].delta
        // the chunked version of allNewMessages
        chunk.message
    }

    for await (const chunk of chatResponse.response) {

        // the chunked version of the final response message only with all content chunks and fully typed
        chunk.message
        // Just the text content of the final response message or null
        chunk.text
        // The final message of the conversation as a fully typed function call
        chunk.functionCall
        // the output that is fully validated and typed in json/object/array format
        chunk.output
    }
}

// openRouter.beta.responses.send({
//     tools: [
//         {
//             "type": "mcp",
//             "server_label": "dmcp",
//             "server_description": "A Dungeons and Dragons MCP server to assist with dice rolling.",
//             "server_url": "https://dmcp-server.deno.dev/sse",
//             "require_approval": "never"
//         },
//         {
//             type: 'function',
//             name: "get_weather",
//             description: "Get current temperature for a given location.",
//             parameters: z.object({
//                 location: z.string().describe("City and country e.g. Bogotá, Colombia"),
//             }).strict(),
//         }
//     ]
// })

