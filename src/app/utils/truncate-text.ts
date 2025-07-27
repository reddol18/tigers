export function truncateText(text: string | null | undefined, maxLength: number): string {
    if (text === null || text === undefined) {
        return ''; // null 또는 undefined인 경우 빈 문자열 반환
    }
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}