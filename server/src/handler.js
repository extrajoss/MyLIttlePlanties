const path = require('path')
const fs = require('fs-extra')

const config = require('./config')

const handlers = require('./handlers')

/**
 *
 * handlers.js - this module holds all the functions that are accessible
 * to the web-client in the JSON-RPC api. It binds the database to the
 * binary-tree search functions
 *
 * Any functions defined in the module exports can be accessed by the
 * corresponding `rpc` module in the client. These are accessed by their
 * names, where a name starting with public are publicly accessible
 * API. All other functions need the user to have already logged-in.
 *
 * The functions must return a promise that returns a JSON-literal.
 * For security, all returned functions must be wrapped in a dictionary.
 *
 * Functions that handle file-uploads from the client start with
 * upload, and the first parameter will be a filelist object that
 * determines the names and locations of the uploaded files on the
 * server.
 *
 * User handlers
 *
 */
function getWeather (weather, city) {
  return new Promise((resolve, reject) => {
    weather.getCurrentWeatherByCityName(city, (err, currentWeather) => {
      if (err) {
        reject(err)
      } else {
        resolve(currentWeather)
        handlers.createCity({id: currentWeather.id, name: currentWeather.name})
      }
    })
  })
}

async function publicGetWeather (city) {
  const OpenWeatherMapHelper = require('openweathermap-node')
  const weather = new OpenWeatherMapHelper(
    {
      APPID: '79501cd8a4f84522102cf9f52b2d9f21',
      units: 'metric'
    }
  )
  return getWeather(weather, city)
}

// TODO: adminGetUsers, adminDeleteUsers

// user defined

async function updateDatabaseOnInit () {
}

updateDatabaseOnInit()

/**
 * Specific handlers - promises that return a JSON literal
 */

async function publicGetText () {
  return {
    'text': 'Example text from local webserver',
    'isRunning': true
  }
}

async function publicDownloadGetReadme () {
  let payload = {
    'filename': path.resolve('readme.md'),
    'data': { 'success': true }
  }
  console.log('> publicGetReadme', payload)
  return payload
}

async function publicUploadFiles (fileList) {
  const timestampDir = String(new Date().getTime())
  const fullDir = path.join(config.filesDir, timestampDir)
  fs.ensureDirSync(fullDir)
  let targetPaths = [] //
  for (let file of fileList) {
    let basename = path.basename(file.originalname)
    let targetPath = path.join(timestampDir, basename)
    let fullTargetPath = path.join(config.filesDir, targetPath)
    fs.renameSync(file.path, fullTargetPath)
    targetPaths.push('/file/' + targetPath)
  }
  console.log('> publicUploadFiles', targetPaths)
  return { files: targetPaths }
}

module.exports = Object.assign(
  handlers,
  {
    publicGetWeather,
    publicGetText,
    publicDownloadGetReadme,
    publicUploadFiles
  })
