import React, {useEffect} from 'react'
import './App.sass'
import {Provider} from 'react-redux'
import createStore from './store/createStore'
import Overview from './Overview'
import AddMemo from './AddMemo'

const App = () => {
  let preload
  try {
    preload = JSON.parse(localStorage.getItem('state'))
  } catch(e) {}
  const store = createStore(preload)

  useEffect(() => {
    return store.subscribe(() => {
      localStorage.setItem('state', JSON.stringify(store.getState()))
    })
  }, [store])

  return (
    <Provider store={store}>
      <div className="app">
        <Overview />
        <AddMemo />
      </div>
    </Provider>
  )
}

export default App
