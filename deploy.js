const { copy, emptyDir } = require('fs-extra')

let destinations = [
  '../Kuaiyizhi_SwiftUI/Resources/dist/',
  '../Kuaiyizhi/public/editor',
  '../Kuaiyizhi_Flutter/assets/editor',
  '../JuiceEditor-Demo/public/juice-editor'
]

deploy()

async function deploy() {
  try {
    destinations.forEach((destination) => {
      emptyDir(destination, (err) => {
        if (err) return console.error(err)

        copy('./dist', destination, (err) => {
          if (err) return console.error(err)
          console.log('Vite 构建产物已复制到 ' + destination)
        })
      })
    })
  } catch (err) {
    console.error(err)
  }
}
