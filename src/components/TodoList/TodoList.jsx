import TodoItem from '../TodoItem/TodoItem'
import * as styles from './TodoList.module.css'

export default function TodoList({todos, onComplete, onDelete}) {
    return (
    <div className={styles.container}>
        {todos.map((todo)=>{
            return <TodoItem key={todo.id} todo={todo} onComplete={onComplete} onDelete={onDelete}/>
        })}
    </div>
    )
}
