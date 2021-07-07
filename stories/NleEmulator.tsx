import React, { Fragment, useEffect } from 'react';

// Import custom module source
import '../src/index';

// @ts-ignore
import template from '../src/template.handlebars';

export const NleEmulator = ({ ...props }) => {

    useEffect(() => {
        /**
        const script = document.createElement('script');

        script.innerHTML = `
            const props = ${JSON.stringify(props)};
            window.styla.executeCustomModule(document.querySelector('#custom-module'), props);
        `;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
        */
        setTimeout(() => {
            window.styla.executeCustomModule(document.querySelector('#custom-module'), props);;
        }, 100);
    }, [props]);

    return (
        <Fragment>
            <div id="custom-module" dangerouslySetInnerHTML={{ __html: template() }}></div>
        </Fragment>

    );

};
