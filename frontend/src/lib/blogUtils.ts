type ContentNode = {
    text?: string;
    content?: ContentNode[];
    children?: ContentNode[];
};


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


export function getExcerpt(content: unknown): string {
    if (!content) {
        return "";
    }

    try {
        const parsed = typeof content === "string" ? JSON.parse(content) : content;
        const blocks: ContentNode[] = Array.isArray(parsed) ? parsed : [];
        const texts: string[] = [];

        const extract = (node: ContentNode) => {
            if (node.text?.trim()) {
                texts.push(node.text.trim());
            }

            node.content?.forEach(extract);
            node.children?.forEach(extract);
        }

        blocks.forEach(extract);
        return texts.join(" ").slice(0, 280);
    }
    catch {
        return "";
    }
}