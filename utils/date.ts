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

export const formatCountdownFromSeconds = (totalSeconds: number): string => {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const seconds = safeSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
    )}:${String(seconds).padStart(2, "0")}`;
};

export const getCountdownLabel = (
    targetTimestamp?: number | null,
    nowTimestamp = Date.now()
): string | undefined => {
    if (typeof targetTimestamp !== "number" || Number.isNaN(targetTimestamp)) {
        return undefined;
    }

    const secondsLeft = (targetTimestamp - nowTimestamp) / 1000;
    return formatCountdownFromSeconds(secondsLeft);
};
