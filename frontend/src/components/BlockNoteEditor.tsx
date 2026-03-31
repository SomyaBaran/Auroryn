import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

export default function MyEditor() {
    const editor = useCreateBlockNote();

    return (
        <div className="w-full h-full">
            <BlockNoteView editor={editor} className="h-full" />
        </div>
    );
}