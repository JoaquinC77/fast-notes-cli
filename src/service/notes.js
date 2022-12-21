const fs = require('fs')

const newNoteWrite = (nameFile, oldData, newNote) => {
  fs.writeFileSync(nameFile, JSON.stringify([...oldData, newNote]))
}

const updateNoteWrite = (nameFile, newData) => {
  fs.writeFileSync(nameFile, JSON.stringify(newData))
}

const getDataNotes = (nameFile) => {
  const file = fs.readFileSync(nameFile, 'utf-8')
  const jsonTransform = JSON.parse(file.toString()) || []
  return jsonTransform
}

module.exports = {
  newNoteWrite,
  getDataNotes,
  updateNoteWrite
}
