import React, { useEffect, useState } from 'react'
import { EditTodoEntry } from './entry'

function Todo({ todo, handleEdit }) {
  const [className, setClassName] = useState('')
  const [editVisible, setEditVisible] = useState(false)

  const removeTodo = (evt) => {
    handleEdit({ ...todo, type: 'remove'})
  }

  const showEdit = () => {
    setClassName('editing')
    setEditVisible(true)
  }

  const editTodo = (text) => {
    closeEdit()
    handleEdit({ ...todo, todo: text, type: 'update'})
  }

  const closeEdit = () => {
    setClassName('')
    setEditVisible(false)
  }

  const handleCompleted = () => {
    const completed = todo.status == 2
    const className = completed ? 'completed' : ''

    setClassName(className)
    handleEdit({ ...todo, type: 'update', status: todo.status == 2 ? 1: 2 })
  }

  // This takes the place of componentShouldUpdate, etc.
  useEffect(() => {
    if (className !== 'editing') {
      setClassName(todo.status == 2 ? 'completed' : '')
    }
  })

  const displayEdit = editVisible ? <EditTodoEntry editTodo={editTodo} cancelEdit={closeEdit} text={todo.todo} /> : null

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={handleCompleted} checked={todo.status == 2} />
        <label onDoubleClick={showEdit}>{todo.todo}</label>
        <button className="destroy" onClick={removeTodo} />
      </div>
      {displayEdit}
    </li>
  )
}

function TodosList({ todos, handleEdit }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo key={todo._id} todo={todo} handleEdit={handleEdit} />
      ))}
    </ul>
  )
}

function ToggleAll({ todos, handleToggleAll }) {
  const checked = todos.filter((todo) => !todo.completed).length === 0
  return (
    <>
      <input className="toggle-all" type="checkbox" checked={checked} readOnly />
      <label htmlFor="toggle-all" onClick={handleToggleAll}>
        Mark all as complete
      </label>
    </>
  )
}

export default function ({ todos, handleEdit, toggleAll }) {
  const display =
    todos.length > 0 ? (
      <section className="main">
        <ToggleAll todos={todos} handleToggleAll={toggleAll} />
        <TodosList todos={todos} handleEdit={handleEdit} />
      </section>
    ) : null
  return display
}