import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return redirect("/?error=missing_code");
  }

  // Redirect to the main page with the code
  // The client-side code will handle the exchange using the stored code verifier
  redirect(`/?code=${code}`);
}
