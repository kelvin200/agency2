import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Wheel } from './index'

const segments = [
  'better luck next time',
  'won 70',
  'won 10',
  'better luck next time',
  'won 2',
  'won uber pass',
  'better luck next time',
  'won a voucher',
  'won 70',
  'won 10',
  'better luck next time',
  'won 2',
  'won uber pass',
  'better luck next time',
  'won a voucher',
]
const segColors = [
  '#EE4040',
  '#F0CF50',
  '#815CD1',
  '#3DA5E0',
  '#34A24F',
  '#F9AA1F',
  '#EC3F3F',
  '#FF9000',
  '#F0CF50',
  '#815CD1',
  '#3DA5E0',
  '#34A24F',
  '#F9AA1F',
  '#EC3F3F',
  '#FF9000',
]

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Wheel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Wheel>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Wheel> = args => <Wheel {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  segments: segments,
  segColors: segColors,
  winningSegment: segments[3],
  // onFinished:winner=>onFinished(winner),
  primaryColor: 'black',
  contrastColor: 'white',
  buttonText: 'Spin',
  isOnlyOnce: true,
  size: 290,
  upDuration: 100,
  downDuration: 1000,
}

// export const Secondary = Template.bind({})
// Secondary.args = {
//   label: 'Button',
// }

// export const Large = Template.bind({})
// Large.args = {
//   size: 'large',
//   label: 'Button',
// }

// export const Small = Template.bind({})
// Small.args = {
//   size: 'small',
//   label: 'Button',
// }
