import React, { Fragment, useEffect } from 'react';

// Import custom module source
import '../src/index';

// @ts-ignore
import template from '../src/template.handlebars';

export const NleEmulator = ({ ...props }) => {

    useEffect(() => {
        setTimeout(() => {
            window.styla.executeCustomModule(document.querySelector('#custom-module'), props);
        }, 100);
    }, [props]);

    const exposedData = {
        content: props,
        settings: {}, // TODO do we need fake settings ?!?
        context: {
            areaContext: {}, // TODO: do we need fake area context ?!?
        },
    };

    return (
        <Fragment>
            <div id="custom-module" dangerouslySetInnerHTML={{ __html: template(exposedData) }}></div>
        </Fragment>

    );

};
