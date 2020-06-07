import React, { useState } from 'react'

const ENTER_KEY = 13
const ESCAPE_KEY = 27

export function EditTodoEntry({ editTodo, cancelEdit, text }) {
  const [input, setInput] = useState(text)

  const handleInputChange = (evt) => {
    setInput(evt.target.value)
  }

  const handleKeyDown = (evt) => {
    if (evt.keyCode === ENTER_KEY) {
      editTodo(input)
    } else if (evt.keyCode === ESCAPE_KEY) {
      cancelEdit()
    }
  }

  return (
    <input
      className="edit"
      type="text"
      value={input}
      onKeyDown={handleKeyDown}
      onBlur={cancelEdit}
      onChange={handleInputChange}
      autoFocus
    />
  )
}

export function AddTodoEntry({ handleTodo }) {
  const [input, setInput] = useState('')

  const handleInputChange = (evt) => {
    setInput(evt.target.value)
  }

  const handleKeyPress = (evt) => {
    if (evt.keyCode === ENTER_KEY && input.trim() !== '') {
      handleTodo(input)
      setInput('')
    }
  }

  return (
    <input
      className="new-todo"
      type="text"
      value={input}
      onKeyDown={handleKeyPress}
      onChange={handleInputChange}
      placeholder="What needs to be done?"
    />
  )
}