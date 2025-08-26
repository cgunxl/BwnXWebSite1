import { getLangFromPath, replaceLang } from '@/lib/path';

describe('path utils', () => {
	it('gets language from path first segment', () => {
		expect(getLangFromPath('/en/loan')).toBe('en');
		expect(getLangFromPath('/th/tax')).toBe('th');
		expect(getLangFromPath('/unknown/loan')).toBe('en');
	});
	it('replaces or injects language in path', () => {
		expect(replaceLang('/en/loan', 'th')).toBe('/th/loan');
		expect(replaceLang('/loan', 'es')).toBe('/es/loan');
		expect(replaceLang('/', 'de')).toBe('/de/');
	});
});