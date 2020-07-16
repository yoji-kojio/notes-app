const fs = require('fs')
const chalk = require('chalk')
const log = console.log

const addNote = (title, body) => {
  const loadedNotes = loadNotes()
  const duplicatedNote = loadedNotes.find(note => note.title === title)

  if (!duplicatedNote) {
    loadedNotes.push({
      title,
      body
    })

    saveNotes(loadedNotes)
    log(chalk.green('Nota adicionada com sucesso!'))
  } else {
    log(chalk.yellow('Já existe uma nota com esse título:'))
    log(duplicatedNote.body)
  }
}

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync('notes.json')
    const notesJSON = notesBuffer.toString()

    return JSON.parse(notesJSON)
  } catch (e) {
    return []
  }
}

const removeNote = (title) => {
  try {
    const loadedNotes = loadNotes()
    const notesToKeep = loadedNotes.filter(note => note.title !== title)

    if (loadedNotes.length === notesToKeep.length) {
      console.log(chalk.yellow('Nenhuma nota encontrada!'))
      return
    }

    saveNotes(notesToKeep)
    log(chalk.green('Nota removida com sucesso!'))
  } catch (e) {
    console.log(chalk.red('Houve um erro ao remover a nota: ' + e))
  }
}

const listNotes = () => {
  const loadedNotes = loadNotes()

  loadedNotes.forEach((note) => printNote(note))
}

const readNote = (title) => {
  const loadedNotes = loadNotes()
  const selectedNote = loadedNotes.find((note) => note.title === title)

  if (selectedNote) {
    printNote(selectedNote)
  } else {
    console.log(chalk.yellow('Não foi encontrada nenhuma nota'))
  }
}

const printNote = (note) => {
  const { title, body } = note

  console.log(chalk.cyan('Title:'), title)
  console.log(chalk.cyan('Body:'), body)
  console.log(chalk.blue('----------------------------------------'))
}

const saveNotes = (notes) => {
  try {
    const noteJSON = JSON.stringify(notes)

    fs.writeFileSync('notes.json', noteJSON)
  } catch (e) {
    log(chalk.red('Houve um erro ao salvar as notas: ' + e))
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
}
