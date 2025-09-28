export function toTwelveFormat(hhmm: string): string
{
    const [hStr, mStr] = hhmm.split(':');
    let h = Number(hStr);
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h%12 || 12;
    return `${h}:${mStr.padStart(2, '0')} ${suffix}`;
}

export function timeInUTCFormat(date: Date)
{

    // // Convert to ISO string (UTC)
    const isoString = date.toTimeString(); // e.g., "2025-09-01T11:59:34.567Z"

    // Format for a database-friendly YYYY-MM-DD HH:mm:ss string (UTC)
    // const dbFormatTime = isoString.replace('T', ' ').substring(0, 19);

    return isoString;
}

export function formatTo24Hour(date: Date)
{
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const time24h = `${hours}:${minutes}`; // Example output: "21:10"
    
    return time24h

    
}