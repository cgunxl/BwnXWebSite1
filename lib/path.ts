import { SUPPORTED_LANGS } from '@/lib/i18n';
import { SUPPORTED_COUNTRIES } from '@/lib/countries';

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

export function getCountryFromPath(pathname: string): string | null {
	const parts = pathname.split('/').filter(Boolean);
	const maybeLang = parts[0];
	const idx = (SUPPORTED_LANGS as string[]).includes(maybeLang) ? 1 : 0;
	const candidate = parts[idx];
	if ((SUPPORTED_COUNTRIES as string[]).includes(candidate)) return candidate as string;
	return null;
}

export function replaceCountry(pathname: string, nextCountry: string): string {
	const parts = pathname.split('/');
	const segments = parts.slice(1);
	const hasLang = (SUPPORTED_LANGS as string[]).includes(segments[0]);
	const countryIndex = hasLang ? 1 : 0;
	if ((SUPPORTED_COUNTRIES as string[]).includes(segments[countryIndex])) {
		segments[countryIndex] = nextCountry;
	} else {
		segments.splice(countryIndex, 0, nextCountry);
	}
	return '/' + segments.join('/');
}