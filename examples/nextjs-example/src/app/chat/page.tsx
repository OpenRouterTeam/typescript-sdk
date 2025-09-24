import { cookies } from "next/headers";
import { OpenRouter } from "@openrouter/sdk";

export default async function Page() {
  const cookieStore = await cookies();

  const openRouter = new OpenRouter({
    apiKey: cookieStore.get("openrouter_key")!.value || "",
  });

  const keyInfo = await openRouter.apiKeys.getKey();
  console.log("Key Info:", keyInfo);

  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      {cookie.name}: {cookie.value}
    </div>
  ));
}
