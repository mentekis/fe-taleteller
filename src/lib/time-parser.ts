export function formatRelativeTime(date: Date, locale: string = 'en-US') {
    const now = new Date();
    const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    const thresholds = [
        { value: 60, unit: 'second' },
        { value: 60 * 60, unit: 'minute' },
        { value: 60 * 60 * 24, unit: 'hour' },
        { value: 60 * 60 * 24 * 30, unit: 'day' },
        { value: 60 * 60 * 24 * 365, unit: 'year' },
    ];

    for (let i = thresholds.length - 1; i >= 0; i--) {
        const { value, unit } = thresholds[i];
        if (Math.abs(secondsDiff) >= value) {
            const count = Math.round(secondsDiff / value);
            return rtf.format(count, unit as Intl.RelativeTimeFormatUnit);
        }
    }

    return rtf.format(0, 'second'); // For less than 1 second
}