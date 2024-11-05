import { ImageExtension, TiptapExtension } from '../model/TiptapGroup'

export const DragDrop = TiptapExtension.create({
    name: 'dragDrop',

    addStorage() {
        return {
            dropHandler: null as ((e: DragEvent) => void) | null
        }
    },

    onCreate() {
        let tiptap = this.editor

        this.storage.dropHandler = (e: DragEvent) => {
            e.preventDefault()
            const file = e.dataTransfer?.files[0] as File;
            const reader = new FileReader();
            reader.onload = () => {
                tiptap.commands.insertContent({
                    type: ImageExtension.name,
                    attrs: {
                        src: reader.result
                    }
                })
            };
            reader.readAsDataURL(file);
        }

        document.addEventListener('drop', this.storage.dropHandler)
    },

    onDestroy() {
        if (this.storage.dropHandler) {
            document.removeEventListener('drop', this.storage.dropHandler)
        }
    }
}) 
