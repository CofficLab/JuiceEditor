let isDebug = process.env.NODE_ENV === 'development'

interface makeExtensionsProps {
  drawIoLink?: string,
  drawEnable?: boolean,
  tableEnable?: boolean
}

export default class Config {
  static getDrawLink() {
    return isDebug
      ? 'http://localhost:5173/drawio/webapp/index.html?'
      : 'http://localhost:49493/draw/index.html?'
  }
}
