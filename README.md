# Task - Video Editing

This module is used as a task for the [udias platform](http://udias.io).

`Edit videos to retrieve shorter clips`


## Usage

```js
import { work } from 'udias-task-video-editing'

const video = readFileSync('./video.mp4')

const source = {
  name: 'video.mp4',
  data: video
}

const target = {
  name: 'highlights.mp4'
  start: 0,
  duration: 20
}

work(source, target).then((clip) => {
  console.log('clip buffer:', clip)
})
.catch(::console.error)
```
