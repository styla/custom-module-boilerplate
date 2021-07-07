export {};

type Callback = (
    wrapper: HTMLElement,
    content: any,
    context: any,
    settings: Readonly<{
        [ key: string ]: any; // TODO: Improve typing here
    }>,
    helpers: any,
) => Promise<void> | Promise<() => void>;

declare global {

    interface Styla {
        registerCustomModule(type: string, func: Callback): void;
        executeCustomModule(wrapper: any, content: any, context: any, settings: any): void;
    }

    interface Window {
        styla?: Styla;
    }
}
