import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList'
import TodoForm from './components/TodoForm/TodoForm'
import { db } from './firebase/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function App() {
  const [todos, setTodos] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  async function getTasks() {
    //Leer de firestore
    
    try{
      //setLoading(true);
      const querySnapshot = await getDocs(collection(db, "tareas"));
      let tasks = [];
      querySnapshot.forEach((tarea) => {
        const task = {...tarea.data(), 'id': tarea.id};
        tasks.push(task);
        })
      setTodos(tasks);
      //setLoading(false);

    }catch (e){
      console.error(e);
    }
  }

  useEffect(()=> {
    getTasks()
  }, [refresh]);


  const onComplete = async (todo) => {
    
    //todo = { ...todo, completed: !todo.completed};
    //const newTodos = todos.map((td) => (td.id === todo.id ? todo : td));
    //setTodos(newTodos);


    /*Modificar valor en firestore */
    await updateDoc(doc(db, "tareas", todo.id), {completed: !todo.completed});

    setRefresh(refresh+1);
  }

  
  const onDelete = async (todo) => {
    //setTodos([...todos].filter(td => td.id !== todo.id));
    
    /*Eliminar tarea de firestore */
    await deleteDoc(doc(db, "tareas", todo.id));

    setRefresh(refresh + 1);
  }

  const onAdd = async (task) => {
    const newTask = {'completed': false, 'task': task};
    
    /*Agregar a firestore */
    try {
      await addDoc(collection(db, "tareas"), newTask);
    } catch (e) {
      console.error(e);
    }
    setRefresh(refresh + 1);
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TodoForm onAdd={onAdd}/>
      {//loading ? <div style={{marginTop: '50px', color: '#213547'}}>Loading...</div> : <TodoList todos={todos} onComplete={onComplete} onDelete={onDelete}/>}
      <TodoList todos={todos} onComplete={onComplete} onDelete={onDelete}/>
      }
      
    </div>
  )
}

export default App
