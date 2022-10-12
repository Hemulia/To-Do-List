import React, {useRef} from 'react';
import './App.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

function App() {
  const [todo, setTodo] = React.useState({description:'', date:'', priority:''});
  const [todos, setTodos] = React.useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});}

  const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, todo]);
    }


    const deleteTodo = () => {
      if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                  index !== gridRef.current.getSelectedNodes()[0].childIndex))
                 }
                else {
                  alert('Select row first');
                }}

    const columns = [
      {headerName: 'Description', field: 'description', sortable: true, filter: true, floatingFilter: true, animateRows:'true'},
      {headerName: 'Date', field: 'date', sortable: true, filter:true, floatingFilter: true, animateRows:'true'},
      {headerName: 'Priority', field: 'priority', sortable: true, filter: true, floatingFilter: true, animateRows:'true',
      cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}},
      
    
    ]

  return (
    <div className="App" class="koko">
      <header>TodoList</header>
      <form onSubmit={addTodo} onC style={{textAlign:'center', fontSize: 'x-large'}}>

          <input 
            type= "text" 
            value={todo.description} 
            onChange={inputChanged}
            name="description"
            />
          <input 
            type="date" 
            value={todo.date} 
            onChange={inputChanged}
            name="date"
            />
          <input 
            type="text" 
            value={todo.priority}
            onChange={inputChanged}
            name="priority"
            />
        <button type="submit" > Add</button>
        <button type ="button"onClick={deleteTodo}>Delete</button>  
      </form>
      <div
      className="ag-theme-material"
      style={{
        height:'900px',
        width:'26.5%',
        margin:'auto',
        fontSize: 'x-large',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'35px'
  
      }}
      >
        <AgGridReact 
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api }
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}>
          
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
