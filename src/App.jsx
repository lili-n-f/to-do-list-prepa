import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList'
import TodoForm from './components/TodoForm/TodoForm'

function App() {
  const [todos, setTodos] = useState(
  [  {
    'id': '0', 'completed': true, 'task': 'Llorar' 
  },
  {
    'id': '1', 'completed': true, 'task': 'Estudiar'
  },
  {
    'id': '2', 'completed': false, 'task': 'Morir'
  }
  ]
  );
  
  
  useEffect(()=>{
    //Leer de firestore

  }, []);


  const onComplete = (todo) => {
    
    todo = { ...todo, completed: !todo.completed};
    const newTodos = todos.map((td) => (td.id === todo.id ? todo : td));
    setTodos(newTodos);

    /*Modificar valor en firestore */
  }

  
  const onDelete = (todo) => {
    setTodos([...todos].filter(td => td.id !== todo.id));
    /*Eliminar tarea de firestore */
  }

  const onAdd = (task) => {
    const newTask = {'completed': false, 'task': task};
    newTask.id = todos.length; //Esto no es necesario para firestore
    const newTodos = [...todos, newTask]; //Esto no es necesario para firestore
    setTodos(newTodos); //Esto no es necesario para firestore
    /*Agregar a firestore */
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TodoForm onAdd={onAdd}/>
      <TodoList todos={todos} onComplete={onComplete} onDelete={onDelete}/>
    </div>
  )
}

export default App
