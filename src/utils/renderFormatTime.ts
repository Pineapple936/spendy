export function renderFormatTime(time: number): string {
    return time < 10? "0" + String(time): String(time);
}
