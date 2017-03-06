import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

// Counter reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Counter component
class Counter extends React.Component{
  render() {
    return (
      <div>
        <h1> { this.props.value } </h1>
        <button onClick={this.props.onIncrement}>+</button>
        <button onClick={this.props.onDecrement}>-</button>
      </div>
    )
  }
}

// Render everything to the DOM
const render = () => {
  ReactDOM.render(
    <Counter 
      value={store.getState()}
      onIncrement={() => store.dispatch({
        type: 'INCREMENT'
      })}
      onDecrement={() => store.dispatch({
        type: 'DECREMENT'
      })} />
    , document.getElementById('app')
  )
}
// Subscribe to Store changes by re-rendering
store.subscribe(render)

// Render component after DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  render()
})

// Store Tests
expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1)
expect(
  counter(1, { type: 'INCREMENT' })
).toEqual(2)
expect(
  counter(2, { type: 'DECREMENT' })
).toEqual(1)
expect(
  counter(1, { type: 'DECREMENT' })
).toEqual(0)
expect(
  counter(undefined, '')
).toEqual(0)
