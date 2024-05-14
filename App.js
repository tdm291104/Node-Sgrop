const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());

const data = JSON.parse(fs.readFileSync('data.json'));

app.get('/objects', (req, res) => {
  res.json(data);
});

app.get('/objects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const object = data.find(obj => obj.id === id);
  if (object) {
    res.json(object);
  } else {
    res.status(404).send('Object not found');
  }
});

app.post('/objects', (req, res) => {
  const newObject = req.body;
  // Add validation if needed
  data.push(newObject);
  // Write updated data back to JSON file
  fs.writeFileSync('data.json', JSON.stringify(data));
  res.status(201).send('Object created successfully');
});

app.put('/objects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedObject = req.body;
  // Find index of object with given ID
  const index = data.findIndex(obj => obj.id === id);
  if (index !== -1) {
    // Update object in data array
    data[index] = { ...data[index], ...updatedObject };
    // Write updated data back to JSON file
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.send('Object updated successfully');
  } else {
    res.status(404).send('Object not found');
  }
});

app.delete('/objects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // Find index of object with given ID
  const index = data.findIndex(obj => obj.id === id);
  if (index !== -1) {
    // Remove object from data array
    data.splice(index, 1);
    // Write updated data back to JSON file
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.send('Object deleted successfully');
  } else {
    res.status(404).send('Object not found');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});