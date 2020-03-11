import {useDispatch} from 'react-redux'
import {createReducer} from '@reduxjs/toolkit'

import shortid from 'shortid'

const updateActivity = 'BABY_UPDATE_ACTIVITY'

const useRecordActivity = () => {
  const dispatch = useDispatch()
  return ({type: activityType, id=shortid(), values}) => {
    const {eventDate, eventTime, amount} = values
    dispatch({
      type: updateActivity,
      payload: {
        id,
        activityType,
        date: new Date(`${eventDate} + ${eventTime}`).toJSON()
      }
    })
  }
}

const reduceActivities = createReducer(
  {
    byId: {}, allIds: []
  },
  {
    [updateActivity]: (state, {payload: {id, activityType, values}}) => {
      state.byId[id] = {
        activityType,
        ...values
      }
      state.allIds.push(id)
    }
  }
)

const getLastActivity = ({babyActivities: {byId, allIds=[]}}) => {
  const last = allIds[allIds.length - 1]
  return last ? byId[last] : {}
}

export {reduceActivities, useRecordActivity, getLastActivity}