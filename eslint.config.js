import globals from "globals";

export default [{
    languageOptions: {
        globals: {
            ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
            ...globals.mocha,
            ...globals.node,
        },
    },
}];