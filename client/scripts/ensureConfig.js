const fs = require('fs')

function createDefaultLocalConfig() {
  const localConfigPath = `${__dirname}/../src/config/local.js`
  if (fs.existsSync(localConfigPath)) {
    return
  }

  console.log(`Creating default ${localConfigPath}`)
  fs.writeFileSync(localConfigPath, 'module.exports = {}')
}

createDefaultLocalConfig()