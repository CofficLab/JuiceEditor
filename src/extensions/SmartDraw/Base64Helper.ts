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

export default class Base64Helper {
    static getBase64FromBase64Image(base64Image: string) {
        return base64Image.split(",")[1]
    }

    static getMimeType(content: string): string {
        // "data:image/jpeg;base64,/9j/4AAQSkZJRgAB..."
        const draft = content.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*/)

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

    static download(base64Image: string) {
        console.log("Base64Helper.download", base64Image.substring(0, 40))

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

        // Clean up
        a.remove()
        URL.revokeObjectURL(a.href)
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