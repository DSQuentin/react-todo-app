import './App.css';
import {useState} from "react";

function App() {

    const [todos, setTodos] = useState([]);
    const [i, setI] = useState(0);

    function addTodo(e){
        if(e.code === "Enter"){
            setI(i+1);
            setTodos([...todos, {'id' : i, 'name' : e.target.value, 'completed' : false}]);
            e.target.value = '';
        }
    }

    function removeTodo(toRemoveTodo){
        todos.forEach((todo, i) => {
            if (todo.id === toRemoveTodo.id){
                todos.splice(i, 1);
                console.log(todos);
                setTodos([...todos]);
            }
        })
    }

    function handleCompleted(toHandleTodo){
        toHandleTodo.completed = !toHandleTodo.completed;
        setTodos([...todos]);
    }

    function showTodos(){

    }

    return (
        <div className="todo">
            {JSON.stringify(todos)}
            <h1>Todos</h1>
            <input id="input" type="text" onKeyPress={addTodo}/>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.completed} onChange={() => handleCompleted(todo)}/>
                        {todo.name}
                        <button type="button" onClick={() => removeTodo(todo)}>click</button>
                    </li>
                ))}
            </ul>
            <button type="button">All</button>
            <button type="button">Active</button>
            <button type="button">Completed</button>
        </div>
    );
}

export default App;
