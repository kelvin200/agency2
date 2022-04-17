import { Col, Row } from 'antd'
import React from 'react'
import { Fade } from 'react-awesome-reveal'
import { withTranslation } from 'react-i18next'

import { Button } from '../../../common/Button'
import { SvgIcon } from '../../../common/SvgIcon'
import { ContentBlockProps } from '../types'

const RightBlock = ({
  title,
  content,
  button,
  icon,
  t,
  id,
}: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement
    element.scrollIntoView({
      behavior: 'smooth',
    })
  }
  return (
    <section className="contentblockright-container">
      <Fade direction="right">
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={11} md={11} sm={11} xs={24}>
            <div className="contentblockright-wrapper">
              <h6>{t(title)}</h6>
              <p className="contentblock-content">{t(content)}</p>
              <div className="contentblockright-buttonwrapper">
                {typeof button === 'object' &&
                  button.map((item: any, id: number) => {
                    return (
                      <Button
                        key={id}
                        color={item.color}
                        fixedWidth={true}
                        onClick={() => scrollTo('about')}
                      >
                        {t(item.title)}
                      </Button>
                    )
                  })}
              </div>
            </div>
          </Col>
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
        </Row>
      </Fade>
    </section>
  )
}

export default withTranslation()(RightBlock)
