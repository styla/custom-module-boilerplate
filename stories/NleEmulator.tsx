import React, { Fragment, useEffect } from 'react';
import * as handlebars from 'handlebars';
//import helpers from 'handlebars-helpers';

// Import custom module source
import '../src/index';

// @ts-ignore
import schema from '../src/schema';

// @ts-ignore
import template from '../src/template.handlebars';

/**
// add 188 handlebars helpers https://www.npmjs.com/package/handlebars-helpers
helpers({
    handlebars: handlebars
});
*/

const pickAttributes = (obj: any, isContent: boolean) => {
    for (const propName in obj) {
        if (Object.keys(schema.content.data.properties).includes(propName) !== isContent) {
            delete obj[propName];
        }
    }
    return obj;
}

export const NleEmulator = ({ ...props }) => {

    useEffect(() => {
        setTimeout(() => {
            window.styla.executeCustomModule(
                document.querySelector('#custom-module'),
                pickAttributes(Object.assign({}, props), true),
                {},
                pickAttributes(Object.assign({}, props), false)
            );
        }, 100);
    }, [props]);

    const exposedData = {
        content: pickAttributes(Object.assign({}, props), true),
        settings: pickAttributes(Object.assign({}, props), false),
        context: {
            areaContext: {}, // TODO: do we need fake area context ?!?
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
    handlebars.registerHelper("customFields", function (customField: string, fieldName: string) {
        if (!customField) {
            return
        }

        const customArray = JSON.parse(customField);

        if (!Array.isArray(customArray) || customArray.length === 0) {
            return
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
    handlebars.registerHelper("getMainProduct", function (): any {
        if ((exposedData.context.areaContext as any).entity?.type === "PRODUCT") {
            return (exposedData.context.areaContext as any).products?.find((value: any) => value.id == (exposedData.context.areaContext as any).areaContext.entity.id)
        }
    });

    handlebars.registerHelper("eq", function (var1, var2, options ): any {
        return (var1 == var2) ? options.fn(this) : options.inverse(this);
    });

    return (
        <Fragment>
            <div id="custom-module" dangerouslySetInnerHTML={{ __html: handlebars.compile(template)(exposedData) }}></div>
        </Fragment>

    );

};
