import { Editor, Node } from "@tiptap/core";

interface MimeTypeMapping {
    [key: string]: string
}
const MimeToExtension: MimeTypeMapping = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/bmp": ".bmp",
    "image/tiff": ".tiff",
    "image/x-icon": ".ico",
    "image/svg+xml": ".svg",
    "image/webp": ".webp",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "video/ogg": ".ogg",
    "audio/mpeg": ".mp3",
    "audio/ogg": ".ogg",
    "audio/wav": ".wav",
    "audio/wave": ".wav",
    "audio/x-wav": ".wav",
    "audio/x-pn-wav": ".wav",
    "audio/flac": ".flac",
    "audio/x-flac": ".flac",
    "audio/x-aiff": ".aiff",
    "audio/x-aifc": ".aiff",
    "audio/x-caf": ".caf",
}

const emoji = "🚗 ImageHelper"

class ImageHelper {
    // 获取尾部位置
    static getTailPos(props: { getPos: () => any; node: { nodeSize: any } }): number {
        const start = props.getPos()
        const end = start + props.node.nodeSize

        // console.log('start is', start)
        // console.log('size is', props.node.nodeSize)

        return end
    }

    // 在本节点的后面插入一行
    static newLine(props: { editor: any; getPos: () => any; node: { nodeSize: any } }) {
        let tail = ImageHelper.getTailPos(props)
        console.log('tail is', tail)
        props.editor.commands.insertContentAt(tail - 1, '<p></p>', {
            updateSelection: false,
            parseOptions: {
                preserveWhitespace: 'full'
            }
        })
        props.editor.commands.focus(tail)
    }

    // 是否是整个editor.state.doc.content的最后一个node
    static isTheLastNode(props: { editor: any; getPos: () => any; node: { nodeSize: any } }) {
        return props.node.nodeSize + props.getPos() == props.editor.state.doc.content.size
    }

    // 如果是最后一个节点，在本节点后插入一个空的p，防止光标无法移动到下一个节点
    static insertNewLineIfIsTheLastNode(props: { editor: any; getPos: () => any; node: { nodeSize: any } }) {
        if (ImageHelper.isTheLastNode(props)) {
            ImageHelper.newLine(props)
        }
    }

    static getBase64FromBase64Image(base64Image: string) {
        return base64Image.split(",")[1]
    }

    static getMimeType(content: string): string {
        // "data:image/jpeg;base64,/9j/4AAQSkZJRgAB..."
        // "data: image/png..."
        const draft = content.match(/data:\s*([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*/)

        if (draft) {
            return draft[1]
        }

        return ""
    }

    static getExtension(base64Image: string): string {
        let mimeType = this.getMimeType(base64Image)

        if (mimeType in MimeToExtension) {
            return MimeToExtension[mimeType]
        }

        return ".txt"
    }

    static async downloadImageFromUrl(url: string): Promise<void> {
        console.log(emoji, "download", url)

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = `download.${blob.type.split('/')[1]}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error('Failed to download image:', error);
        }
    }

    static downloadBase64(base64Image: string): HTMLAnchorElement {
        console.log(emoji, "download", base64Image.substring(0, 40))

        // 1. Decode base64 string to ArrayBuffer
        const bytes = atob(base64Image.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(bytes.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < bytes.length; i++) {
            uintArray[i] = bytes.charCodeAt(i);
        }

        // 2. Create Blob from ArrayBuffer
        const blob = new Blob([arrayBuffer]);

        // 3. Generate file download url
        const url = URL.createObjectURL(blob);

        // 4. Create <a> tag and trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = "download" + this.getExtension(base64Image);
        document.body.appendChild(a);
        a.click();

        return a
    }

    static download2(base64Image: string) {
        // 创建一个虚拟的URL
        var url = base64Image.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')

        // 创建一个虚拟的链接
        var link = document.createElement('a')
        link.href = url
        link.download = 'image' + this.getExtension(base64Image)

        // 将链接添加到页面
        document.body.appendChild(link)

        // 模拟点击链接触发下载
        link.click()

        // 移除链接
        document.body.removeChild(link)
    }
}

export default ImageHelper