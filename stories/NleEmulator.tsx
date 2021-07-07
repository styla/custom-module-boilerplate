import { Function } from 'core-js';
import React, { Fragment } from 'react';

// Import custom module source
//require('../src/index');

import template from '../src/template.handlebars';

export const NleEmulator = ({ ...props }) => {

    const convertHandlebarsTemplate = (template: any) => {
        // load and compile handlebars template
    }

    return (
        <Fragment>
            {/*
            <script type="text/javascript" dangerouslySetInnerHTML={{ __html: "" }}>
                {
                    (window as any).styla = {
                        registerCustomModule: (name: any, func: any) => {
                            console.log(`Initializing module ${name}`);
                            const wrapper = document.querySelector('#custom-module');
                            func(wrapper, props);
                        }
                    }
                }
            </script>
            */}
            <div id="custom-module" dangerouslySetInnerHTML={{ __html: template() }}></div>
        </Fragment>

    );

};
