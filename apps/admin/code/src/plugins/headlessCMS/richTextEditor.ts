import Delimiter from '@editorjs/delimiter'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import Underline from '@editorjs/underline'
import Header from '@webiny/app-admin/components/RichTextEditor/tools/header'
import Image from '@webiny/app-admin/components/RichTextEditor/tools/image'
import Paragraph from '@webiny/app-admin/components/RichTextEditor/tools/paragraph'
import TextColor from '@webiny/app-admin/components/RichTextEditor/tools/textColor'
import { plugins } from '@webiny/plugins'

export default {
  type: 'cms-rte-config',
  config: {
    tools: {
      delimiter: {
        class: Delimiter,
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: ['bold', 'italic', 'underline', 'color', 'link'],
      },
      header: {
        class: Header,
        inlineToolbar: ['bold', 'italic', 'underline', 'color', 'link'],
        config: {
          levels: [1, 2, 3, 4],
        },
      },
      image: {
        class: Image,
      },
      quote: {
        class: Quote,
      },
      list: {
        class: List,
      },
      underline: {
        class: Underline,
      },
      color: {
        class: TextColor,
        shortcut: 'CMD+M',
        config: () => {
          const [pbTheme] = plugins.byType('pb-theme')

          const themeColors = pbTheme
            ? Object.values(pbTheme.theme.colors)
            : ['#8c7ae6', '#0097e6', '#44bd32']

          return {
            themeColors,
          }
        },
      },
    },
    /**
     * This Tool will be used as default
     */
    defaultBlock: 'paragraph',
  },
}
