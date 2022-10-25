
import React, { useRef, useState } from 'react';
import './App.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField';
import Stack from'@mui/material/Stack';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



function App() {
  const [todo, setTodo] = React.useState({description:'', priority:'', selectDate:''});
  const [todos, setTodos] = React.useState([]);
  const [selectDate, handleDateChange] = useState(new Date());
  const [value, setValue] = React.useState('1');
  const gridRef = useRef();

  const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});
    }


  const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, todo]);
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


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
      {headerName: 'Date', field: 'selectDate', sortable: true, filter:true, floatingFilter: true, animateRows:'true'},
      {headerName: 'Priority', field: 'priority', sortable: true, filter: true, floatingFilter: true, animateRows:'true',
      cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}},    
    
    ]
  
  return (

    <div className="App" class="koko">
       <Box sx={{ width: '100%'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} style ={{marginRight:'45%', float:'right'}}>
            <Tab label="Home" value="1" />
            <Tab label="To do list" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><h3>Welcome to the Home page</h3>
        </TabPanel>
        <TabPanel value="2"><header>TodoList</header>
      < Stack direction="row" spacing={2}
       justifyContent="center" alingItems="center" 
       marginTop="30px" onSubmit={addTodo}>
          <TextField 
            label="Description"
            value={todo.description} 
            variant="standard"
            onChange={inputChanged}
            name="description"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils }>
            <DatePicker 
            variant="standard"
            value={selectDate} 
            onChange={selectDate => handleDateChange(selectDate)}
            style={{marginTop:'16px'}}
            />
            </MuiPickersUtilsProvider>
          <TextField 
            value={todo.priority}
            label="Priority"
            variant="standard"
            onChange={inputChanged}
            name="priority"
            />
        <Button type="submit" onClick={addTodo} variant="contained"> Add</Button> 
        <Button type ="button" onClick={deleteTodo} variant="contained">Delete</Button>
      </Stack>
  
      <div
      className="ag-theme-material"
      style={{
        height:'900px',
        width:'25%',
        margin:'auto',
        fontSize: 'x-large',
        marginLeft:'1100px',
        marginRight:'400px'
  
      }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady ={params => gridRef.current = params.api}
          rowSelection='single'
          columnDefs={columns}
          rowData={todos}>
        </AgGridReact>
      </div></TabPanel>
      </TabContext>
    </Box>
    </div>
  );
}

export default App;
