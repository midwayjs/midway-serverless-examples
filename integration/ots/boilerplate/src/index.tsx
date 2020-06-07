import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';

import './index.css';
import 'todomvc-app-css/index.css'
import { AddTodoEntry } from './components/entry'
import Footer from './components/footer'
import Todos from './components/todos'

export default function App() {
  const [ todos, setTodos ] = useState([])

  const getList = () => {
    fetch('/api/list').then(resp => resp.json()).then((todos) => setTodos(todos.list))
  };

  useEffect(getList, [])

  const toggleAll = async () => {
    
  }

  const handleAdd = async (text: string) => {
    await fetch('/api/add?todo='+ text);
    getList();
  }

  const handleEdit = async (todo: any) => {
    if (todo.type === 'remove') {
      await fetch('/api/remove?id=' + todo.id);
    } else if (todo.type === 'update') {
      await fetch(`/api/update?id=${todo.id}&status=${todo.status}&todo=${todo.todo}`);
    }
    getList();
  }

  return (
    <div className="App">
      <section className="todoapp">
        <h1>todos</h1>
        <AddTodoEntry handleTodo={handleAdd} />
        <Todos todos={todos} handleEdit={handleEdit} toggleAll={toggleAll} />
        <Footer todos={todos} />
      </section>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);