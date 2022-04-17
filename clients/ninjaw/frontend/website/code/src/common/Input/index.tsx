import React from 'react'
import { withTranslation } from 'react-i18next'

import { InputProps } from '../types'

const Input = ({ name, placeholder, onChange, t }: InputProps) => (
  <div className="input-container">
    <label className="textarea-label" htmlFor={name}>
      {t(name)}
    </label>
    <input
      className="input"
      placeholder={t(placeholder)}
      name={name}
      id={name}
      onChange={onChange}
    />
  </div>
)

export default withTranslation()(Input)
