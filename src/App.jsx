import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList'
import TodoForm from './components/TodoForm/TodoForm'
import { db, storage } from './firebase/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'

function App() {
  const [todos, setTodos] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [url, setUrl] = useState(null);
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
    //Eliminar archivo de storage
    if (todo.link) {
      try {
        const storageRef = await ref(storage, todo.path);
        await deleteObject(storageRef);
      } catch (e) {
        console.error(e);
      }
    }

    setRefresh(refresh + 1);
  }

  const onAdd = async (task, url, path) => {
    const newTask = {'completed': false, 'task': task, 'link': url};
    if (path) {
      newTask.path = path;
    };
    /*Agregar a firestore */
    try {
      await addDoc(collection(db, "tareas"), newTask);
    } catch (e) {
      console.error(e);
    }
    setRefresh(refresh + 1);
  }

  const onUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const path = `${file.name+v4()}`;
    const storageRef = ref(storage, path);
    try{
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      alert("File uploaded successfully");
      onAdd(file.name, url, path);
    } catch (e) {
      console.error(e);
      alert("File couldn't be uploaded");
    }
    
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TodoForm onAdd={onAdd} onUpload={onUpload}/>
      {//loading ? <div style={{marginTop: '50px', color: '#213547'}}>Loading...</div> : <TodoList todos={todos} onComplete={onComplete} onDelete={onDelete}/>}
      <TodoList todos={todos} onComplete={onComplete} onDelete={onDelete}/>
      }
      
    </div>
  )
}

export default App
