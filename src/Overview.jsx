import React from 'react'
import { useSelector } from 'react-redux'
import { getLastActivity } from './store/babyActivities'

const Overview = () => {
  const last = useSelector(getLastActivity)
  
  return (
    <div className="overview">
      {last.activityType ?(
        <div>
          {last.activityType} - {last.eventTime}
        </div>
      ): (
        <div className="placeholder">
          👶
        </div>
      )}
    </div>
  )
}

export default Overview