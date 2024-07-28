const Todo = require('../models/todomodels');

// Fetch all todos
module.exports.gettodo = async (req, res) => {
  try {
    const todo = await Todo.find();
    res.send(todo);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).send({ message: 'Error fetching todos' });
  }
};

// Save a new todo
module.exports.savetodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).send({ message: 'Text field is required' });
    }
    const data = await Todo.create({ text });
    console.log('Added Successfully..');
    console.log(data);
    res.send(data);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).send({ message: 'Error creating todo' });
  }
};

// Update an existing todo
module.exports.updatetodo = async (req, res) => {
  const { _id, text } = req.body;
  try {
    await Todo.findByIdAndUpdate(_id, { text });
    res.send('Updated Successfully...');
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).send({ message: 'Error updating todo' });
  }
};

// Delete an existing todo
module.exports.deletetodo = async (req, res) => {
  const { _id } = req.body;
  try {
    await Todo.findByIdAndDelete(_id);
    res.send('Deleted Successfully...');
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).send({ message: 'Error deleting todo' });
  }
};
