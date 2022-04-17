/**
 * Plugins specific to the "website" app.
 */
/**
 * Ensures GraphQL's PbPage and PbPageListItem types are correctly cached.
 */
import apolloCacheObjectId from '@webiny/app-page-builder/render/plugins/apolloCacheObjectId'
import block from '@webiny/app-page-builder/render/plugins/elements/block'
import button from '@webiny/app-page-builder/render/plugins/elements/button'
import cell from '@webiny/app-page-builder/render/plugins/elements/cell'
/**
 * Page element plugins to render page content.
 */
import document from '@webiny/app-page-builder/render/plugins/elements/document'
import codesandbox from '@webiny/app-page-builder/render/plugins/elements/embeds/codesandbox'
import pinterest from '@webiny/app-page-builder/render/plugins/elements/embeds/pinterest'
import soundcloud from '@webiny/app-page-builder/render/plugins/elements/embeds/soundcloud'
import twitter from '@webiny/app-page-builder/render/plugins/elements/embeds/twitter'
import vimeo from '@webiny/app-page-builder/render/plugins/elements/embeds/vimeo'
import youtube from '@webiny/app-page-builder/render/plugins/elements/embeds/youtube'
import grid from '@webiny/app-page-builder/render/plugins/elements/grid'
import heading from '@webiny/app-page-builder/render/plugins/elements/heading'
import icon from '@webiny/app-page-builder/render/plugins/elements/icon'
import image from '@webiny/app-page-builder/render/plugins/elements/image'
import imagesList from '@webiny/app-page-builder/render/plugins/elements/imagesList'
import list from '@webiny/app-page-builder/render/plugins/elements/list'
import pagesList from '@webiny/app-page-builder/render/plugins/elements/pagesList'
import paragraph from '@webiny/app-page-builder/render/plugins/elements/paragraph'
import quote from '@webiny/app-page-builder/render/plugins/elements/quote'
/**
 * Page element settings plugins.
 */
import align from '@webiny/app-page-builder/render/plugins/elementSettings/align'
import animation from '@webiny/app-page-builder/render/plugins/elementSettings/animation'
import background from '@webiny/app-page-builder/render/plugins/elementSettings/background'
import border from '@webiny/app-page-builder/render/plugins/elementSettings/border'
import height from '@webiny/app-page-builder/render/plugins/elementSettings/height'
import margin from '@webiny/app-page-builder/render/plugins/elementSettings/margin'
import padding from '@webiny/app-page-builder/render/plugins/elementSettings/padding'
import shadow from '@webiny/app-page-builder/render/plugins/elementSettings/shadow'
import textSetting from '@webiny/app-page-builder/render/plugins/elementSettings/text'
import visibility from '@webiny/app-page-builder/render/plugins/elementSettings/visibility'
import width from '@webiny/app-page-builder/render/plugins/elementSettings/width'
/**
 * Page settings plugins (seo, social, etc.).
 */
import pageSettings from '@webiny/app-page-builder/render/plugins/pageSettings'
/**
 * Responsive display mode plugins.
 */
import responsiveMode from '@webiny/app-page-builder/render/plugins/responsiveMode'

import linkPreload from './linkPreload'

export default [
  linkPreload(),
  apolloCacheObjectId,

  // Page elements
  document(),
  block(),
  grid(),
  cell(),
  image(),
  icon(),
  paragraph(),
  heading(),
  list(),
  quote(),
  button(),
  codesandbox(),
  soundcloud(),
  youtube(),
  vimeo(),
  twitter(),
  pinterest(),
  pagesList(),
  imagesList(),
  // Page settings
  pageSettings(),
  // Page element settings
  align,
  animation,
  background,
  border,
  height,
  width,
  shadow,
  padding,
  margin,
  textSetting,
  visibility,
  responsiveMode(),
]
