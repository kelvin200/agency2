/* Core Form Builder app */
import formBuilderApp from '@webiny/app-form-builder/admin/plugins'
/* Form Editor field groups */
import formFieldGroupsContact from '@webiny/app-form-builder/admin/plugins/editor/formFieldGroups/contactInformation'
import editorFieldCheckboxes from '@webiny/app-form-builder/admin/plugins/editor/formFields/checkboxes'
import editorFieldCity from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/city'
import editorFieldCompanyName from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/companyName'
import editorFieldCountry from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/country'
import editorFieldEmail from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/email'
import editorFieldFirstName from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/firstName'
import editorFieldJobTitle from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/jobTitle'
import editorFieldLastName from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/lastName'
import editorFieldPhoneNumber from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/phoneNumber'
import editorFieldPostCode from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/postCode'
import editorFieldStateRegion from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/stateRegion'
import editorFieldStreetAddress from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/streetAddress'
import editorFieldWebsite from '@webiny/app-form-builder/admin/plugins/editor/formFields/contact/website'
/* Form Editor fields */
import editorFieldHidden from '@webiny/app-form-builder/admin/plugins/editor/formFields/hidden'
import editorFieldNumber from '@webiny/app-form-builder/admin/plugins/editor/formFields/number'
import editorFieldRadioButtons from '@webiny/app-form-builder/admin/plugins/editor/formFields/radioButtons'
import editorFieldSelect from '@webiny/app-form-builder/admin/plugins/editor/formFields/select'
import editorFieldText from '@webiny/app-form-builder/admin/plugins/editor/formFields/text'
import editorFieldTextarea from '@webiny/app-form-builder/admin/plugins/editor/formFields/textarea'
/* Form Editor validation plugins */
import editorValidatorGte from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/gte'
import editorValidatorInValidator from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/in'
import editorValidatorLte from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/lte'
import editorValidatorMaxLength from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/maxLength'
import editorValidatorMinLength from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/minLength'
import editorValidatorPattern from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/pattern'
import editorValidatorEmail from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/patternPlugins/email'
import editorValidatorLowerCase from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/patternPlugins/lowerCase'
import editorValidatorUpperCase from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/patternPlugins/upperCase'
import editorValidatorUrl from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/patternPlugins/url'
import editorValidatorRequired from '@webiny/app-form-builder/admin/plugins/editor/formFieldValidators/required'
/* Form Editor triggers */
import editorTriggerRedirect from '@webiny/app-form-builder/admin/plugins/editor/triggers/redirect'
import editorTriggerWebhook from '@webiny/app-form-builder/admin/plugins/editor/triggers/webhook'
/* Welcome screen widget rendered on admin home screen */
import welcomeScreenWidget from '@webiny/app-form-builder/admin/plugins/welcomeScreenWidget'
/* Page Builder element plugin to insert Forms into your pages */
import pageBuilderPlugins from '@webiny/app-form-builder/page-builder/admin/plugins'
/* Plugins performing input validation when a Form is rendered on a site or in preview mode */
import fieldValidatorGte from '@webiny/app-form-builder/render/plugins/validators/gte'
import fieldValidatorInValidator from '@webiny/app-form-builder/render/plugins/validators/in'
import fieldValidatorLte from '@webiny/app-form-builder/render/plugins/validators/lte'
import fieldValidatorMaxLength from '@webiny/app-form-builder/render/plugins/validators/maxLength'
import fieldValidatorMinLength from '@webiny/app-form-builder/render/plugins/validators/minLength'
import fieldValidatorPattern from '@webiny/app-form-builder/render/plugins/validators/pattern'
import fieldValidatorEmail from '@webiny/app-form-builder/render/plugins/validators/patternPlugins/email'
import fieldValidatorLowerCase from '@webiny/app-form-builder/render/plugins/validators/patternPlugins/lowerCase'
import fieldValidatorUpperCase from '@webiny/app-form-builder/render/plugins/validators/patternPlugins/upperCase'
import fieldValidatorUrl from '@webiny/app-form-builder/render/plugins/validators/patternPlugins/url'
import fieldValidatorRequired from '@webiny/app-form-builder/render/plugins/validators/required'

/* RichTextEditor config for Form Builder */
import richTextEditor from './formBuilder/richTextEditor'

export default [
  formBuilderApp(),
  pageBuilderPlugins(),
  welcomeScreenWidget,
  editorFieldHidden,
  editorFieldSelect,
  editorFieldText,
  editorFieldTextarea,
  editorFieldNumber,
  editorFieldRadioButtons,
  editorFieldCheckboxes,
  editorFieldFirstName,
  editorFieldLastName,
  editorFieldEmail,
  editorFieldWebsite,
  editorFieldPhoneNumber,
  editorFieldStreetAddress,
  editorFieldCity,
  editorFieldCountry,
  editorFieldStateRegion,
  editorFieldCompanyName,
  editorFieldJobTitle,
  editorFieldPostCode,
  formFieldGroupsContact,
  editorValidatorGte,
  editorValidatorInValidator,
  editorValidatorLte,
  editorValidatorRequired,
  editorValidatorMinLength,
  editorValidatorMaxLength,
  editorValidatorPattern,
  editorValidatorEmail,
  editorValidatorUrl,
  editorValidatorLowerCase,
  editorValidatorUpperCase,
  editorTriggerRedirect,
  editorTriggerWebhook,
  fieldValidatorGte,
  fieldValidatorInValidator,
  fieldValidatorLte,
  fieldValidatorMaxLength,
  fieldValidatorMinLength,
  fieldValidatorPattern,
  fieldValidatorRequired,
  fieldValidatorEmail,
  fieldValidatorUrl,
  fieldValidatorLowerCase,
  fieldValidatorUpperCase,
  richTextEditor,
]
