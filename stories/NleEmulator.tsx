import React, { Fragment, useEffect } from 'react';

// Import custom module source
import '../src/index';

// @ts-ignore
import schema from '../src/schema';

// @ts-ignore
import template from '../src/template.handlebars';

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



    const content = pickAttributes(Object.assign({}, props), true);
    const settings = pickAttributes(Object.assign({}, props), false);

    const exposedData = {
        content: pickAttributes(Object.assign({}, props), true),
        settings: pickAttributes(Object.assign({}, props), false),
        context: {
            areaContext: {}, // TODO: do we need fake area context ?!?
        },
    };

    console.log('exposedData', exposedData);

    return (
        <Fragment>
            <div id="custom-module" dangerouslySetInnerHTML={{ __html: template(exposedData) }}></div>
        </Fragment>

    );

};
