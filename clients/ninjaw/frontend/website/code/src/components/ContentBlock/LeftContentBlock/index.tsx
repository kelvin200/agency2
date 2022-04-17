import { Col, Row } from 'antd'
import React from 'react'
import { Fade } from 'react-awesome-reveal'
import { withTranslation } from 'react-i18next'

import { SvgIcon } from '../../../common/SvgIcon'
import { ContentBlockProps } from '../types'

const LeftContentBlock = ({
  icon,
  title,
  content,
  section,
  t,
  id,
}: ContentBlockProps) => {
  return (
    <section className="contentblockleft-section">
      <Fade direction="left">
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
          <Col lg={11} md={11} sm={11} xs={24}>
            <div className="contentblockleft-wrapper">
              <h6>{t(title)}</h6>
              <p className="contentblock-content">{t(content)}</p>
              <div className="contentblockleft-service">
                <Row justify="space-between">
                  {typeof section === 'object' &&
                    section.map((item: any, id: number) => {
                      return (
                        <Col key={id} span={11}>
                          <SvgIcon src={item.icon} width="60px" height="60px" />
                          <h6 className="contentblockleft-mintitle">
                            {t(item.title)}
                          </h6>
                          <p className="contentblockleft-minpara">
                            {t(item.content)}
                          </p>
                        </Col>
                      )
                    })}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Fade>
    </section>
  )
}

export default withTranslation()(LeftContentBlock)
