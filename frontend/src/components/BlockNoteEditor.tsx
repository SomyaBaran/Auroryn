import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

interface BlockNoteEditorProps {
  onChange?: (content: string) => void;
}

export default function BlockNoteEditor({ onChange }: BlockNoteEditorProps) {
  const editor = useCreateBlockNote();

  return (
    <BlockNoteView
      editor={editor}
      theme="dark"
      onChange={() => {
        onChange?.(JSON.stringify(editor.document));
      }}
    />
  );
}