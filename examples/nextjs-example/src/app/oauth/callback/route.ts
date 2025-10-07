import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const codeParam = new URL(request.url).searchParams.get("code");

  if (codeParam === null) {
    return new Response("Missing code parameter", { status: 400 });
  }

  const response = await fetch("https://openrouter.ai/api/v1/auth/keys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: codeParam,
    }),
  });

  const json = await response.json();

  const cookieStore = await cookies();

  cookieStore.set("openrouter_key", json.key, {
    maxAge: 3_600, // 1 hour
  });

  cookieStore.set("openrouter_user", json.user_id, {
    maxAge: 3_600, // 1 hour
  });

  redirect("/");
}
