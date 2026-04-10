export function formatDate(dateStr: string): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = Math.floor(diffMs / 3_600_000);
    if (diffH < 1) return `${Math.max(1, Math.floor(diffMs / 60_000))}m`;
    if (diffH < 24) return `${diffH}h`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 7) return `${diffD}d`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getExcerpt(content: any): string {
    if (!content) return "";
    try {
        const blocks = Array.isArray(content)
            ? content
            : JSON.parse(typeof content === "string" ? content : JSON.stringify(content));
        const texts: string[] = [];
        const extract = (node: any) => {
            if (!node) return;
            if (typeof node.text === "string" && node.text.trim()) texts.push(node.text.trim());
            if (Array.isArray(node.content)) node.content.forEach(extract);
            if (Array.isArray(node.children)) node.children.forEach(extract);
        };
        blocks.forEach(extract);
        return texts.join(" ").slice(0, 280);
    } catch {
        return "";
    }
}