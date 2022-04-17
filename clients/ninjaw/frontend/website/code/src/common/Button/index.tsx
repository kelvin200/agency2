import React from 'react'

import { ButtonProps } from '../types'

export const Button = ({ color, children, onClick }: ButtonProps) => (
  <button
    className="button"
    style={{
      background: color || '#2e186a',
      color: color ? '#2E186A' : '#fff',
    }}
    onClick={onClick}
  >
    {children}
  </button>
)
