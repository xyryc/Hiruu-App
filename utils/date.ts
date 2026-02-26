export const formatDate = (
    value?: string | Date | null,
    fallback = "-"
): string => {
    if (!value) return fallback;

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return fallback;

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
};

export const formatDateRange = (
    start?: string | Date | null,
    end?: string | Date | null,
    fallback = "-"
): string => {
    const from = formatDate(start, "");
    const to = formatDate(end, "");
    if (!from && !to) return fallback;
    if (!from) return to;
    if (!to) return from;
    return `${from} - ${to}`;
};
