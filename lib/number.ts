export function toNumberSafe(value: string, fallback: number = 0): number {
	if (value == null) return fallback;
	const n = parseFloat(String(value).trim());
	if (Number.isFinite(n)) return n;
	return fallback;
}