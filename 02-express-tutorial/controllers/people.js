const express = require('express');
const { people } = require("../data");

const addPerson = (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({ success: false, message: "Please provide a name" });
    }
  
    people.push({ id: people.length + 1, name: req.body.name });
    
    res.status(201).json({ success: true, name: req.body.name });
};

const getPeople = (req, res) => {
    res.status(200).json(people);
};

const updatePerson = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    const personIndex = people.findIndex((person) => person.id === parseInt(id));
  
    if (personIndex !== -1) {
      people[personIndex].name = name;
      res.status(200).send('Person updated successfully');
    } else {
      res.status(404).send('Person not found');
    }
  };
  
const deletePerson = (req, res) => {
    const { id } = req.params;
  
    const filteredPeople = people.filter((person) => person.id !== parseInt(id));
  
    if (filteredPeople.length === people.length) {
      res.status(404).send('Person not found');
    } else {
        people.length = 0;
        people.push(...filteredPeople);
        res.status(200).send('Person deleted successfully');
    }
  };
  
module.exports = { getPeople, addPerson};//, updatePerson, deletePerson };