import React from 'react';

// Hacky way to register window.styla.registerCustomModule function
import './utils/StylaHelper';

import { DeveloperSandbox } from './DeveloperSandbox';
import * as _schema from '../src/schema.json';

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

type TControlValueType = string | boolean | number | ReadonlyArray<object> | object;

type TConvertedControl = {
    [key: string]: TControlValueType
}

type TArrayRow = {
    [key: string]: TControlValueType;
}

type TSchema = {
    content?: {
        data: TSchemaData;
    }
    settings?: {
        data: TSchemaData;
    }
}

type TSchemaData = {
    properties: object;
}

const schema = _schema as TSchema;

const Template = (args: object) => (<DeveloperSandbox {...args} />);

const getDefaultValuePerType = (type: TDataType, ownDefault: TControlValueType): TControlValueType => {

    switch (type) {
        case 'string':
            return ownDefault || '';

        // TODO: this can be improved by returning one of the allowed enum values
        case 'enum':
            return ownDefault || '';

        case 'boolean':
            return ownDefault || true;

        case 'object':
            return ownDefault || {};

        case 'array':
            return ownDefault || [];

        case 'number': {
            return ownDefault || 1;
        }
    }
};


const getConvertedProp = (propertyKey: string, property: TProperty): TConvertedControl => {

    const { type } = property;
    const derivedType = type ? type : (property.enum ? 'enum' : null);

    switch (derivedType) {
        case 'string':
        default:
            return {
                [propertyKey]: {
                    type: 'string',
                    name: property.title,
                    defaultValue: property.default || `Enter ${ property.title } here`,
                },
            };

        case 'number':
            return {
                [propertyKey]: {
                    type: 'number',
                    name: property.title,
                    defaultValue: property.default || 0,
                },
            };

        case 'boolean':
            return {
                [propertyKey]: {
                    type: 'boolean',
                    name: property.title,
                    defaultValue: property.default || true,
                },
            };

        case 'object':
            return {
                [propertyKey]: {},
            };

        case 'array':

            const sampleRow = {} as TArrayRow;

            if (!property.items) {
                return {};
            }

            for (const [ key, value ] of Object.entries(property.items?.properties)) {
                const derivedType = value.type ? value.type : (value.enum ? 'enum' : null);
                if (derivedType && value.default) {
                    sampleRow[key] = getDefaultValuePerType(derivedType, value.default);
                }
            }

            return {
                [propertyKey]: {
                    type: 'object',
                    name: property.title,
                    defaultValue: property.default || [ sampleRow ],
                },
            };

        case 'enum':
            return {
                [propertyKey]: {
                    type: 'select',
                    options: property.enum,
                    name: property.title,
                    defaultValue: property.default || null,
                },
            };

    }
};

const convertSchema = () => {

    const allControls = {};

    const contentControls = {};

    if (schema.content?.data) {
        for (const [key, value] of Object.entries(schema.content.data.properties)) {
            const newObj = getConvertedProp(key, value as TProperty);
            Object.assign(contentControls, newObj);
        }

        Object.assign(allControls, contentControls);
    }

    const settingsControls = {};

    if (schema.settings?.data) {
        for (const [ key, value ] of Object.entries(schema.settings.data.properties)) {
            const newObj = getConvertedProp(key, value as TProperty);
            Object.assign(settingsControls, newObj);
        }

        Object.assign(allControls, contentControls, settingsControls);
    }

    return allControls;
};

export const Render = Template.bind({});

export default {
    title: 'Example/DeveloperSandbox',
    component: DeveloperSandbox,
    argTypes: convertSchema(),
};
