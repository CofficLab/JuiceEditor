class SmartLanguage {
    key: string = 'unknown'
    names: string[] = ['Unknown']
    runnable: boolean = true

    static fromString(s: string): SmartLanguage {
        //console.log("💼 SmartLanguage: 将字符转换成 SmartLanguage", s)

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

    setKey(key: string): this {
        this.key = key
        return this
    }

    getTitle(): string {
        return this.names[0]
    }

    getMonacoLanguage(): string {
        return this.key
    }

    toJSON(): string {
        return this.key
    }
}

const languages = [
    new SmartLanguage().setNames(['CSS', 'css', 'Css']).setKey('css'),
    new SmartLanguage().setNames(['Shell', 'shellscript', 'shell']).setKey('shell'),
    new SmartLanguage().setNames(['Go', 'Golang', 'golang', 'go']).setKey('go'),
    new SmartLanguage().setNames(['Json', 'json']).setKey('json').setRunnable(false),
    new SmartLanguage().setNames(['Java', 'java']).setKey('java'),
    new SmartLanguage().setNames(['JavaScript', 'javascript', 'js']).setKey('javascript'),
    new SmartLanguage().setNames(['PHP', 'php']).setKey('php'),
    new SmartLanguage().setNames(['Python', 'python', 'py']).setKey('python'),
    new SmartLanguage().setNames(['Swift', 'swift']).setKey('swift'),
    new SmartLanguage().setNames(['Text', 'text', 'plaintext', 'Plaintext']).setKey('plaintext').setRunnable(false),
    new SmartLanguage().setNames(['Yaml', 'yaml']).setKey('yaml'),
]

export {
    languages,
    SmartLanguage
}