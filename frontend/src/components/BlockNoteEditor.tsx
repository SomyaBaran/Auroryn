import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import type { BlockNoteEditor as BlockNoteEditorType } from "@blocknote/core";

interface BlockNoteEditorProps {
  onChange?: (content: string) => void;
  editor: BlockNoteEditorType;
}

export default function BlockNoteEditor({ onChange, editor }: BlockNoteEditorProps) {

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