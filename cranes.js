const express = require('express');
const fs = require('fs');

const router = express.Router();

const dataFilePath = './db-cranes.json';

// Read all cranes
router.get('/', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) throw err;

    const cranes = JSON.parse(data).cranes;

    res.status(200).json(cranes);
  });
});

// Read a single crane
router.get('/:id', (req, res) => {
  const craneId = parseInt(req.params.id);

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) throw err;

    const cranes = JSON.parse(data).cranes;
    const crane = cranes.find(c => c.id === craneId);

    if (!crane) {
      res.status(404).send('Crane not found');
      return;
    }

    res.status(200).json(crane);
  });
});

// Create a new crane
router.post('/', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) throw err;

    const cranes = JSON.parse(data).cranes;

    const newCrane = {
      id: cranes.length + 1,
      ...req.body
    };

    cranes.push(newCrane);

    fs.writeFile(dataFilePath, JSON.stringify({ cranes }), err => {
      if (err) throw err;

      res.status(201).json(newCrane);
    });
  });
});

// Update an existing crane
router.put('/:id', (req, res) => {
  const craneId = parseInt(req.params.id);

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) throw err;

    const cranes = JSON.parse(data).cranes;
    const index = cranes.findIndex(c => c.id === craneId);

    if (index === -1) {
      res.status(404).send('Crane not found');
      return;
    }

    const updatedCrane = {
      id: craneId,
      ...req.body
    };

    cranes[index] = updatedCrane;

    fs.writeFile(dataFilePath, JSON.stringify({ cranes }), err => {
      if (err) throw err;

      res.status(200).json(updatedCrane);
    });
  });
});

// Delete a crane
router.delete('/:id', (req, res) => {
  const craneId = parseInt(req.params.id);

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) throw err;

    const cranes = JSON.parse(data).cranes;
    const index = cranes.findIndex(c => c.id === craneId);

    if (index === -1) {
      res.status(404).send('Crane not found');
      return;
    }

    cranes.splice(index, 1);

    fs.writeFile(dataFilePath, JSON.stringify({ cranes }), err => {
      if (err) throw err;

      res.status(204).send();
    });
  });
});

module.exports = router;
