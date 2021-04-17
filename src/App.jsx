import './App.css';
import {useEffect, useState} from "react";

function App() {

    const [todos, setTodos] = useState([]);
    const [i, setI] = useState(0);
    const [filter, setFilter] = useState('all');

    function addTodo(e) {
        if (e.code === "Enter") {
            setI(i + 1);
            setTodos([...todos, {'id': i, 'name': e.target.value, 'completed': false}]);
            e.target.value = '';
        }
    }

    function removeTodo(toRemoveTodo) {
        todos.forEach((todo, i) => {
            if (todo.id === toRemoveTodo.id) {
                todos.splice(i, 1);
                setTodos([...todos]);
            }
        })
    }

    function handleCompleted(toHandleTodo) {
        toHandleTodo.completed = !toHandleTodo.completed;
        setTodos([...todos]);
    }

    useEffect(() => {
        if (localStorage.getItem('todos')) {
            setTodos(JSON.parse(localStorage.getItem('todos')));
        }
        if (localStorage.getItem('filter')) {
            setFilter(localStorage.getItem('filter'))
        }
        if (localStorage.getItem('index')) {
            setI(parseInt(localStorage.getItem('index')))
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])


    useEffect(() => {
        localStorage.setItem('filter', filter);
    }, [filter])

    useEffect(() => {
        localStorage.setItem('index', i.toString())
    }, [i])

    return (
        <div className="todo">
            <h1>Todos</h1>
            <p>Nombre d'items : {todos.length}</p>
            <input id="input" type="text" onKeyPress={addTodo}/>
            <ul>
                {todos.filter(todo => {
                        if (filter === 'completed') {
                            return (todo.completed);
                        } else if (filter === 'active') {
                            return (!todo.completed);
                        }
                        return true;
                    }
                ).map(todo => (
                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.completed} onChange={() => handleCompleted(todo)}/>
                        {todo.name}
                        <button type="button" onClick={() => removeTodo(todo)}>click</button>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={() => setFilter('all')}>All</button>
            <button type="button" onClick={() => setFilter('active')}>Active</button>
            <button type="button" onClick={() => setFilter('completed')}>Completed</button>
            <button type="button" onClick={() => setTodos(todos.filter(todo => !todo.completed))}>Clear Completed
            </button>
        </div>
    );
}

export default App;
