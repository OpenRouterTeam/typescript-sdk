/*
 * HAND-MAINTAINED. This file is listed in .genignore, so Speakeasy does not
 * write it.
 *
 * It started as Speakeasy's generated src/lib/url.ts and differs in one way:
 * buildURLPath() rejects a path parameter that is exactly "." or "..".
 *
 * Why: generated operations percent-encode path parameters, which leaves "."
 * and ".." unchanged, and ClientSDK._createRequest (src/lib/sdks.ts) then
 * resolves the path with `new URL(path, baseURL)`, which collapses dot
 * segments. A path parameter of exactly ".." or "." therefore sent the
 * request, with the client's API key, to a different route. For example
 * containerId ".." turned /containers/../files/{file_id}/content into
 * /files/{file_id}/content.
 *
 * The check cannot live in an SDK hook: hooks only see the URL after it has
 * been resolved. The generator has no setting for it, and it does not emit
 * OpenAPI `pattern` constraints. The problem has been reported to Speakeasy.
 *
 * To remove: once the generator rejects or safely encodes dot segments,
 * delete the src/lib/url.ts line from .genignore and regenerate. Keep
 * tests/unit/path-param-dot-segments.test.ts; drop the "generator contract"
 * block in it if it no longer applies.
 */

const hasOwn = Object.prototype.hasOwnProperty;

export type Params = Partial<Record<string, string | number>>;

function isDotSegment(segment: string): boolean {
  return segment === "." || segment === "..";
}

export function pathToFunc(
  pathPattern: string,
  options?: { charEncoding?: "percent" | "none" },
): (params?: Params) => string {
  const paramRE = /\{([a-zA-Z0-9_][a-zA-Z0-9_-]*?)\}/g;

  return function buildURLPath(params: Record<string, unknown> = {}): string {
    return pathPattern
      .replace(
        paramRE,
        function (match: string, placeholder: string, offset: number) {
          if (!hasOwn.call(params, placeholder)) {
            throw new Error(`Parameter '${placeholder}' is required`);
          }

          const value = params[placeholder];
          if (typeof value !== "string" && typeof value !== "number") {
            throw new Error(
              `Parameter '${placeholder}' must be a string or number`,
            );
          }

          const encoded = options?.charEncoding === "percent"
            ? encodeURIComponent(`${value}`)
            : `${value}`;

          // Percent encoding leaves "." and ".." as they are. When the
          // parameter is a whole path segment, URL resolution would treat
          // them as dot segments and change the route.
          const before = pathPattern[offset - 1];
          const after = pathPattern[offset + match.length];
          const isWholeSegment = (before === undefined || before === "/")
            && (after === undefined || after === "/");
          if (isWholeSegment && isDotSegment(encoded)) {
            throw new Error(
              `Parameter '${placeholder}' cannot be the dot segment '${encoded}'`,
            );
          }

          return encoded;
        },
      )
      .replace(/^\/+/, "");
  };
}
