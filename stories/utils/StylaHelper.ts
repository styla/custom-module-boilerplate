const functions: Map<string, (wrapper: any, props: any) => {}> = new Map();

window.styla = {
    registerCustomModule: (name: any, func: any) => {
        functions.set(name, func);
    },
    executeCustomModule: (wrapper: any, props: any) => {
        functions.forEach(func => func(wrapper, props));
    }
}
