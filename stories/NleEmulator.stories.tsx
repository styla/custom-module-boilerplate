import React from 'react';

import { NleEmulator } from './NleEmulator';

export default {
  title: 'Example/NleEmulator',
  component: NleEmulator,
};

const Template = (args) => {
  console.log('args', args);
  return (<NleEmulator {...args} />);
};

const convertSchema = (schema: any) => {
  // todo convert schema to props
  return {
    primary: true,
  };
}

export const Render = Template.bind({});
Render.args = convertSchema({});
