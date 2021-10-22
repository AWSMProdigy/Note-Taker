const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for tips`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, note} = req.body;

  if (req.body) {
    const newNote = {
      title,
      note,
      tip_id: uuid(),
    };

    readAndAppend(newNote, '../develop/db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;