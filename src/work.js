/**
 * # Work
 *
 *
 */

import { extname } from 'path'

const ffmpeg = {
  webm: require('ffmpeg.js/ffmpeg-webm.js'),
  mp4: require('ffmpeg.js/ffmpeg-mp4.js')
}


export default function extractAudio (source, target) {
  return new Promise((resolve, reject) => {

    const sourceFormat = source.format || extname(source.name).substr(1)
    const targetFormat = target.format || extname(target.name).substr(1)

    const options = []
    if (target.video === false) {
      options.push('-vn -acodec copy')
    }
    // currently missing 'aac' codec support for re-encoding
    if (target.audio === false || targetFormat === 'mp4') {
      options.push('-an')
    }

    // optional: time based re-encoding
    if (target.start || target.end || target.duration) {
      const position = isNaN(target.start) && target.duration && (target.end - target.duration) || target.start
      if (position) {
        options.push(`-ss ${position}`)
      }
      const duration = isNaN(target.end) && target.duration && (target.start + target.duration) || target.end
      if (duration) {
        options.push(`-t ${duration}`)
      }
    }

    const params = `-i ${source.name} ${options.join(' ')} ${target.name}`

    const converter = ffmpeg[sourceFormat]

    const result = converter({
      printErr(){},
      stdin(){},
      MEMFS: [{
        name: source.name,
        data: source.data
      }],
      arguments:params.split(' ').filter((arg) => arg)
    })

    const descriptor = result.MEMFS[0]
    const buffer = Buffer(descriptor.data)
    return resolve(buffer)
  })
}
