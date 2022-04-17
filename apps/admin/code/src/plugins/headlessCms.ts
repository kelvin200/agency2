import headlessCmsPlugins from '@webiny/app-headless-cms/admin/plugins'
import booleanFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/boolean'
import checkboxesFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/checkboxes'
import dateTimeFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/dateTime'
import fileFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/file'
import longTextFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/longText'
import numberFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/number'
import objectFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/object'
import radioButtonsFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/radioButtons'
import refFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/ref'
import richTextFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/richText'
import selectFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/select'
import textFieldRenderer from '@webiny/app-headless-cms/admin/plugins/fieldRenderers/text'
import booleanField from '@webiny/app-headless-cms/admin/plugins/fields/boolean'
import dateTimeField from '@webiny/app-headless-cms/admin/plugins/fields/dateTime'
import fileField from '@webiny/app-headless-cms/admin/plugins/fields/file'
import longTextField from '@webiny/app-headless-cms/admin/plugins/fields/longText'
import numberField from '@webiny/app-headless-cms/admin/plugins/fields/number'
import objectField from '@webiny/app-headless-cms/admin/plugins/fields/object'
import refField from '@webiny/app-headless-cms/admin/plugins/fields/ref'
import richTextField from '@webiny/app-headless-cms/admin/plugins/fields/richText'
import textField from '@webiny/app-headless-cms/admin/plugins/fields/text'
import editorDateGteFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/dateGte'
import editorDateLteFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/dateLte'
import editorGteFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/gte'
import editorInValidatorFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/in'
import editorLteFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/lte'
import editorMaxLengthFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/maxLength'
import editorMinLengthFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/minLength'
import editorPatternFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/pattern'
import editorEmailFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/patternPlugins/email'
import editorLowerCaseFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/patternPlugins/lowerCase'
import editorLowerCaseSpaceFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/patternPlugins/lowerCaseSpace'
import editorUpperCaseFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/patternPlugins/upperCase'
import editorUpperCaseSpaceFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/patternPlugins/upperCaseSpace'
import editorUrlFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/patternPlugins/url'
import editorRequiredFieldValidator from '@webiny/app-headless-cms/admin/plugins/fieldValidators/required'
import dateGteFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/dateGte'
import dateLteFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/dateLte'
import gteFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/gte'
import inValidatorFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/in'
import lteFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/lte'
import maxLengthFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/maxLength'
import minLengthFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/minLength'
import patternFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/pattern'
import emailFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/patternPlugins/email'
import lowerCaseFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/patternPlugins/lowerCase'
import lowerCaseSpaceFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/patternPlugins/lowerCaseSpace'
import upperCaseFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/patternPlugins/upperCase'
import upperCaseSpaceFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/patternPlugins/upperCaseSpace'
import urlFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/patternPlugins/url'
import requiredFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/required'
import timeGteFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/timeGte'
import timeLteFieldValidator from '@webiny/app-headless-cms/admin/plugins/validators/timeLte'
import welcomeScreenWidget from '@webiny/app-headless-cms/admin/plugins/welcomeScreenWidget'

import richTextEditor from './headlessCMS/richTextEditor'

export default [
  headlessCmsPlugins(),
  richTextEditor,
  textField,
  longTextField,
  richTextField,
  numberField,
  booleanField,
  dateTimeField,
  fileField,
  refField,
  numberFieldRenderer,
  textFieldRenderer,
  longTextFieldRenderer,
  richTextFieldRenderer,
  booleanFieldRenderer,
  dateTimeFieldRenderer,
  fileFieldRenderer,
  radioButtonsFieldRenderer,
  selectFieldRenderer,
  checkboxesFieldRenderer,
  refFieldRenderer,
  gteFieldValidator,
  inValidatorFieldValidator,
  lteFieldValidator,
  requiredFieldValidator,
  minLengthFieldValidator,
  maxLengthFieldValidator,
  patternFieldValidator,
  emailFieldValidator,
  urlFieldValidator,
  lowerCaseFieldValidator,
  upperCaseFieldValidator,
  lowerCaseSpaceFieldValidator,
  upperCaseSpaceFieldValidator,
  dateGteFieldValidator(),
  dateLteFieldValidator(),
  timeGteFieldValidator(),
  timeLteFieldValidator(),
  editorGteFieldValidator,
  editorDateGteFieldValidator(),
  editorDateLteFieldValidator(),
  editorInValidatorFieldValidator,
  editorLteFieldValidator,
  editorRequiredFieldValidator,
  editorMinLengthFieldValidator,
  editorMaxLengthFieldValidator,
  editorPatternFieldValidator,
  editorEmailFieldValidator,
  editorUrlFieldValidator,
  editorLowerCaseFieldValidator,
  editorUpperCaseFieldValidator,
  editorLowerCaseSpaceFieldValidator,
  editorUpperCaseSpaceFieldValidator,
  welcomeScreenWidget,
  objectField,
  objectFieldRenderer,
]
