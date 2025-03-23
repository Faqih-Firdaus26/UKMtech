"use client";

import { Textarea } from "@/components/ui/textarea";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div className="rich-text-editor">
      <div className="mb-2 bg-gray-100 rounded-t-md p-2 border border-b-0 text-sm flex flex-wrap gap-2">
        <div className="font-bold">Fitur Editor:</div>
        <div>Gunakan format markdown untuk konten:</div>
        <div><code># Heading 1</code></div>
        <div><code>## Heading 2</code></div>
        <div><code>**bold**</code></div>
        <div><code>*italic*</code></div>
        <div><code>[link](url)</code></div>
        <div><code>- list item</code></div>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tulis konten edukasi di sini menggunakan format markdown..."
        className="min-h-[250px] rounded-t-none"
      />
    </div>
  );
} 