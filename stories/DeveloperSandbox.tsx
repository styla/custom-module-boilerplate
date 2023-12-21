/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, useEffect } from 'react';
import * as handlebars from 'handlebars';

// @ts-ignore
import schema from '../src/schema';

// @ts-ignore
import template from '../src/template.handlebars';

try {
    // @ts-ignore
    import('../_dev_tmp/css/styles.css');
} catch (error) {
    console.warn('Styles file not found. Run the project at least once in order to generate it');
}

// Import custom module index file (optional)
try {
    // @ts-ignore
    import('../src/index');
} catch (error) {
    console.warn('Module index file is not provided');
}

type TAreaContext = {
    entity: {
        type: string,
        id: string
    }
    products: TProductExcerpt[]
}

type TProductExcerpt = {
    id: string
}

const pickAttributes = (obj: object, isContent: boolean) => {
    for (const propName in obj) {
        if (Object.keys(schema.content.data.properties).includes(propName) !== isContent) {
            delete obj[propName];
        }
    }
    return obj;
};

export const DeveloperSandbox = ({ ...props }) => {

    useEffect(() => {
        setTimeout(() => {
            // @ts-ignore
            window.styla.executeCustomModule(
                document.querySelector('#custom-module'),
                pickAttributes(Object.assign({}, props), true),
                {},
                pickAttributes(Object.assign({}, props), false),
            );
        }, 100);
    }, [props]);

    const exposedData = {
        content: pickAttributes(Object.assign({}, props), true),
        settings: pickAttributes(Object.assign({}, props), false),
        context: {
            areaContext: {} as Partial<TAreaContext>,
        },
    };

    /**
     * Currently the custom_fields are a string instead of an array,
     * as well you can not iterate over the arrays of array structure with handlebars.
     *
     * Ideally in the future custom_fields would be a JSON object instead of a string, and contain
     * object attributes, so that it can be accessed directly without a helper function.
     *
     * example usage:
     * JSONL custom_fields: "[["fbt_product","11531"],["fbt_product","1296"],["usp_1","TSRGD Compliant"]]
     * Handlebars usage:
     * {{customField context.areaContext.products.[0].custom_fields 'attach_title_1'}}
     */
    handlebars.registerHelper('customFields', function (customField: string, fieldName: string) {
        if (!customField) {
            return;
        }

        const customArray = JSON.parse(customField);

        if (!Array.isArray(customArray) || customArray.length === 0) {
            return;
        }

        for (const element of customArray) {
            if (Array.isArray(element) && element[0] === fieldName) {
                return element[1];
            }
        }
    });

    /**
     * Return the main product of the local context on a PDP
     */
    handlebars.registerHelper('getMainProduct', function (): object | undefined {
        if ((exposedData.context.areaContext).entity?.type === 'PRODUCT') {
            return (exposedData.context.areaContext).products?.find(
                (value) => value.id == (exposedData.context.areaContext)?.entity?.id,
            );
        }
    });

    handlebars.registerHelper('eq', function (var1, var2, options): void {
        return (var1 == var2) ? options.fn(this) : options.inverse(this);
    });

    return (
        <Fragment>
            <div id="custom-module" dangerouslySetInnerHTML={{ __html: handlebars.compile(template)(exposedData) }}></div>
        </Fragment>

    );

};
