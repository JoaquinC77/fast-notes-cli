const { prompt } = require('inquirer')
const { noteQuestion } = require('../constants')
const fs = require('fs')
const { NAME_FILE } = require('../constants')
const short = require('short-uuid')
const { getDataNotes, newNoteWrite, updateNoteWrite } = require('../service/notes')

const warnNoteNotFound = (notes, id) => {
  if (!notes.some(note => note.id === id)) {
    return console.error('id not found')
  }
}

const addNote = async () => {
  const answer = await prompt(noteQuestion)
  const jsonTransform = getDataNotes(NAME_FILE)
  newNoteWrite(NAME_FILE, jsonTransform, { id: short.generate(), ...answer, createdAt: new Date().toLocaleString() })
  console.log('Note created successfully!!')
  process.exit(0)
}

const listNotes = async () => {
  const file = fs.readFileSync(NAME_FILE, 'utf-8')
  const jsonTransform = JSON.parse(file.toString())
  console.table(jsonTransform.map(({ id, title, body }) => ({ id, title, body })))
  process.exit(0)
}

const deleteNote = async (id) => {
  const jsonTransform = getDataNotes(NAME_FILE)
  warnNoteNotFound(jsonTransform, id)

  updateNoteWrite(NAME_FILE, jsonTransform.filter(note => note.id !== id))
  console.log(`Note ${id} deleted successfully!!`)
  process.exit(0)
}

const updateNote = async (id) => {
  const answer = await prompt(noteQuestion)
  const jsonTransform = getDataNotes(NAME_FILE)

  warnNoteNotFound(jsonTransform, id)

  const newAllData = jsonTransform.map(note => note.id === id
    ? {
        ...note,
        ...answer
      }
    : note)

  updateNoteWrite(NAME_FILE, newAllData)
  console.log(`Note ${id} updated successfully!!`)
  process.exit(0)
}

const findNote = async (search) => {
  const jsonTransform = getDataNotes(NAME_FILE)
  const mappingList = jsonTransform.filter(note => note.body.includes(search) || note.title.includes(search)) || []

  if (!mappingList?.length) {
    return console.warn('Note not found by search word')
  } else {
    console.table(mappingList.map(({ id, title, body }) => ({ id, title, body })))
  }

  process.exit(0)
}

module.exports = {
  addNote,
  listNotes,
  deleteNote,
  updateNote,
  findNote
}
