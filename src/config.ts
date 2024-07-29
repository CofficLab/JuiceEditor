let isDebug = process.env.NODE_ENV === 'development'

export default class Config {
  static getLink() {
    return isDebug
      ? 'http://localhost:5173/drawio/webapp/index.html?'
      : 'http://localhost:49493/draw/index.html?'
  }
}
