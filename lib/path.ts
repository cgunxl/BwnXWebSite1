import { SUPPORTED_LANGS } from '@/lib/i18n';

export function getLangFromPath(pathname: string): string {
	const parts = pathname.split('/').filter(Boolean);
	const candidate = parts[0];
	if ((SUPPORTED_LANGS as string[]).includes(candidate)) return candidate;
	return 'en';
}

export function replaceLang(pathname: string, nextLang: string): string {
	const parts = pathname.split('/');
	const segments = parts.slice(1);
	if ((SUPPORTED_LANGS as string[]).includes(segments[0])) {
		segments[0] = nextLang;
	} else {
		segments.unshift(nextLang);
	}
	return '/' + segments.join('/');
}