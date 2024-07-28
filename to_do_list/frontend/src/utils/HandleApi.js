import axios from 'axios';

const baseurl = "http://localhost:5000";

const getalltodo = async (setTodo) => {
  try {
    const response = await axios.get(baseurl);
    if (response.status === 200) {
      setTodo(response.data);
    } else {
      throw new Error(`Failed to fetch todo items. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

const addtodo = async (text, setText, setTodo) => {
  if (!text.trim()) {
    console.error("Todo text cannot be empty");
    return;
  }

  try {
    const response = await axios.post(`${baseurl}/save`, { text });
    if (response.status === 201) {
      setText("");
      await getalltodo(setTodo);
    } else {
      throw new Error(`Failed to add todo item. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

const updatetodo = async (todoid, text, setTodo, setText, setIsUpdating) => {
  if (!text.trim()) {
    console.error("Todo text cannot be empty");
    return;
  }

  try {
    console.log(`Updating todo with id: ${todoid}, new text: ${text}`);
    const response = await axios.put(`${baseurl}/update`, { _id: todoid, text });
    if (response.status === 200) {
      console.log("Update successful", response.data);
      setText("");
      setIsUpdating(false);
      await getalltodo(setTodo);
    } else {
      throw new Error(`Failed to update todo item. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteToDo = (_id, setTodo) => {
  axios
    .delete(`${baseurl}/delete`, { data: { _id } })
    .then((data) => {
      console.log(data);
      getalltodo(setTodo);
    })
    .catch((err) => console.log(err));
};

export { getalltodo, addtodo, updatetodo, deleteToDo };