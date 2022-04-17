import React from 'react'
import { withTranslation } from 'react-i18next'

import { InputProps } from '../types'

const TextArea = ({ name, placeholder, onChange, t }: InputProps) => (
  <div className="textarea-container">
    <label className="textarea-label" htmlFor={name}>
      {t(name)}
    </label>
    <textarea
      className="textarea"
      placeholder={t(placeholder)}
      id={name}
      name={name}
      onChange={onChange}
    />
  </div>
)

export default withTranslation()(TextArea)
