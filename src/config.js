const fs = require('fs')

module.exports = () => {
  if (!fs.existsSync('./notes') || !fs.existsSync('./notes/notes.json')) {
    fs.mkdirSync('./notes')
    return fs.writeFileSync('./notes/notes.json', JSON.stringify([]))
  }
}
