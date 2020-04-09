import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { animated, useTransition } from 'react-spring'

const initialState = [{ id: 1 }, { id: 2 }, { id: 3 }]

function App() {
  const [items, setItems] = useState(initialState)
  const [refMap] = useState(() => new WeakMap())
  const config = { tension: 125, friction: 20, precision: 0.1 }

  const transitions = useTransition(items, {
    initial: null,
    from: { height: 0, opacity: 0, overflow: 'hidden' },

    // Switching this enter to not use async works fine
    // enter: { height: 20, opacity: 1, overflow: 'hidden' },

    enter: item => async next => {
      await next({
        height: refMap.get(item).offsetHeight,
        opacity: 1,
        overflow: 'hidden',
      })
    },
    leave: { height: 0, opacity: 0, overflow: 'hidden' },
    key: items => items.id,
    config,
  })

  function addItems() {
    setItems(items => {
      return [...items, { id: items.length + 1 }]
    })
  }
  return (
    <div className="App">
      <button onClick={addItems}>Add</button>
      {transitions((style, block) => {
        return (
          <animated.div style={style}>
            <div ref={ref => ref && refMap.set(block, ref)}>
              <div style={{ color: '#fff' }}>{block.id}</div>
            </div>
          </animated.div>
        )
      })}
    </div>
  )
}

function bootstrap() {
  ReactDOM.render(<App />, document.getElementById('app'))
}

bootstrap()
