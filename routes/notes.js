const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text} = req.body;

  if (req.body) {
    const newNote = {
      id: uuid(),
      title,
      text
    };

    readAndAppend(newNote, '../db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
      console.log("id: " + req.query.id);
      readAndDelete(req.query.id, '../db/db.json');
      res.json(`Note deleted successfully 🚀`);

  });

module.exports = notes;