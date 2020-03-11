import React, {useState} from 'react'
import {useRecordActivity} from './store/babyActivities'

const useInputModel = (initial, submit) => {
  const [values, setValues] = useState(initial)

  const bind = name => ({
    value: values[name],
    onChange: event => {
      const value = event.target.value
      setValues(current => ({...current, [name]: value}))
    }
  })

  const handleSubmit = event => {
    event.preventDefault()
    submit(values)
  }

  return [bind, handleSubmit]
}

const getCurrentDate = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toJSON().slice(0, 10)
}

const getCurrentTime = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toJSON().slice(11, 16)
}

const RangeInput = ({max, step = 10, value = 0, onChange}) => {
  const length = Math.ceil(max / 50)
  return (
    <div className="range-input">
      <div className={!value && 'selected'} />
      {Array.from({length}, (_, index) => (
        <div
          className={[
            'range-group',
            Math.floor((value - 1) / 50) === index && 'selected'
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <button
            type="button"
            className={value === index * 50 + 50 && 'selected'}
            onClick={() => onChange({target: {value: index * 50 + 50}})}
          >
            {index * 50 + 50}
          </button>
          <div className="range-line">
            {Array.from({length: 5}, (_, sub) => (
              <button
                type="button"
                className={value === index * 50 + (sub + 1) * 10 && 'selected'}
                onClick={() =>
                  onChange({target: {value: index * 50 + (sub + 1) * 10}})
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const AddMemo = () => {
  const recordActivity = useRecordActivity()
  const [eventType, setEventType] = useState('?')
  const [bind, handleSubmit] = useInputModel(
    {
      eventDate: getCurrentDate(),
      eventTime: getCurrentTime()
    },
    values => {
      recordActivity({type: eventType, values})
      setEventType('✅')
    }
  )

  return (
    <div className="add-memo">
      {eventType === '?' ? (
        <div className="select-type">
          <button onClick={() => setEventType('🤱')}>🤱</button>
          <button onClick={() => setEventType('🍼')}>🍼</button>
          <button onClick={() => setEventType('💧')}>💧</button>
          <button onClick={() => setEventType('💩')}>💩</button>
        </div>
      ) : eventType !== '✅' ? (
        <>
          <div className="selected-type">{eventType}</div>
          <form onSubmit={handleSubmit}>
            <label>
              📅
              <input type="date" {...bind('eventDate')} />
            </label>
            <label>
              🕒
              <input type="time" {...bind('eventTime')} />
            </label>
            {(eventType === '🤱' || eventType === '🍼') && (
              <label>
                🍼
                <RangeInput max="200" {...bind('amount')} />
              </label>
            )}
            <div className="actions">
              <button type="button" onClick={() => setEventType('?')}>
                ❌
              </button>
              <button type="submit">✓</button>
            </div>
          </form>
        </>
      ) : (
        <div className="success">
          <div className="selected-type">{eventType}</div>
          <div className="actions">
            <button type="button" onClick={() => setEventType('?')}>
              ←
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddMemo
