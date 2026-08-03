export function bytesToBase64(u8arr: Uint8Array): string {
  return btoa(String.fromCodePoint(...u8arr));
}

export function bytesFromBase64(encoded: string): Uint8Array {
  return Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0));
}

export function stringToBytes(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

export function stringFromBytes(value: Uint8Array): string {
  return new TextDecoder().decode(value);
}

export function stringToBase64(value: string): string {
  return bytesToBase64(stringToBytes(value));
}

export function stringFromBase64(value: string): string {
  return stringFromBytes(bytesFromBase64(value));
}
