import { Col, Row } from 'antd'
import i18n from 'i18next'
import React from 'react'
import { withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Container from '../../common/Container'
import { SvgIcon } from '../../common/SvgIcon'

interface SocialLinkProps {
  href: string
  src: string
}

const Footer = ({ t }: any) => {
  const handleChange = (language: string) => {
    i18n.changeLanguage(language)
  }

  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    )
  }

  return (
    <>
      <footer className="footer-section">
        <Container>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <h4 className="footer-language">{t('Contact')}</h4>
              <Link className="footer-large" to="/">
                {t('Tell us everything')}
              </Link>
              <div className="footer-para">
                {t(`Do you have any question? Feel free to reach out.`)}
              </div>
              <a href="mailto:l.qqbadze@gmail.com">
                <p className="footer-chat">{t(`Let's Chat`)}</p>
              </a>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <h4 className="footer-title">{t('Policy')}</h4>
              <Link className="footer-large" to="/">
                {t('Application Security')}
              </Link>
              <Link className="footer-large" to="/">
                {t('Software Principles')}
              </Link>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="footer-empty" />
              <Link className="footer-large" to="/">
                {t('Support Center')}
              </Link>
              <Link className="footer-large" to="/">
                {t('Customer Support')}
              </Link>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <div className="footer-empty" />
              <h4 className="footer-language">{t('Address')}</h4>
              <div className="footer-para">Rancho Santa Margarita</div>
              <div className="footer-para">2131 Elk Street</div>
              <div className="footer-para">California</div>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <h4 className="footer-title">{t('Company')}</h4>
              <Link className="footer-large" to="/">
                {t('About')}
              </Link>
              <Link className="footer-large" to="/">
                {t('Blog')}
              </Link>
              <Link className="footer-large" to="/">
                {t('Press')}
              </Link>
              <Link className="footer-large" to="/">
                {t('Careers & Culture')}
              </Link>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <label className="footer-label" htmlFor="select-lang">
                {t('Language')}
              </label>
              <div className="footer-languageswitchcontainer">
                <div
                  className="footer-languageswitch"
                  onClick={() => handleChange('en')}
                >
                  <SvgIcon
                    src="united-states.svg"
                    aria-label="homepage"
                    width="30px"
                    height="30px"
                  />
                </div>
                <div
                  className="footer-languageswitch"
                  onClick={() => handleChange('es')}
                >
                  <SvgIcon
                    src="spain.svg"
                    aria-label="homepage"
                    width="30px"
                    height="30px"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <section className="footer-section">
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingTop: '3rem' }}
          >
            <Link className="footer-navlink" to="/">
              <div className="footer-logocontainer">
                <SvgIcon
                  src="logo.svg"
                  aria-label="homepage"
                  width="101px"
                  height="64px"
                />
              </div>
            </Link>
            <div className="footer-container">
              <SocialLink
                href="https://github.com/Adrinlol/create-react-app-adrinlol"
                src="github.svg"
              />
              <SocialLink
                href="https://twitter.com/Adrinlolx"
                src="twitter.svg"
              />
              <SocialLink
                href="https://www.linkedin.com/in/lasha-kakabadze/"
                src="linkedin.svg"
              />
              <SocialLink
                href="https://medium.com/@lashakakabadze/"
                src="medium.svg"
              />
              <a href="https://www.buymeacoffee.com/adrinlol">
                <img
                  src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=adrinlol&button_colour=FF5F5F&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
                  alt="Buy me a pizza"
                />
              </a>
            </div>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default withTranslation()(Footer)
