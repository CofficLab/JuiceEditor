import FontFamily from "@tiptap/extension-font-family";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartColor: {
            setTextColor: (color: string) => ReturnType
        }
    }
}

export const SmartFontFamily = FontFamily.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            fontFamilies: [
                'Comic Sans MS, Comic Sans',
                'Inter',
                'serif',
                'monospace',
                'cursive',
            ],
        }
    },
});