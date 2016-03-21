/**
 * # Example: Extract Audio
 *
 * Sample: 'small.webm'
 */

const fs = require('fs')
const path = require('path')

const VideoEditing = require('../lib/index')

const sourcePath = __dirname + '/files/small.webm'

fs.readFile(sourcePath, function (error, file) {
  if (error) {
    return console.error(error)
  }

  const source = {
    name: path.basename(sourcePath),
    data: file
  }

  const target = {
    name: 'small.opus',
    video: false
  }

  VideoEditing.work(source, target).then(function (audio) {
    const targetPath = sourcePath.replace(source.name, target.name)
    fs.writeFile(targetPath, audio, function (error) {
      if (error) {
        return console.error(error)
      }
      console.log('[CREATED]', targetPath)
    })
  })
  .catch(console.log.bind(console))
})
