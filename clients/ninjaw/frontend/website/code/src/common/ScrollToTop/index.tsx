import React, { useEffect, useState } from 'react'
import { SvgIcon } from '../SvgIcon'
import { getScroll } from '../utils/getWindow'

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = (event: any) => {
    const offsetFromTop = getScroll(event.target, true)

    if (!showScroll && offsetFromTop > 350) {
      setShowScroll(true)
    } else if (offsetFromTop <= 350) {
      setShowScroll(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
    return () => {
      window.removeEventListener('scroll', checkScrollTop)
    }
  }, [])

  const scrollUp = () => {
    const element = document.getElementById('intro') as HTMLDivElement
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }

  return (
    <div
      className="scrollup-container"
      onClick={scrollUp}
      style={{
        visibility: showScroll ? 'visible' : 'hidden',
        opacity: showScroll ? 1 : 0,
      }}
    >
      <SvgIcon src="scroll-top.svg" width="20px" height="20px" />
    </div>
  )
}

export default ScrollToTop
