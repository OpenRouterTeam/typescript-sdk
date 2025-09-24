export const OAUTH_CALLBACK_URL = "http://localhost:3000/";

export const OPENROUTER_KEY_LOCALSTORAGE_KEY = "openrouter_key";
export const OPENROUTER_USER_ID_LOCALSTORAGE_KEY = "openrouter_user_id";

export function getOAuthKeyUrl() {
  const url = new URL("https://openrouter.ai/auth");
  url.searchParams.append("callback_url", OAUTH_CALLBACK_URL);
  return url.toString();
}
