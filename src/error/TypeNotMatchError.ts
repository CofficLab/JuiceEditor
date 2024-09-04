class TypeNotMatchError extends Error {
    constructor(message: string) {
        super(message); // 调用父类构造函数
        this.name = "TypeNotMatchError"; // 设置错误名称
        Object.setPrototypeOf(this, TypeNotMatchError.prototype); // 维护原型链
    }
}