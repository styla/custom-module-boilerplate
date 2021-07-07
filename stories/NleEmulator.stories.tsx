import React from 'react';

// Hacky way to register window.styla.registerCustomModule function
import './utils/StylaHelper';

import { NleEmulator } from './NleEmulator';
import * as schema from '../src/schema.json';

type TDataType = 'array' | 'string' | 'number' | 'boolean' | 'object' | 'enum';

type TPropertyItems = {
    type: TDataType;
    properties: {
        [key: string]: TProperty;
    }
}

type TProperty = Readonly<{
    title: string;
    placeholder?: string;
    default?: string | boolean;
    type?: TDataType; // TODO: this should probably be required. check why it's not in our examples
    items?: TPropertyItems;
    enum?: ReadonlyArray<string>;
}>

type TControlValueType = string | boolean | number | ReadonlyArray<{}> | {};

type TConvertedControl = {
    [key: string]: TControlValueType
}

type TArrayRow = {
    [key: string]: any;
}

const Template = (args: any) => {
    return (<NleEmulator {...args} />);
};

const getDefaultValuePerType = ( type: TDataType ): TControlValueType => {
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


const getConvertedProp = ( propertyKey: string, property: TProperty ): TConvertedControl => {
    
    const { type } = property;
    const derivedType = type ? type : ( property.enum ? 'enum' : null );

    switch ( derivedType ) {
        case 'string':
        default:
            return {
                [propertyKey]: {
                    type: 'string',
                    name: property.title,
                    defaultValue: property.default || `Enter ${ property.title } here`
                }
            }

        case 'number':
            return {
                [propertyKey]: {
                    type: 'number',
                    name: property.title,
                    defaultValue: property.default || 0
                }
            }

        case 'boolean':
            return {
                [propertyKey]: {
                    type: 'boolean',
                    name: property.title,
                    defaultValue: property.default || true
                }
            }

        case 'object':
            return {
                [propertyKey]: {}
            }

        case 'array':

            const sampleRow = {} as TArrayRow;

            for ( const [ key, value ] of Object.entries( property.items?.properties ) ) {
                const derivedType = value.type ? value.type : ( value.enum ? 'enum' : null );
                sampleRow[key] = getDefaultValuePerType( derivedType );
            }

            return {
                [propertyKey]: {
                    type: 'object',
                    name: property.title,
                    defaultValue: sampleRow
                }
            }

        case 'enum':
            return {
                [propertyKey]: {
                    type: 'select',
                    options: property.enum,
                    name: property.title
                }
            }

    }
}

const convertSchema = () => {

    const allControls = {}

    const contentControls = {};

    for ( const [key, value] of Object.entries( schema.content?.data?.properties ) ) {
        const newObj = getConvertedProp( key, value as TProperty );
        Object.assign( contentControls, newObj );
    }

    Object.assign( allControls, contentControls );

    const settingsControls = {};

    for ( const [ key, value ] of Object.entries( schema.settings?.data?.properties ) ) {
        const newObj = getConvertedProp( key, value as TProperty );
        Object.assign( settingsControls, newObj );
    }

    Object.assign( allControls, contentControls, settingsControls );

    return allControls;
}

export const Render = Template.bind({});

export default {
    title: 'Example/NleEmulator',
    component: NleEmulator,
    argTypes: convertSchema()
};