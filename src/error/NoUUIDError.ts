class NoUUIDError extends Error {
    constructor(message: string) {
        super(message); // 调用父类构造函数
        this.name = "NoUUIDError"; // 设置错误名称
        Object.setPrototypeOf(this, NoUUIDError.prototype); // 维护原型链
    }
}

export default NoUUIDError;