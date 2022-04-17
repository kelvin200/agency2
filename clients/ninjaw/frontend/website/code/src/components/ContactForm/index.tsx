import { Col, Row } from 'antd'
import React from 'react'
import { Slide, Zoom } from 'react-awesome-reveal'
import { withTranslation } from 'react-i18next'

import { Button } from '../../common/Button'
import Input from '../../common/Input'
import TextArea from '../../common/TextArea'
import { useForm } from '../../common/utils/useForm'
import validate from '../../common/utils/validationRules'
import Block from '../Block'
import { ContactProps, ValidationTypeProps } from './types'

const Contact = ({ title, content, id, t }: ContactProps) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    validate,
  ) as any

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type]
    return (
      <Zoom direction="left">
        <span className="contact-span">{ErrorMessage}</span>
      </Zoom>
    )
  }

  return (
    <div className="contact-container" id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right">
            <form
              className="contact-formgroup"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Col span={24}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={values.name || ''}
                  onChange={handleChange}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  value={values.email || ''}
                  onChange={handleChange}
                />
                <ValidationType type="email" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder="Your Message"
                  value={values.message || ''}
                  name="message"
                  onChange={handleChange}
                />
                <ValidationType type="message" />
              </Col>
              <div className="contact-buttoncontainer">
                <Button name="submit">{t('Submit')}</Button>
              </div>
            </form>
          </Slide>
        </Col>
      </Row>
    </div>
  )
}

export default withTranslation()(Contact)
