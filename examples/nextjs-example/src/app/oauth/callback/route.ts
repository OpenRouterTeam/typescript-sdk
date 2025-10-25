import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const state = url.searchParams.get("state");

  if (!code && !error) {
    return redirect("/?error=missing_code");
  }

  const params = new URLSearchParams();
  if (error) params.set("error", error);
  if (code) params.set("code", code);
  if (state) params.set("state", state);

  const dest = params.toString() ? `/?${params.toString()}` : "/";
  redirect(dest);
}
