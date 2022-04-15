import { Col, Drawer, Row } from 'antd'
import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '../../common/Button'
import Container from '../../common/Container'
import { SvgIcon } from '../../common/SvgIcon'

const Header = ({ t }: any) => {
  const [visible, setVisibility] = useState(false)

  const showDrawer = () => {
    setVisibility(!visible)
  }

  const onClose = () => {
    setVisibility(!visible)
  }

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement
      element.scrollIntoView({
        behavior: 'smooth',
      })
      setVisibility(false)
    }
    return (
      <>
        <div
          className="header-customnavlinksmall"
          onClick={() => scrollTo('about')}
        >
          <span className="header-span">{t('About')}</span>
        </div>
        <div
          className="header-customnavlinksmall"
          onClick={() => scrollTo('mission')}
        >
          <span className="header-span">{t('Mission')}</span>
        </div>
        <div
          className="header-customnavlinksmall"
          onClick={() => scrollTo('product')}
        >
          <span className="header-span">{t('Product')}</span>
        </div>
        <div
          className="header-customnavlinksmall"
          style={{ width: '180px' }}
          onClick={() => scrollTo('contact')}
        >
          <span className="header-span">
            <Button>{t('Contact')}</Button>
          </span>
        </div>
      </>
    )
  }

  return (
    <div className="header-section">
      <Container>
        <Row justify="space-between">
          <Link to="/" aria-label="homepage" className="header-logocontainer">
            <SvgIcon src="logo.svg" width="101px" height="64px" />
          </Link>
          <div className="header-nothidden">
            <MenuItem />
          </div>
          <div className="header-burger" onClick={showDrawer}>
            <div className="header-outline" />
          </div>
        </Row>
        <Drawer closable={false} visible={visible} onClose={onClose}>
          <Col style={{ marginBottom: '2.5rem' }}>
            <span className="header-label" onClick={onClose}>
              <Col span={12}>
                <h5 className="header-menu">Menu</h5>
              </Col>
              <Col span={12}>
                <div className="header-outline" />
              </Col>
            </span>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </div>
  )
}

export default withTranslation()(Header)
