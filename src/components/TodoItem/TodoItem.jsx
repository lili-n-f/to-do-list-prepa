import * as styles from './TodoItem.module.css'

export default function TodoItem({todo, onComplete, onDelete}) {
    
    
    const getStyle = () => {
        return {
            textDecoration: todo.completed ? 'line-through' : 'none',
        }
    }

    return (
    <div className={styles.item} >
            <input type="checkbox" checked = {todo.completed} onChange={() => onComplete(todo)}/>
            <span className={styles.task_name} style={getStyle()}>{todo.task}</span>
        <button className={styles.del_button} onClick={()=> onDelete(todo)}>x</button>
    </div>
    )
}
