import type { ContentType } from '#lib/types';

const sortByStartDate = (collection: ContentType[]): ContentType[] => {
    // Return a new sorted array without modifying the original collection
    return [...collection].sort((a, b) => Number(b.start) - Number(a.start));
}

const calculateDuration = (startDate: Date, endDate?: Date): string => {
    const end = endDate || new Date();

    let totalMonths = (end.getUTCFullYear() - startDate.getUTCFullYear()) * 12;
    totalMonths += end.getUTCMonth() - startDate.getUTCMonth();

    let duration = "";

    if (totalMonths < 1) {
        duration = "Less Than A Month";
    } else {
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        if (years > 0) {
            duration += `${years} year${years > 1 ? "s" : ""}`;
        }
        if (months > 0) {
            if (duration.length > 0) duration += " ";
            duration += `${months} month${months > 1 ? "s" : ""}`;
        }
    }

    return duration;
}

const formatDates = (item: ContentType): ContentType | undefined => {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const startUnixTime = Number(item.start);
    const startDate = new Date(startUnixTime * 1000);
    const formattedStart = `${monthNames[startDate.getUTCMonth()]} ${startDate.getUTCFullYear()}`;
    
    if (!item.end || item.end === "Currently") {
        return {
            ...item,
            start: formattedStart,
            end: "Present",
            difference: calculateDuration(startDate)
        };
    }

    const endUnixTime = Number(item.end);
    const endDate = new Date(endUnixTime * 1000);
    const formattedEnd = `${monthNames[endDate.getUTCMonth()]} ${endDate.getUTCFullYear()}`;

    return {
        ...item,
        start: formattedStart,
        end: formattedEnd,
        difference: calculateDuration(startDate, endDate),
    };
}

export const formatItemDates  = (collection: ContentType[]): ContentType[] => {
    const sortedData = sortByStartDate(collection);
    const formattedData = sortedData.map(item => {
        let formatedItem = formatDates(item);
        if (!formatedItem) {
            return item
        }
        return formatedItem;
    })
    return formattedData;
}
