export function truncateText(text: string | null | undefined, maxLength: number): string {
    if (text === null || text === undefined) {
        return ''; // null 또는 undefined인 경우 빈 문자열 반환
    }

    // HTML 태그 제거
    let plainText = text.replace(/<\/?[^>]+(>|$)/g, ''); // 정규식을 사용해 HTML 태그 제거

    // Markdown 이미지 및 일반 URL 제거
    plainText = plainText.replace(/!\[.*?\]\(.*?\)/g, ''); // Markdown 이미지 제거
    plainText = plainText.replace(/https?:\/\/[^\s]+/g, ''); // URL 제거

    if (plainText.length <= maxLength) {
        return plainText;
    }

    return plainText.substring(0, maxLength) + '...';
}