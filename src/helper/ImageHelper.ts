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
        console.log(emoji, "downloadImageFromUrl", url)

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            // 使用 getExtension 方法来获取正确的文件扩展名
            const extension = this.getExtension(`data:${blob.type};base64,`);
            a.download = `download${extension}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error('Failed to download image:', error);
        }
    }

    static downloadBase64(base64Image: string): void {
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