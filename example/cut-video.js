/**
 * # Example: Cut Video
 *
 * Sample: 'small.mp4'
 */

const fs = require('fs')
const path = require('path')

const work = require('../lib/index').work

const sourcePath = __dirname + '/files/small.mp4'

fs.readFile(sourcePath, function (error, file) {
  if (error) {
    return console.error(error)
  }

  const source = {
    name: path.basename(sourcePath),
    data: file
  }

  const target = {
    name: 'smaller.mp4',
    duration: 3,
    audio: false
  }

  work(source, target).then(function (video) {
    const targetPath = sourcePath.replace(source.name, target.name)
    fs.writeFile(targetPath, video, function (error) {
      if (error) {
        return console.error(error)
      }
      console.log('[CREATED]', targetPath)
    })
  })
  .catch(console.log.bind(console))
})
