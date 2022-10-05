import React from 'react';
import './App.css';

export default function TodoTable(props, {removeTodo}) {
return (
    <div>
        <table>
        <tbody>
          {props.todos.map((todo, index) =>
            <tr key={index}>
              <td>
                {todo.description}
              </td>
              <td>
                {todo.date}
              </td>
              <button onClick={() => removeTodo(todo)}>Delete</button>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  }