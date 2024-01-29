class SmartLanguage {
    names: string[] =['unknown']
    runnable: boolean = true

    static fromString(s: string): SmartLanguage {
        console.log("💼 SmartLanguage: 将字符转换成 SmartLanguage", s)

        if (typeof s !== 'string') {
            console.log("💼 SmartLanguage: 将字符转换成 SmartLanguage，不是字符串", s)
            return new SmartLanguage()
        }

        let language = new SmartLanguage()
        
        languages.forEach((item) => {
            if (item.names.includes(s)) {
                language = item
            }
        })

        return language
    }

    canRun(): boolean {
        return this.runnable
    }

    canNotRun(): boolean {
        return !this.runnable
    }

    setRunnable(value: boolean): this {
        this.runnable = value
        return this
    }

    setNames(names: string[]): this {
        this.names = names
        return this
    }

    getTitle(): string {
        return this.names[0]
    }

    toJSON(): string {
        return this.getTitle()
    }
}
 
const languages = [
    new SmartLanguage().setNames(['JavaScript']),
    new SmartLanguage().setNames(['Java']),
    new SmartLanguage().setNames(['Go']),
    new SmartLanguage().setNames(['PHP']),
    new SmartLanguage().setNames(['Python']),
    new SmartLanguage().setNames(['Shell']),
    new SmartLanguage().setNames(['Swift']),
    new SmartLanguage().setRunnable(false).setNames(['Json']),
    new SmartLanguage().setRunnable(false).setNames(['Text']),
]

export {
    languages,
    SmartLanguage
}