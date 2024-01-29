import { SmartLanguage, languages } from "../../entities/SmartLanguage";
import { CodeBlock } from "./CodeBlock";



export class Database {
    public json: string;
    public items: CodeBlock[] = [];
    public activatedIndex = 0;

    constructor(json: string = "{}") {
        // console.log("💼 Database: 将字符转换成 Database", json)

        this.json = json;
        this.activatedIndex = JSON.parse(this.json).activatedIndex || 0;

        const items = JSON.parse(this.json).items || [];
        items.forEach((element: { title: string; content: string; language: string, runVisible: boolean }) => {
            this.items.push(new CodeBlock()
                .setTitle(element.title)
                .setContent(element.content)
                .setLanguage(SmartLanguage.fromString(element.language))
                .setRunVisible(element.runVisible)
            );
        });

        if (items.length === 0) {
            this.items.push(new CodeBlock());
            this.activatedIndex = 0
        }
    }

    static createWithSingleCodeBlock(codeBlock: CodeBlock) {
        // console.log("💼 Database: 将 SingleCodeBlock 转换成 Database", codeBlock)
        return new Database(JSON.stringify({
            items: [codeBlock],
            activatedIndex: 0,
        }));

    }

    public appendNewCodeBlock(): Database {
        this.items.push(new CodeBlock());
        this.activatedIndex = this.items.length - 1;

        return this;
    }

    public getActivatedItem(): CodeBlock {
        // console.log('get activated item', this);
        if (this.items && this.items.length > 0 && this.activatedIndex >= 0 && this.activatedIndex < this.items.length) {
            // console.log(this.items[this.activatedIndex]);
            return this.items[this.activatedIndex];
        } else {
            return new CodeBlock();
        }
    }

    public getLastIndex(): number {
        return this.items.length - 1;
    }

    public updateActivatedIndex(id: number): Database {
        this.json = JSON.stringify({
            activatedIndex: id,
            items: this.items,
        });

        return new Database(this.json);
    }

    public updateLanguage(language: SmartLanguage): Database {
        // console.log('database: update language', language);
        let activatedItem = this.getActivatedItem()
        activatedItem.language = language

        this.items[this.activatedIndex] = activatedItem

        this.json = JSON.stringify({
            items: this.items,
            activatedIndex: this.activatedIndex,
        })

        // console.log('database: after update language', this.json);

        return new Database(this.json);
    }

    public updateContent(content: string): Database {
        let activatedItem = this.getActivatedItem()
        activatedItem.content = content

        this.items[this.activatedIndex] = activatedItem

        this.json = JSON.stringify({
            items: this.items,
            activatedIndex: this.activatedIndex,
        })

        return new Database(this.json);
    }

    public updateRunVisible(runnable: boolean): Database {
        let activatedItem = this.getActivatedItem()
        activatedItem.runVisible = runnable

        this.items[this.activatedIndex] = activatedItem

        this.json = JSON.stringify({
            items: this.items,
            activatedIndex: this.activatedIndex,
        })

        return new Database(this.json);
    }

    public updateTitle(title: string): Database {
        let activatedItem = this.getActivatedItem()
        activatedItem.title = title

        this.items[this.activatedIndex] = activatedItem

        this.json = JSON.stringify({
            items: this.items,
            activatedIndex: this.activatedIndex,
        })

        return new Database(this.json);
    }

    public toJSON(): string {
        return JSON.stringify({
            items: this.items,
            activatedIndex: this.activatedIndex,
        });
    }

    public deleteCodeBlock(index: number): Database {
        this.items.splice(index, 1);

        this.json = JSON.stringify({
            items: this.items,
            activatedIndex: Math.max(0, index - 1),
        })

        return new Database(this.json);
    }
}
