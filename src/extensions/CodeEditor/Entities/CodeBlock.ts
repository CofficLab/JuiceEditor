import { SmartLanguage, languages } from "../../../entities/SmartLanguage";

// 对应 CodeEditor 一个标签中存储的代码
export class CodeBlock {
    public title: string = 'new code block';
    public content: string = '';
    public language: SmartLanguage = languages[0];
    public runVisible: boolean = true

    setTitle(title: string): this {
        this.title = title
        return this
    }

    setContent(content: string): this {
        this.content = content
        return this
    }

    setLanguage(language: SmartLanguage): this {
        this.language = language
        return this
    }

    setRunVisible(runnable: boolean): this {
        this.runVisible = runnable
        return this
    }

    // JSON.stringify() 方法将对象转换为 JSON 字符串时，如果该对象具有 toJSON 方法，那么该方法将被调用
    toJSON() {
        return {
            title: this.title,
            content: this.content,
            language: this.language.getTitle(),
            runVisible: this.runVisible
        }
    }
}