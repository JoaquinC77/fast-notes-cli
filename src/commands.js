const { program } = require('commander')
const { addNote, listNotes, deleteNote, updateNote, findNote } = require('./controllers/command.controller')

program.version('0.0.1').description('Command line to manage simple notes')

program.command('add').alias('a').description('Command to add note').action(addNote)

program.command('list').alias('l').description('Command to list all notes - <format> is default T, options T for Table or J for JSON').action(listNotes)

program.command('delete <id>').description('Command to delete a note by id').alias('d').action(deleteNote)

program.command('update <id>').description('Command to update a note by id').alias('u').action(updateNote)

program.command('find <text>').description('Command to search a note by a match of a word').alias('f').action(findNote)

program.parse(process.argv)
