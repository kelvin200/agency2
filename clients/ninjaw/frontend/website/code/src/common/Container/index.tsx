import React from 'react'
import { ContainerProps } from '../types'

const Container = ({ border, children }: ContainerProps) => (
  <div
    className="common-container"
    style={{
      borderTop: border ? '1px solid #CDD1D4' : '',
    }}
  >
    {children}
  </div>
)

export default Container
