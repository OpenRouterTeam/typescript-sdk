"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OAUTH_CALLBACK_URL } from "@/lib/config";
import { ExternalLink, Key, MessageSquare, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { OpenRouterCore } from "@openrouter/sdk/core";
import { oAuthPostAuthKeys } from "@openrouter/sdk/funcs/oAuthPostAuthKeys";
import { useRouter } from "next/navigation";

const OPENROUTER_AUTH_URL = new URL("https://openrouter.ai/auth");
OPENROUTER_AUTH_URL.searchParams.append("callback_url", OAUTH_CALLBACK_URL);

export default function Page({ searchParams }: PageProps<"/">) {
  const [connectionState, setConnectionState] = useState<
    "disconnected" | "connecting" | "connected" | "initializing" | "error"
  >("initializing");
  const [code, setCode] = useState<string>();

  useEffect(() => {
    if (localStorage.getItem("openrouter_key"))
      return setConnectionState("connected");

    searchParams.then((p) => {
      if (p.code) {
        setConnectionState("connecting");
        setCode(p.code.toString());
      } else if (p.error) {
        setConnectionState("error");
      } else setConnectionState("disconnected");
    });
  }, [searchParams]);

  switch (connectionState) {
    case "initializing":
      return <InitializingPageContent />;
    case "connecting":
      return <ConnectingPageContent code={code!} />;
    default:
      return <DisconnectedPageContent />;
  }
}

function InitializingPageContent() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-balance">ACME Chat</h1>
        </div>
        <p className="text-muted-foreground text-lg text-balance">
          Initializing...
        </p>
      </div>
    </div>
  );
}

function ConnectingPageContent(props: { code: string }) {
  const router = useRouter();
  const openRouter = new OpenRouterCore();

  oAuthPostAuthKeys(openRouter, { code: props.code }).then((result) => {
    if (!result.ok) return;

    if ("key" in result.value) {
      localStorage.setItem("openrouter_key", result.value.key);
    }

    if (result.value.userId) {
      localStorage.setItem("openrouter_user_id", result.value.userId);
    }

    router.push("/");
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-balance">AI Chat</h1>
        </div>
        <p className="text-muted-foreground text-lg text-balance animate-bounce">
          Connecting with code: {props.code}
        </p>
      </div>
    </div>
  );
}

function DisconnectedPageContent() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-balance">AI Chat</h1>
        </div>
        <p className="text-muted-foreground text-lg text-balance">
          Connect your OpenRouter account to start chatting with AI models
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            <CardTitle>OpenRouter Integration</CardTitle>
          </div>
          <CardDescription>
            Securely connect your OpenRouter account to access multiple AI
            models through a single API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Multiple Models</p>
                  <p className="text-xs text-muted-foreground">
                    Access GPT, Claude, and more
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Key className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Secure OAuth</p>
                  <p className="text-xs text-muted-foreground">
                    Safe authentication flow
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Easy Setup</p>
                  <p className="text-xs text-muted-foreground">
                    One-click connection
                  </p>
                </div>
              </div>
            </div>

            <a
              href={OPENROUTER_AUTH_URL.toString()}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="w-full" size="lg">
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Connect OpenRouter Account
                </>
              </Button>
            </a>

            <p className="text-xs text-muted-foreground text-center mt-2">
              By connecting, you agree to OpenRouter&apos;s terms of service and
              privacy policy.
              <br />
              Your API key will be securely stored and encrypted.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What is OpenRouter?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            OpenRouter provides unified access to multiple AI models including
            GPT-4, Claude, Gemini, and many others through a single API. Connect
            your account to start chatting with the latest AI models with
            competitive pricing and reliable performance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
