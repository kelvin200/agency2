import React from 'react'

import Container from '../../common/Container'
import ScrollToTop from '../../common/ScrollToTop'
import Contact from '../../components/ContactForm'
import ContentBlock from '../../components/ContentBlock'
import MiddleBlock from '../../components/MiddleBlock'
import AboutContent from '../../content/AboutContent.json'
import ContactContent from '../../content/ContactContent.json'
import IntroContent from '../../content/IntroContent.json'
import MiddleBlockContent from '../../content/MiddleBlockContent.json'
import MissionContent from '../../content/MissionContent.json'
import ProductContent from '../../content/ProductContent.json'

export const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="developer.svg"
        id="intro"
      />
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
      />
      <ContentBlock
        type="left"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="graphs.svg"
        id="about"
      />
      <ContentBlock
        type="right"
        title={MissionContent.title}
        content={MissionContent.text}
        icon="product-launch.svg"
        id="mission"
      />
      <ContentBlock
        type="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="waving.svg"
        id="product"
      />
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  )
}
