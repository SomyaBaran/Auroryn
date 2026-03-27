// src/Tiptap.tsx
import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useMemo } from 'react'

const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World!</p>',
        editable: true
    })

    const providerValue = useMemo(() => ({ editor }), [editor])
    if (!editor) return null;

    return (
        <EditorContext.Provider value={providerValue}>
            <EditorContent
                editor={editor}
                className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg bg-white shadow-sm"
            />
            <FloatingMenu editor={editor}>
                This is the floating menu
            </FloatingMenu>
            <BubbleMenu editor={editor}>
                This is the bubble menu
            </BubbleMenu>
        </EditorContext.Provider>
    )
}

export default Tiptap