import {configureStore} from '@reduxjs/toolkit'
import {reduceActivities} from './babyActivities'

const createStore = preloadedState => {
  return configureStore({
    reducer: {
      babyActivities: reduceActivities
    },
    ...(preloadedState && {preloadedState})
  })
}

export default createStore
