import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoClipboardOutline } from "react-icons/io5";
import axios from "axios";
function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const response = await axios.post("/api/todos", { text: title, description: description });
      setTodos([...todos, response.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing = (task) => {
    setEditingTodo(task._id);
    setEditedText(task.text);
    setEditedDescription(task.description);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
        description: editedDescription,
      });
      setTodos(todos.map((task) => (task._id === id ? response.data : task)));
      setEditingTodo(null);
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((task) => task._id !== id));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const task = todos.find((t) => t._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !task.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log("Error toggline task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Organizador de tareas
        </h1>

        <form
          onSubmit={addTodo}
          className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg flex-col"
        >
            <input
              className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400 text-center"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titulo de la tarea"
              required
            />

            <input
              className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400 text-center"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
            />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          >
            Add Task
          </button>
        </form>
        <div className="mt-4">
          {todos.length === 0 ? (
            <div></div>
          ) : (
            <div className="flex flex-col gap-4">
              {todos.map((task) => (
                <div key={task._id}>
                  {editingTodo === task._id ? (
                    <div className="flex items-center gap-x-3">
                      <div className="flex-col">
                      <input
                        className="p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner w-full"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        />

                        <input
                          className="p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner w-full"
                          type="text"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                        </div>
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => saveEdit(task._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
                          onClick={() => setEditingTodo(null)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4 overflow-hidden">
                          <button
                            onClick={() => toggleTodo(task._id)}
                            className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center ${task.completed
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 hover:border-blue-400"
                              }`}
                          >
                            {task.completed && <MdOutlineDone />}
                          </button>
                          <span className="text-gray-800 truncate font-medium">
                              {task.text}
                              <span
                                className="text-gray-500 font-normal"> - {task.description}
                              </span>
                          </span>
                        </div>
                        <div className="flex gap-x-2">
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                            onClick={() => startEditing(task)}
                          >
                            <MdModeEditOutline />
                          </button>
                          <button
                            onClick={() => deleteTodo(task._id)}
                            className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
