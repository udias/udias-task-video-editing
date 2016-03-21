/**
 * # Meta
 *
 * Information about the task.
 */

export default {
  type: 'video-editing',
  title: 'Video Editing',
  text: 'Edit a video to create a clip from the specified sequence',
  setup: [
    {
      name: 'video',
      role: 'remote-data',
      text: 'Select the video which should be edited!',
      type: 'file',
      config: {
        accept: 'video/*'
      }
    },
    {
      name: 'sequence',
      role: 'remote-params',
      text: 'Select the sequence to modify!',
      type: 'range'
    }
  ]
}
