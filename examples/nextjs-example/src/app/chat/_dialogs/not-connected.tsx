"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getOAuthKeyUrl } from "@/lib/config";
import { ExternalLink } from "lucide-react";

interface NotConnectedDialogProps {
  open: boolean;
}

export function NotConnectedDialog({ open }: NotConnectedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Connect to OpenRouter</DialogTitle>
          <DialogDescription>
            You need to connect your OpenRouter account to use this chat
            application. Click the button below to authenticate and start
            chatting.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-4">
          <p className="text-sm text-muted-foreground">
            OpenRouter provides access to multiple AI models including GPT-4,
            Claude, and more. Authentication is required to make API calls.
          </p>

          <Button asChild className="w-full">
            <a
              href={getOAuthKeyUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Connect to OpenRouter
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

