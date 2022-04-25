import './style.scss'

import React, { useState } from 'react'

import { data } from './data'

export const Wheel = () => {
  const [angle, setangle] = useState(0)
  const randomSeconds = Math.round(Math.random() * 10)
  const totalRotates = randomSeconds * 360

  const nthElement = totalRotates / 360

  const handleClick = async () => {
    const finalAngle = nthElement * 45
    setangle(finalAngle)
    console.log(`The arrow is pointing to ${finalAngle} degree in the circle`)
  }

  return (
    <div>
      <button onClick={handleClick} id="spin">
        {' '}
        Spin{' '}
      </button>

      <span className="arrow"> </span>

      <div
        style={{ transform: `rotate(${totalRotates}deg)` }}
        className="container"
      >
        {data?.map((element, index) => (
          <div key={index} className={element.class}>
            {element.text}
          </div>
        ))}
      </div>

      <div>
        <span className="anglerotate">{angle && angle + ' deg'}</span>
      </div>
    </div>
  )
}
