/**
 * # Task: Source - Distribution
 *
 * Configuration to build bundles for the browser and node.
 */

import { emptyDirSync} from 'fs-extra'

import webpack from 'webpack'
const merge = require('deep-merge')((target, source) => {
  if (target instanceof Array) {
    return [].concat(target, source)
  }
  return source
})

/**
 * [default description]
 * @param  {[type]} env [description]
 * @return {[type]}     [description]
 */
export default (env) => {
  return new Promise((resolve, reject) => {
    emptyDirSync(env.DIST)

    var config = {
      entry: `${env.SRC}/index.js`,
      resolve: {
        extensions: ['', '.js']
      },
      output: {
        path: env.DIST,
        filename: 'udias-task-video-editing.js',
        library: 'VideoEditing',
        libraryTarget: 'umd'
      },
      module: {
        noParse: [
          /ffmpeg\.js\/ffmpeg-webm\.js/,
          /ffmpeg\.js\/ffmpeg-mp4\.js/
        ],
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
          }
        ]
      }
    }

    // = development
    if (__DEVELOPMENT__) {
      const DevConfig = merge(config, {
        debug: true,
        devtool: 'inline-source-map'
      })
      var ready = false
      return webpack(DevConfig).watch(100, (error, stats) => {
        if (ready) {
          if (error) {
            return console.error(error)
          }
          return console.log(new Date().toISOString(), ' - [ChecksumCreation]', stats.toString())
        }
        if (error) {
          return reject(error)
        }
        ready = true
        return resolve()
      })
    }

    // = production
    const ProductionConfig = merge(config, {
      debug: false,
      // devtool: 'source-map'
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compress: {
            warnings: false,
            screw_ie8: true
          }
        })
      ]
    })

    // = production:web
    const ProductionWebConfig = merge(ProductionConfig, {
      target: 'web',
      output: {
        filename: config.output.filename.replace('.js', '.web.js'),
        libraryTarget: 'umd'
      }
    })

    // = production:node
    const ProductionNodeConfig = merge(ProductionConfig, {
      target: 'node',
      output: {
        filename: config.output.filename.replace('.js', '.node.js'),
        libraryTarget: 'commonjs2'
      }
    })

    return webpack(ProductionWebConfig).run((error, stats) => {
      if (error) {
        return reject(error)
      }
      return webpack(ProductionNodeConfig).run((error, stats) => {
        if (error) {
          return reject(error)
        }
        return resolve()
      })
    })

  })
}
