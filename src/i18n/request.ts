import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !['en', 'ar'].includes(locale)) {
        locale = 'en';
    }

    try {
        const messages = (await import(`../../messages/${locale}.json`)).default;
        return {
            locale,
            messages
        };
    } catch (error) {
        console.error('Error loading messages:', error);
        return {
            locale,
            messages: {}
        };
    }
});
