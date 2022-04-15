import React from 'react'
import { withTranslation } from 'react-i18next'

interface Props {
  title: string
  content: string
  t: any
}

const Block = ({ title, content, t }: Props) => {
  return (
    <div className="block-container">
      <h6>{t(title)}</h6>
      <div className="block-textwrapper">
        <div className="block-content">{t(content)}</div>
      </div>
    </div>
  )
}

export default withTranslation()(Block)
