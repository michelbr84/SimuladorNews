export function sanitizeName(value: string | undefined | null): string {
    return String(value ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 24);
}
