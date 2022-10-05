import React from 'react';
import './App.css';
import TodoTable from './TodoTable';

function App() {
  const [todo, setTodo] = React.useState({description:'', date:''});
  const [todos, setTodos] = React.useState([]);

  const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});};

  const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, todo]);
    };
  const removeTodo = (todo) => {
      console.log(todo);
      let filteredArr = todos.filter((el) => el!== todo);
      setTodos(filteredArr);
    };
  
  return (
    <div className="App">
      <header>To Do List</header>
      <form onSubmit={addTodo}>
        <a>Description: </a>
          <input 
            type= "text" 
            value={todo.description} 
            onChange={inputChanged}
            name="description"
            />
        <a>Date: </a>
          <input 
            type="date" 
            value={todo.date} 
            onChange={inputChanged}
            name="date"
            />
        <input type="submit" value="Add"/> 
      </form>
      <table>
        <h4 class="eka">Date:</h4>
        <h4 class="toka">Description: </h4>
        <TodoTable todos={todos} removeTodo={removeTodo} />
      </table>
    </div>
  );
}

export default App;
