const notes = require('./notes.js')
const yargs = require('yargs')

yargs.command({
  command: 'add',
  describe: 'Adds a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler({ title, body }) {
    notes.addNote(title, body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Removes a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler({ title }) {
    notes.removeNote(title)
  }
})

yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    notes.listNotes()
  }
})

yargs.command({
  command: 'read',
  describe: 'Reads a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler({ title }) {
    notes.readNote(title)
  }
})

yargs.parse()
