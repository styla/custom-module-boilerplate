import React from 'react';

// Hacky way to register window.styla.registerCustomModule function
import './utils/StylaHelper';

import { NleEmulator } from './NleEmulator';
import * as schema from '../src/schema.json';

type TDataType = 'array' | 'string' | 'number' | 'boolean' | 'object' | 'enum';

export default {
    title: 'Example/NleEmulator',
    component: NleEmulator,
};

const Template = (args) => {
    return (<NleEmulator {...args} />);
};

const getDefaultValuePerType = ( type: TDataType ) => {
    switch ( type ) {
        case 'string':
            return 'sample text'


        // TODO: this can be improved by returning one of the allowed enum values
        case 'enum':
            return 'sample enum value'

        case 'boolean':
            return true

        case 'object':
            return {}

        case 'array':
            return []

        case 'number': {
            return 1
        }
    }
}


// TODO: all types are currently missing

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

        case 'boolean':
            return {
                [propertyKey]: property.default
            }

        case 'object':
            return {
                [propertyKey]: {}
            }

        // TODO: add support for enum at this level (storybook documentation is not very clear on how it works)

        case 'array':

            const sampleRow = {}

            for ( const [ key, value ] of Object.entries( property.items?.properties ) ) {

                const derivedType = value.type ? value.type : ( value.enum ? 'enum' : null );

                sampleRow[key] = getDefaultValuePerType( derivedType );
            }

            return {
                [propertyKey]: [
                    sampleRow
                ]
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

    for ( const [ key, value ] of Object.entries( schema.settings?.data?.properties ) ) {
        const newObj = getConvertedProp( key, value );
        Object.assign( settingsControls, newObj );
    }

    Object.assign( allControls, contentControls, settingsControls );


    return allControls;
}

export const Render = Template.bind({});
Render.args = convertSchema();
