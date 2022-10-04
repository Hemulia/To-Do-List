import React from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = React.useState({description:'', date:''});
  const [todos, setTodos] = React.useState([]);

  const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});};

  const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, todo]);
    };

  const remove = (todo) => {
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
        <tbody>
          {todos.map((todo, index) =>
            <tr key={index}>
              <td>
                {todo.description}
              </td>
              <td>
                {todo.date}
              </td>
              <button onClick={() => remove(todo)}>Delete</button>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
