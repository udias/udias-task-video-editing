'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Meta
 *
 * Information about the task.
 */

exports.default = {
  type: 'video-editing',
  title: 'Video Editing',
  text: 'Edit a video to create a clip from the specified sequence',
  setup: [{
    name: 'video',
    role: 'remote-data',
    text: 'Select the video which should be edited!',
    type: 'file',
    config: {
      accept: 'video/*'
    }
  }, {
    name: 'sequence',
    role: 'remote-params',
    text: 'Select the sequence to modify!',
    type: 'range'
  }]
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7a0JBTWU7QUFDYixRQUFNLGVBQU47QUFDQSxTQUFPLGVBQVA7QUFDQSxRQUFNLDJEQUFOO0FBQ0EsU0FBTyxDQUNMO0FBQ0UsVUFBTSxPQUFOO0FBQ0EsVUFBTSxhQUFOO0FBQ0EsVUFBTSwwQ0FBTjtBQUNBLFVBQU0sTUFBTjtBQUNBLFlBQVE7QUFDTixjQUFRLFNBQVI7S0FERjtHQU5HLEVBVUw7QUFDRSxVQUFNLFVBQU47QUFDQSxVQUFNLGVBQU47QUFDQSxVQUFNLGdDQUFOO0FBQ0EsVUFBTSxPQUFOO0dBZEcsQ0FBUCIsImZpbGUiOiJtZXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIE1ldGFcbiAqXG4gKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgdGFzay5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHR5cGU6ICd2aWRlby1lZGl0aW5nJyxcbiAgdGl0bGU6ICdWaWRlbyBFZGl0aW5nJyxcbiAgdGV4dDogJ0VkaXQgYSB2aWRlbyB0byBjcmVhdGUgYSBjbGlwIGZyb20gdGhlIHNwZWNpZmllZCBzZXF1ZW5jZScsXG4gIHNldHVwOiBbXG4gICAge1xuICAgICAgbmFtZTogJ3ZpZGVvJyxcbiAgICAgIHJvbGU6ICdyZW1vdGUtZGF0YScsXG4gICAgICB0ZXh0OiAnU2VsZWN0IHRoZSB2aWRlbyB3aGljaCBzaG91bGQgYmUgZWRpdGVkIScsXG4gICAgICB0eXBlOiAnZmlsZScsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgYWNjZXB0OiAndmlkZW8vKidcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdzZXF1ZW5jZScsXG4gICAgICByb2xlOiAncmVtb3RlLXBhcmFtcycsXG4gICAgICB0ZXh0OiAnU2VsZWN0IHRoZSBzZXF1ZW5jZSB0byBtb2RpZnkhJyxcbiAgICAgIHR5cGU6ICdyYW5nZSdcbiAgICB9XG4gIF1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
