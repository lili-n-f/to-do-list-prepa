import React, { useState } from 'react'
import * as styles from './TodoForm.module.css'


export default function TodoForm({onAdd}) {
    const [newTask, setNewTask] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() !== ''){
            onAdd(newTask);
            setNewTask("");
        }
    }

    return (
    <div>
        <form onSubmit={handleSubmit} className={styles.container}>
            <input type="text" placeholder='Enter a new task...' className={styles.input_bar} value = {newTask} onChange={(e) => setNewTask(e.currentTarget.value)}/>
            <button className={styles.add_button}>+</button>
        </form>
    </div>
    )
}
