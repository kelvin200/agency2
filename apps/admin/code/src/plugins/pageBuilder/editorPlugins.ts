import contentBackground from '@webiny/app-page-builder/editor/plugins/background'
import blockEditing from '@webiny/app-page-builder/editor/plugins/blockEditing'
// Blocks
import gridBlock from '@webiny/app-page-builder/editor/plugins/blocks/gridBlock'
// Block categories
import blocksCategories from '@webiny/app-page-builder/editor/plugins/blocksCategories'
// Breadcrumbs
import breadcrumbs from '@webiny/app-page-builder/editor/plugins/breadcrumbs'
// Default bar
import defaultBarPlugins from '@webiny/app-page-builder/editor/plugins/defaultBar'
// Element actions
import help from '@webiny/app-page-builder/editor/plugins/elementActions/help'
// Element groups
import basicGroup from '@webiny/app-page-builder/editor/plugins/elementGroups/basic'
import codeGroup from '@webiny/app-page-builder/editor/plugins/elementGroups/code'
import formGroup from '@webiny/app-page-builder/editor/plugins/elementGroups/form'
import layoutGroup from '@webiny/app-page-builder/editor/plugins/elementGroups/layout'
import mediaGroup from '@webiny/app-page-builder/editor/plugins/elementGroups/media'
import savedGroup from '@webiny/app-page-builder/editor/plugins/elementGroups/saved'
import socialGroup from '@webiny/app-page-builder/editor/plugins/elementGroups/social'
import block from '@webiny/app-page-builder/editor/plugins/elements/block'
import button from '@webiny/app-page-builder/editor/plugins/elements/button'
import cell from '@webiny/app-page-builder/editor/plugins/elements/cell'
import codesandbox from '@webiny/app-page-builder/editor/plugins/elements/code/codesandbox'
// Elements
import document from '@webiny/app-page-builder/editor/plugins/elements/document'
import grid from '@webiny/app-page-builder/editor/plugins/elements/grid'
import heading from '@webiny/app-page-builder/editor/plugins/elements/heading'
import icon from '@webiny/app-page-builder/editor/plugins/elements/icon'
import image from '@webiny/app-page-builder/editor/plugins/elements/image'
import imagesList from '@webiny/app-page-builder/editor/plugins/elements/imagesList'
import list from '@webiny/app-page-builder/editor/plugins/elements/list'
import soundcloud from '@webiny/app-page-builder/editor/plugins/elements/media/soundcloud'
import vimeo from '@webiny/app-page-builder/editor/plugins/elements/media/vimeo'
import youtube from '@webiny/app-page-builder/editor/plugins/elements/media/youtube'
import pagesList from '@webiny/app-page-builder/editor/plugins/elements/pagesList'
import paragraph from '@webiny/app-page-builder/editor/plugins/elements/paragraph'
import quote from '@webiny/app-page-builder/editor/plugins/elements/quote'
import pinterest from '@webiny/app-page-builder/editor/plugins/elements/social/pinterest'
import twitter from '@webiny/app-page-builder/editor/plugins/elements/social/twitter'
import action from '@webiny/app-page-builder/editor/plugins/elementSettings/action'
// Element settings
import advanced from '@webiny/app-page-builder/editor/plugins/elementSettings/advanced'
import align from '@webiny/app-page-builder/editor/plugins/elementSettings/align'
import animation from '@webiny/app-page-builder/editor/plugins/elementSettings/animation'
import background from '@webiny/app-page-builder/editor/plugins/elementSettings/background'
import border from '@webiny/app-page-builder/editor/plugins/elementSettings/border'
import clone from '@webiny/app-page-builder/editor/plugins/elementSettings/clone'
import deleteElement from '@webiny/app-page-builder/editor/plugins/elementSettings/delete'
import gridSettings from '@webiny/app-page-builder/editor/plugins/elementSettings/grid'
import height from '@webiny/app-page-builder/editor/plugins/elementSettings/height'
import link from '@webiny/app-page-builder/editor/plugins/elementSettings/link'
import margin from '@webiny/app-page-builder/editor/plugins/elementSettings/margin'
import padding from '@webiny/app-page-builder/editor/plugins/elementSettings/padding'
import save from '@webiny/app-page-builder/editor/plugins/elementSettings/save'
import shadow from '@webiny/app-page-builder/editor/plugins/elementSettings/shadow'
import textSettings from '@webiny/app-page-builder/editor/plugins/elementSettings/text'
import visibility from '@webiny/app-page-builder/editor/plugins/elementSettings/visibility'
import width from '@webiny/app-page-builder/editor/plugins/elementSettings/width'
// default presets for grid
import { gridPresets } from '@webiny/app-page-builder/editor/plugins/gridPresets'
// Icons
import icons from '@webiny/app-page-builder/editor/plugins/icons'
// Page settings
import pageSettingsPlugins from '@webiny/app-page-builder/editor/plugins/pageSettings'
// Responsive editor mode
import responsiveEditorMode from '@webiny/app-page-builder/editor/plugins/responsiveMode'
// Toolbar
import addElement from '@webiny/app-page-builder/editor/plugins/toolbar/addElement'
import navigator from '@webiny/app-page-builder/editor/plugins/toolbar/navigator'
import saving from '@webiny/app-page-builder/editor/plugins/toolbar/saving'
import {
  redo,
  undo,
} from '@webiny/app-page-builder/editor/plugins/toolbar/undoRedo'
// event actions
import actionPlugins from '@webiny/app-page-builder/editor/recoil/actions/plugins'

export default [
  contentBackground,
  blockEditing,
  // Elements
  document(),
  grid(),
  block(),
  gridBlock,
  cell(),
  heading(),
  paragraph(),
  list(),
  quote(),
  icon(),
  image(),
  imagesList(),
  button(),
  soundcloud(),
  vimeo(),
  youtube(),
  pinterest(),
  twitter(),
  codesandbox(),
  pagesList(),
  // grid presets
  ...gridPresets,
  // Icons
  icons,
  // Element Actions
  help,
  // Element groups
  basicGroup,
  formGroup,
  layoutGroup,
  mediaGroup,
  socialGroup,
  codeGroup,
  savedGroup,
  // Block categories
  blocksCategories,
  // Toolbar
  addElement,
  navigator(),
  saving,
  undo,
  redo,
  // Element settings
  advanced,
  animation,
  background,
  border,
  shadow,
  padding,
  margin,
  align,
  clone,
  deleteElement,
  width,
  height,
  save,
  link,
  action,
  gridSettings,
  textSettings,
  visibility,
  // Default bar
  defaultBarPlugins,
  // Responsive editor mode
  responsiveEditorMode(),
  // Page settings
  pageSettingsPlugins,
  // Breadcrumbs
  breadcrumbs,
  // action registration
  actionPlugins(),
]
