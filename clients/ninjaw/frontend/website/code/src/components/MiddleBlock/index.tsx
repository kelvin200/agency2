import { Col, Row } from 'antd'
import React from 'react'
import { Slide } from 'react-awesome-reveal'
import { withTranslation } from 'react-i18next'

import { Button } from '../../common/Button'

interface MiddleBlockProps {
  title: string
  content: string
  button: string
  t: any
}

const MiddleBlock = ({ title, content, button, t }: MiddleBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement
    element.scrollIntoView({
      behavior: 'smooth',
    })
  }
  return (
    <div className="middleblock-section">
      <Slide direction="up">
        <Row justify="center" align="middle">
          <div className="middleblock-contentwrapper">
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <div className="middleblock-content">{t(content)}</div>
              {button && (
                <Button name="submit" onClick={() => scrollTo('mission')}>
                  {t(button)}
                </Button>
              )}
            </Col>
          </div>
        </Row>
      </Slide>
    </div>
  )
}

export default withTranslation()(MiddleBlock)
