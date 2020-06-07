import React, { Fragment, useEffect, useState } from 'react'

function TodoCount({ todosLeft }) {
  const count = todosLeft()

  return (
    <span className="todo-count">
      <strong>{count}</strong> item left Powered by <a href="https://github.com/midwayjs/midway-faas/">Midway FaaS</a>
    </span>
  )
}

export default function({ todos }) {
  const todosLeft = () => {
    return todos.filter((todo) => !todo.completed).length
  }

  const display =
    todos.length > 0 ? (
      <footer className="footer">
        <TodoCount todosLeft={todosLeft} />
      </footer>
    ) : null

  return display
}