import type { ContentType } from '#lib/types';

const sortByStartDate = (collection: ContentType[]): ContentType[] => {
    // Return a new sorted array without modifying the original collection
    return [...collection].sort((a, b) => Number(b.start) - Number(a.start));
}

const calculateDuration = (startDate: Date, endDate?: Date, lang: 'en' | 'es' = 'en'): string => {
    const end = endDate || new Date();

    let totalMonths = (end.getUTCFullYear() - startDate.getUTCFullYear()) * 12;
    totalMonths += end.getUTCMonth() - startDate.getUTCMonth();

    let duration = "";

    if (totalMonths < 1) {
        duration = lang === 'es' ? "Menos De Un Mes" : "Less Than A Month";
    } else {
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        if (years > 0) {
            if (lang === 'es') {
                duration += `${years} año${years > 1 ? "s" : ""}`;
            } else {
                duration += `${years} year${years > 1 ? "s" : ""}`;
            }
        }
        if (months > 0) {
            if (duration.length > 0) duration += " ";
            if (lang === 'es') {
                duration += `${months} mes${months > 1 ? "es" : ""}`;
            } else {
                duration += `${months} month${months > 1 ? "s" : ""}`;
            }
        }
    }

    return duration;
}

const formatDates = (item: ContentType, lang: 'en' | 'es' = 'en'): ContentType | undefined => {
    const monthNames = lang === 'es' ? [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ] : [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const startUnixTime = Number(item.start);
    const startDate = new Date(startUnixTime * 1000);
    const formattedStart = `${monthNames[startDate.getUTCMonth()]} ${startDate.getUTCFullYear()}`;
    
    if (!item.end || item.end === "Currently" || item.end === "Present" || item.end === "Presente") {
        return {
            ...item,
            start: formattedStart,
            end: lang === 'es' ? "Presente" : "Present",
            difference: calculateDuration(startDate, undefined, lang)
        };
    }

    const endUnixTime = Number(item.end);
    const endDate = new Date(endUnixTime * 1000);
    const formattedEnd = `${monthNames[endDate.getUTCMonth()]} ${endDate.getUTCFullYear()}`;

    return {
        ...item,
        start: formattedStart,
        end: formattedEnd,
        difference: calculateDuration(startDate, endDate, lang),
    };
}

export const formatItemDates  = (collection: ContentType[], lang: 'en' | 'es' = 'en'): ContentType[] => {
    const sortedData = sortByStartDate(collection);
    const formattedData = sortedData.map(item => {
        let formatedItem = formatDates(item, lang);
        if (!formatedItem) {
            return item
        }
        return formatedItem;
    })
    return formattedData;
}
