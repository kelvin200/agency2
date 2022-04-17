import i18n, { defaultModifiers,defaultProcessor } from '@webiny/i18n'
import reactProcessor from '@webiny/i18n-react'

i18n.registerProcessors([defaultProcessor, reactProcessor])
i18n.registerModifiers(defaultModifiers)

export default i18n
