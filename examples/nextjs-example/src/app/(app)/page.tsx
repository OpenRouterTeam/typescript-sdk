'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  OAUTH_CALLBACK_URL,
  OPENROUTER_CODE_VERIFIER_KEY,
  OPENROUTER_KEY_LOCALSTORAGE_KEY,
} from '@/lib/config';
import { useApiKey } from '@/lib/hooks/use-api-key';
import { useOpenRouter } from '@/lib/hooks/use-openrouter-client';
import { ArrowRightIcon, ExternalLink, Key, MessageSquare, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    code?: string;
    error?: string;
  }>;
}) {
  const [connectionState, setConnectionState] = useState<
    'disconnected' | 'connecting' | 'connected' | 'initializing' | 'error'
  >('initializing');
  const [code, setCode] = useState<string>();

  useEffect(() => {
    if (localStorage.getItem(OPENROUTER_KEY_LOCALSTORAGE_KEY))
      return setConnectionState('connected');

    searchParams.then((p) => {
      if (p.code) {
        setConnectionState('connecting');
        setCode(p.code.toString());
      } else if (p.error) {
        setConnectionState('error');
      } else setConnectionState('disconnected');
    });
  }, [
    searchParams,
  ]);

  switch (connectionState) {
    case 'initializing':
      return <InitializingPageContent />;
    case 'connecting':
      return <ConnectingPageContent code={code!} />;
    case 'connected':
      return <ConnectedPageContent />;
    default:
      return <DisconnectedPageContent />;
  }
}

function InitializingPageContent() {
  return (
    <div className='container mx-auto px-4 py-8 max-w-2xl'>
      <div className='text-center'>
        <div className='flex items-center justify-center gap-2 mb-4'>
          <MessageSquare className='h-8 w-8 text-primary' />
          <h1 className='text-3xl font-bold text-balance'>ACME Chat</h1>
        </div>
        <p className='text-muted-foreground text-lg text-balance'>Initializing...</p>
      </div>
    </div>
  );
}

function ConnectingPageContent(props: { code: string }) {
  const router = useRouter();
  const { client: openRouter } = useOpenRouter();
  const [, setApiKey] = useApiKey();

  useEffect(() => {
    const exchangeCode = async () => {
      const codeVerifier = localStorage.getItem(OPENROUTER_CODE_VERIFIER_KEY);

      if (!codeVerifier) {
        console.error('Code verifier not found in localStorage');
        router.push('/?error=missing_verifier');
        return;
      }

      try {
        // Exchange the authorization code for an API key using PKCE
        const result = await openRouter.oAuth.exchangeAuthCodeForAPIKey({
          code: props.code,
          codeVerifier,
          codeChallengeMethod: 'S256',
        });

        // Store the key and user ID
        if (result.key) {
          setApiKey(result.key);
        }

        // Clean up the code verifier
        localStorage.removeItem(OPENROUTER_CODE_VERIFIER_KEY);

        // Redirect to chat
        router.push('/chat');
      } catch (error) {
        console.error('Failed to exchange authorization code:', error);
        router.push('/?error=exchange_failed');
      }
    };

    exchangeCode();
  }, [
    props.code,
    router,
  ]);

  return (
    <div className='container mx-auto px-4 py-8 max-w-2xl'>
      <div className='text-center'>
        <div className='flex items-center justify-center gap-2 mb-4'>
          <MessageSquare className='h-8 w-8 text-primary' />
          <h1 className='text-3xl font-bold text-balance'>AI Chat</h1>
        </div>
        <p className='text-muted-foreground text-lg text-balance animate-bounce'>
          Connecting with code: {props.code}
        </p>
      </div>
    </div>
  );
}

function ConnectedPageContent() {
  return (
    <div className='container mx-auto px-4 py-8 max-w-2xl'>
      <div className='text-center mb-8'>
        <div className='flex items-center justify-center gap-2 mb-4'>
          <MessageSquare className='h-8 w-8 text-primary' />
          <h1 className='text-3xl font-bold text-balance'>ACME Chat</h1>
        </div>
        <p className='text-muted-foreground text-lg text-balance'>
          Connect your OpenRouter account to start chatting with AI models.
        </p>
      </div>

      <Card className='mb-6'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Key className='h-5 w-5 text-primary' />
            <CardTitle>OpenRouter Integration</CardTitle>
          </div>
          <CardDescription>
            Securely connect your OpenRouter account to access multiple AI models through a single
            API
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>You are connected to OpenRouter!</CardContent>
        <CardFooter className='flex justify-end'>
          <Link href='/chat'>
            <Button>
              Go to Chat
              <ArrowRightIcon className='h-4 w-4 mr-2' />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

function DisconnectedPageContent() {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const { client: openRouter } = useOpenRouter();

  useEffect(() => {
    const generateAuthUrl = async () => {
      // Generate PKCE code challenge
      const challenge = await openRouter.oAuth.createSHA256CodeChallenge();

      // Store the code verifier for later use in the callback
      localStorage.setItem(OPENROUTER_CODE_VERIFIER_KEY, challenge.codeVerifier);

      // Generate authorization URL with PKCE
      const url = await openRouter.oAuth.createAuthorizationUrl({
        callbackUrl: OAUTH_CALLBACK_URL,
        codeChallenge: challenge.codeChallenge,
        codeChallengeMethod: 'S256',
      });

      setAuthUrl(url);
    };

    generateAuthUrl();
  }, []);

  return (
    <div className='container mx-auto px-4 py-8 max-w-2xl'>
      <div className='text-center mb-8'>
        <div className='flex items-center justify-center gap-2 mb-4'>
          <MessageSquare className='h-8 w-8 text-primary' />
          <h1 className='text-3xl font-bold text-balance'>ACME Chat</h1>
        </div>
        <p className='text-muted-foreground text-lg text-balance'>
          Connect your OpenRouter account to start chatting with AI models
        </p>
      </div>

      <Card className='mb-6'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Key className='h-5 w-5 text-primary' />
            <CardTitle>OpenRouter Integration Demo</CardTitle>
          </div>
          <CardDescription>
            This app demonstrates how to connect to OpenRouter using OAuth 2.0 with PKCE for
            enhanced security.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='flex items-center gap-3 p-3 rounded-lg bg-muted/50'>
                <Zap className='h-5 w-5 text-primary' />
                <div>
                  <p className='font-medium text-sm'>Multiple Models</p>
                  <p className='text-xs text-muted-foreground'>Access GPT, Claude, and more</p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 rounded-lg bg-muted/50'>
                <Key className='h-5 w-5 text-primary' />
                <div>
                  <p className='font-medium text-sm'>Secure OAuth</p>
                  <p className='text-xs text-muted-foreground'>Safe authentication with PKCE</p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 rounded-lg bg-muted/50'>
                <MessageSquare className='h-5 w-5 text-primary' />
                <div>
                  <p className='font-medium text-sm'>Easy Setup</p>
                  <p className='text-xs text-muted-foreground'>One-click connection</p>
                </div>
              </div>
            </div>

            {authUrl ? (
              <a
                href={authUrl}
                rel='noreferrer'
              >
                <Button
                  className='w-full'
                  size='lg'
                >
                  <>
                    <ExternalLink className='h-4 w-4 mr-2' />
                    Connect OpenRouter Account
                  </>
                </Button>
              </a>
            ) : (
              <Button
                className='w-full'
                size='lg'
                disabled
              >
                Generating authorization URL...
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>What is OpenRouter?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            OpenRouter provides unified access to multiple AI models including GPT-4, Claude,
            Gemini, and many others through a single API. Connect your account to start chatting
            with the latest AI models with competitive pricing and reliable performance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
