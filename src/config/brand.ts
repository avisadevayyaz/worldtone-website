export const brandConfig = {
  name: "Worldtone",
  company: "Worldtone Inc.",
  fullName: "Worldtone",
  tagline: "by Worldtone Inc.",
  welcomeMessage: "Welcome to Worldtone",
  logoInitial: "W",
  storagePrefix: "worldtone",
} as const;

export type BrandConfig = typeof brandConfig;

export function getStorageKey(key: string): string {
  return `${brandConfig.storagePrefix}_${key}`;
}

export function getCookieKey(key: string): string {
  return `${brandConfig.storagePrefix}_${key}`;
}
