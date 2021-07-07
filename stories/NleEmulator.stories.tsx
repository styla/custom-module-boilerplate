import React from 'react';

// Hacky way to register window.styla.registerCustomModule function
import './utils/StylaHelper';

import { NleEmulator } from './NleEmulator';
import * as schema from '../src/schema.json';

export default {
    title: 'Example/NleEmulator',
    component: NleEmulator,
};

const Template = (args) => {
    return (<NleEmulator {...args} />);
};

const getConvertedProp = ( propertyKey, property ) => {
    const { type } = property;

    switch ( type ) {
        case 'string':
        default:
            return {
                [propertyKey]: `insert ${ propertyKey } text here`
            }

        case 'number':
            return {
                [propertyKey]: property.default
            }

    }
}

const convertSchema = () => {

    const allControls = {}

    const contentControls = {};

    for ( const [key, value] of Object.entries( schema.content?.data?.properties ) ) {
        const newObj = getConvertedProp( key, value );
        Object.assign( contentControls, newObj );
    }

    Object.assign( allControls, contentControls );

    const settingsControls = {};

    for ( const [key, value] of Object.entries( schema.settings?.data?.properties ) ) {
        const newObj = getConvertedProp( key, value );
        Object.assign( settingsControls, newObj );
    }

    Object.assign( allControls, contentControls, settingsControls );


    return allControls;
}

export const Render = Template.bind({});
Render.args = convertSchema();
