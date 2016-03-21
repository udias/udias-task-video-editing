'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractAudio;

var _path = require('path');

var ffmpeg = {
  webm: require('ffmpeg.js/ffmpeg-webm.js'),
  mp4: require('ffmpeg.js/ffmpeg-mp4.js')
}; /**
    * # Work
    *
    *
    */

function extractAudio(source, target) {
  return new Promise(function (resolve, reject) {

    var sourceFormat = source.format || (0, _path.extname)(source.name).substr(1);
    var targetFormat = target.format || (0, _path.extname)(target.name).substr(1);

    var options = [];
    if (target.video === false) {
      options.push('-vn -acodec copy');
    }
    // currently missing 'aac' codec support for re-encoding
    if (target.audio === false || targetFormat === 'mp4') {
      options.push('-an');
    }

    // optional: time based re-encoding
    if (target.start || target.end || target.duration) {
      var position = isNaN(target.start) && target.duration && target.end - target.duration || target.start;
      if (position) {
        options.push('-ss ' + position);
      }
      var duration = isNaN(target.end) && target.duration && target.start + target.duration || target.end;
      if (duration) {
        options.push('-t ' + duration);
      }
    }

    var params = '-i ' + source.name + ' ' + options.join(' ') + ' ' + target.name;

    var converter = ffmpeg[sourceFormat];

    var result = converter({
      printErr: function printErr() {},
      stdin: function stdin() {},

      MEMFS: [{
        name: source.name,
        data: source.data
      }],
      arguments: params.split(' ').filter(function (arg) {
        return arg;
      })
    });

    var descriptor = result.MEMFS[0];
    var buffer = Buffer(descriptor.data);
    return resolve(buffer);
  });
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBY3dCOztBQVJ4Qjs7QUFFQSxJQUFNLFNBQVM7QUFDYixRQUFNLFFBQVEsMEJBQVIsQ0FBTjtBQUNBLE9BQUssUUFBUSx5QkFBUixDQUFMO0NBRkk7Ozs7OztBQU1TLFNBQVMsWUFBVCxDQUF1QixNQUF2QixFQUErQixNQUEvQixFQUF1QztBQUNwRCxTQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7O0FBRXRDLFFBQU0sZUFBZSxPQUFPLE1BQVAsSUFBaUIsbUJBQVEsT0FBTyxJQUFQLENBQVIsQ0FBcUIsTUFBckIsQ0FBNEIsQ0FBNUIsQ0FBakIsQ0FGaUI7QUFHdEMsUUFBTSxlQUFlLE9BQU8sTUFBUCxJQUFpQixtQkFBUSxPQUFPLElBQVAsQ0FBUixDQUFxQixNQUFyQixDQUE0QixDQUE1QixDQUFqQixDQUhpQjs7QUFLdEMsUUFBTSxVQUFVLEVBQVYsQ0FMZ0M7QUFNdEMsUUFBSSxPQUFPLEtBQVAsS0FBaUIsS0FBakIsRUFBd0I7QUFDMUIsY0FBUSxJQUFSLENBQWEsa0JBQWIsRUFEMEI7S0FBNUI7O0FBTnNDLFFBVWxDLE9BQU8sS0FBUCxLQUFpQixLQUFqQixJQUEwQixpQkFBaUIsS0FBakIsRUFBd0I7QUFDcEQsY0FBUSxJQUFSLENBQWEsS0FBYixFQURvRDtLQUF0RDs7O0FBVnNDLFFBZWxDLE9BQU8sS0FBUCxJQUFnQixPQUFPLEdBQVAsSUFBYyxPQUFPLFFBQVAsRUFBaUI7QUFDakQsVUFBTSxXQUFXLE1BQU0sT0FBTyxLQUFQLENBQU4sSUFBdUIsT0FBTyxRQUFQLElBQW9CLE9BQU8sR0FBUCxHQUFhLE9BQU8sUUFBUCxJQUFvQixPQUFPLEtBQVAsQ0FENUM7QUFFakQsVUFBSSxRQUFKLEVBQWM7QUFDWixnQkFBUSxJQUFSLFVBQW9CLFFBQXBCLEVBRFk7T0FBZDtBQUdBLFVBQU0sV0FBVyxNQUFNLE9BQU8sR0FBUCxDQUFOLElBQXFCLE9BQU8sUUFBUCxJQUFvQixPQUFPLEtBQVAsR0FBZSxPQUFPLFFBQVAsSUFBb0IsT0FBTyxHQUFQLENBTDVDO0FBTWpELFVBQUksUUFBSixFQUFjO0FBQ1osZ0JBQVEsSUFBUixTQUFtQixRQUFuQixFQURZO09BQWQ7S0FORjs7QUFXQSxRQUFNLGlCQUFlLE9BQU8sSUFBUCxTQUFlLFFBQVEsSUFBUixDQUFhLEdBQWIsVUFBcUIsT0FBTyxJQUFQLENBMUJuQjs7QUE0QnRDLFFBQU0sWUFBWSxPQUFPLFlBQVAsQ0FBWixDQTVCZ0M7O0FBOEJ0QyxRQUFNLFNBQVMsVUFBVTtBQUN2QixvQ0FBVSxFQURhO0FBRXZCLDhCQUFPLEVBRmdCOztBQUd2QixhQUFPLENBQUM7QUFDTixjQUFNLE9BQU8sSUFBUDtBQUNOLGNBQU0sT0FBTyxJQUFQO09BRkQsQ0FBUDtBQUlBLGlCQUFVLE9BQU8sS0FBUCxDQUFhLEdBQWIsRUFBa0IsTUFBbEIsQ0FBeUIsVUFBQyxHQUFEO2VBQVM7T0FBVCxDQUFuQztLQVBhLENBQVQsQ0E5QmdDOztBQXdDdEMsUUFBTSxhQUFhLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FBYixDQXhDZ0M7QUF5Q3RDLFFBQU0sU0FBUyxPQUFPLFdBQVcsSUFBWCxDQUFoQixDQXpDZ0M7QUEwQ3RDLFdBQU8sUUFBUSxNQUFSLENBQVAsQ0ExQ3NDO0dBQXJCLENBQW5CLENBRG9EO0NBQXZDIiwiZmlsZSI6IndvcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMgV29ya1xuICpcbiAqXG4gKi9cblxuaW1wb3J0IHsgZXh0bmFtZSB9IGZyb20gJ3BhdGgnXG5cbmNvbnN0IGZmbXBlZyA9IHtcbiAgd2VibTogcmVxdWlyZSgnZmZtcGVnLmpzL2ZmbXBlZy13ZWJtLmpzJyksXG4gIG1wNDogcmVxdWlyZSgnZmZtcGVnLmpzL2ZmbXBlZy1tcDQuanMnKVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3RBdWRpbyAoc291cmNlLCB0YXJnZXQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGNvbnN0IHNvdXJjZUZvcm1hdCA9IHNvdXJjZS5mb3JtYXQgfHwgZXh0bmFtZShzb3VyY2UubmFtZSkuc3Vic3RyKDEpXG4gICAgY29uc3QgdGFyZ2V0Rm9ybWF0ID0gdGFyZ2V0LmZvcm1hdCB8fCBleHRuYW1lKHRhcmdldC5uYW1lKS5zdWJzdHIoMSlcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBbXVxuICAgIGlmICh0YXJnZXQudmlkZW8gPT09IGZhbHNlKSB7XG4gICAgICBvcHRpb25zLnB1c2goJy12biAtYWNvZGVjIGNvcHknKVxuICAgIH1cbiAgICAvLyBjdXJyZW50bHkgbWlzc2luZyAnYWFjJyBjb2RlYyBzdXBwb3J0IGZvciByZS1lbmNvZGluZ1xuICAgIGlmICh0YXJnZXQuYXVkaW8gPT09IGZhbHNlIHx8IHRhcmdldEZvcm1hdCA9PT0gJ21wNCcpIHtcbiAgICAgIG9wdGlvbnMucHVzaCgnLWFuJylcbiAgICB9XG5cbiAgICAvLyBvcHRpb25hbDogdGltZSBiYXNlZCByZS1lbmNvZGluZ1xuICAgIGlmICh0YXJnZXQuc3RhcnQgfHwgdGFyZ2V0LmVuZCB8fCB0YXJnZXQuZHVyYXRpb24pIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gaXNOYU4odGFyZ2V0LnN0YXJ0KSAmJiB0YXJnZXQuZHVyYXRpb24gJiYgKHRhcmdldC5lbmQgLSB0YXJnZXQuZHVyYXRpb24pIHx8IHRhcmdldC5zdGFydFxuICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChgLXNzICR7cG9zaXRpb259YClcbiAgICAgIH1cbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gaXNOYU4odGFyZ2V0LmVuZCkgJiYgdGFyZ2V0LmR1cmF0aW9uICYmICh0YXJnZXQuc3RhcnQgKyB0YXJnZXQuZHVyYXRpb24pIHx8IHRhcmdldC5lbmRcbiAgICAgIGlmIChkdXJhdGlvbikge1xuICAgICAgICBvcHRpb25zLnB1c2goYC10ICR7ZHVyYXRpb259YClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwYXJhbXMgPSBgLWkgJHtzb3VyY2UubmFtZX0gJHtvcHRpb25zLmpvaW4oJyAnKX0gJHt0YXJnZXQubmFtZX1gXG5cbiAgICBjb25zdCBjb252ZXJ0ZXIgPSBmZm1wZWdbc291cmNlRm9ybWF0XVxuXG4gICAgY29uc3QgcmVzdWx0ID0gY29udmVydGVyKHtcbiAgICAgIHByaW50RXJyKCl7fSxcbiAgICAgIHN0ZGluKCl7fSxcbiAgICAgIE1FTUZTOiBbe1xuICAgICAgICBuYW1lOiBzb3VyY2UubmFtZSxcbiAgICAgICAgZGF0YTogc291cmNlLmRhdGFcbiAgICAgIH1dLFxuICAgICAgYXJndW1lbnRzOnBhcmFtcy5zcGxpdCgnICcpLmZpbHRlcigoYXJnKSA9PiBhcmcpXG4gICAgfSlcblxuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSByZXN1bHQuTUVNRlNbMF1cbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIoZGVzY3JpcHRvci5kYXRhKVxuICAgIHJldHVybiByZXNvbHZlKGJ1ZmZlcilcbiAgfSlcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
