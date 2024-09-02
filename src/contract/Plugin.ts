import EditorDoc from "../model/EditorDoc"

interface Plugin {
    onPageLoaded(): void
    onMessage(message: string): void
    onSelectionTypeChange(type: string): void
    onDocUpdated(data: EditorDoc): void
    onDocsUpdated(data: EditorDoc[]): void
    onDownloadImage(src: string, name: string): void
}

export default Plugin