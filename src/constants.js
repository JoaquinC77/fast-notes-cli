const path = require('path')

const noteQuestion = [
  {
    type: 'input',
    message: 'Note Title',
    name: 'title'
  },
  {
    type: 'input',
    message: 'Note Body',
    name: 'body'
  }
]

const NAME_FILE = `${path.join(path.dirname(__dirname), 'notes', 'notes.json')}`

module.exports = {
  noteQuestion,
  NAME_FILE
}
