const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
app.use(cors());

morgan.token('data', function getData(req) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const today = new Date();
  const weekdays = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
  };

  const months = {
    1: 'Jan',
    2: 'Feb',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'Aug',
    9: 'Sept',
    10: 'Oct',
    11: 'Nov',
  };
  const nowDate = `${weekdays[today.getDay()]} 
                ${months[today.getMonth() + 1]} 
                ${today.getDate()}
                ${today.getFullYear()} 
                ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} Eastern Time`;
  res.send(`Phone book has info for ${persons.length} people <br> ${nowDate}`);
});

app.get('/api/persons/:id', (req, res) => {
  const requestID = Number(req.params.id);
  const person = persons.find((person) => person.id === requestID);
  if (person !== undefined) {
    return res.json(person);
  }

  res.status(404).send('User not found');
});

app.delete('/api/persons/:id', (req, res) => {
  const requestID = Number(req.params.id);
  const person = persons.find((person) => person.id === requestID);
  if (person !== undefined) {
    persons = persons.filter((person) => person.id !== requestID);
    return res.status(204).end();
  }
  res.status(404).send('User not found');
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' });
  }

  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' });
  }

  if (persons.find((person) => person.name === body.name)) {
    return res
      .status(400)
      .json({ error: 'name already exist in the phonebook' });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000),
  };

  persons = persons.concat(newPerson);
  res.json(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
