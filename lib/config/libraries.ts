export const availableLibraries = [
  "Artisan",
  "Immobilier",
  "Commercial B2B"
] as const;

export type AvailableLibrary = (typeof availableLibraries)[number];

export function isAvailableLibrary(value: string): value is AvailableLibrary {
  return availableLibraries.includes(value as AvailableLibrary);
}
