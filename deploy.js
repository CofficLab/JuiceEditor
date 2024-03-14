const { copy, emptyDir, removeSync } = require('fs-extra')

let drawDist = './dist/draw'
let destinations = [
  '../Kuaiyizhi_SwiftUI/Resources/dist/',
  '../Kuaiyizhi_Browser/public/editor',
  '../Kuaiyizhi_Flutter/assets/editor'
]

emptyDir(drawDist, (err) => {
  if (err) return console.error(err)

  copy('./drawio/webapp', drawDist, (err) => {
    if (err) return console.error(err)

    // 删除不需要的文件，减小体积
    removeSync(drawDist + '/node_modules')
    removeSync(drawDist + '/META-INF')
    removeSync(drawDist + '/WEB-INF')
    removeSync(drawDist + '/CITATION.cff')
    removeSync(drawDist + '/js/diagramly/App.js')
    console.log('Draw 构建产物已复制到 Dist')

    destinations.forEach((destination) => {
      emptyDir(destination, (err) => {
        if (err) return console.error(err)

        copy('./dist', destination, (err) => {
          if (err) return console.error(err)
          console.log('Vite 构建产物已复制到 ' + destination)
        })
      })
    })
  })
})
