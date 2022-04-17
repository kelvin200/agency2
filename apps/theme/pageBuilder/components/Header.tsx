import { PbPageData } from '@webiny/app-page-builder/types'
import React, { useCallback,useState } from 'react'

import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const menuName = 'main-menu'

type HeaderProps = {
  settings: Record<string, any>
  page: PbPageData
}

const Header = ({ settings }: HeaderProps) => {
  const { name, logo } = settings

  const [mobileMenu, showMobileMenu] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    showMobileMenu(!mobileMenu)
  }, [mobileMenu])

  return (
    <React.Fragment>
      <div
        className={'webiny-pb-section-header'}
        data-testid={'pb-desktop-mobile-headers'}
      >
        <DesktopHeader menuName={menuName} name={name} logo={logo} />
        <MobileHeader
          menuName={menuName}
          name={name}
          logo={logo}
          active={mobileMenu}
          toggleMenu={toggleMobileMenu}
        />
      </div>
      <div className={'webiny-pb-section-header-spacer'} />
    </React.Fragment>
  )
}

export default Header
