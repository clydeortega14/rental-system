export function toTwelveFormat(hhmm: string): string
{
    const [hStr, mStr] = hhmm.split(':');
    let h = Number(hStr);
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h%12 || 12;
    return `${h}:${mStr.padStart(2, '0')} ${suffix}`;
}