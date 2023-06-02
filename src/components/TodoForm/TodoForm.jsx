import React, { useState } from 'react'
import * as styles from './TodoForm.module.css'


export default function TodoForm({onAdd, onUpload}) {
    const [newTask, setNewTask] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() !== ''){
            onAdd(newTask, null);
            setNewTask("");
        }
    }

    return (
    <div>
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.input_bar}>
                <input type="text" placeholder='Enter a new task...' className={styles.text_bar} value = {newTask} onChange={(e) => setNewTask(e.currentTarget.value)}/>
                <div className={styles.upload} >
                    <label htmlFor="file-input">
                        <img className={styles.fileImg} src="/src/assets/file.svg" alt="File upload" />
                    </label>
                    <input type="file" id="file-input" onChange={onUpload}/>
                </div>
            </div>
            <button className={styles.add_button}>+</button>
        </form>
    </div>
    )
}
