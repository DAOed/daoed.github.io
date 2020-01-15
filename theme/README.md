Jaguar.js template for JSDoc 3
---
- [ORIGINAL Jaguar.js](https://davidshimjs.github.io/jaguarjs/)
- [ORIGINAL Jaguar.js Documentation](https://davidshimjs.github.io/jaguarjs/doc/)
- [JSDoc3](https://github.com/jsdoc/jsdoc)
- [JSDoc3 API Documentation](https://jsdoc.app)

__forked from [davidshimjs/jaguarjs-jsdoc](https://github.com/davidshimjs/jaguarjs-jsdoc)__

Improvements:
 * [Jcardonadcdev/issue25 add modules to nav](https://github.com/mmig/jaguarjs-jsdoc/pull/1)
 * [Typo: documentation is not plural](https://github.com/mmig/jaguarjs-jsdoc/pull/2)
 * [Support includeDate config](https://github.com/mmig/jaguarjs-jsdoc/pull/3)
 * [FIX render interfaces](https://github.com/mmig/jaguarjs-jsdoc/pull/4)
 * [FIX revert visibility of items in navigation-bar correctly](https://github.com/mmig/jaguarjs-jsdoc/pull/5)
 * [FIX render interfaces in nav-bar](https://github.com/mmig/jaguarjs-jsdoc/pull/6)
 * PATCH avoid errors in JSON.stringified string-fields due to adding target-blank attributes to anchor tags
 * added support for `templates.default.displayNavLong` (Boolean): make displayed name (long vs. short) in nav-bar configurable via option
 * support for custom configuration option `templates.sourceLinks` (Boolean): if set to `false` suppress printing source-file/line information
 * added/included plugin for supporting inheritance of properties (e.g. via `@augments`)

Usage
---
1. If you want to create documentation with sample files, you can use commands below.
```
$ npm install
$ grunt demo
```

2. You can see any output related jsdoc process with a `--debug` flag.
```
$ grunt demo --debug
```

3. If you already have jsdoc system, you can use this project as jsdoc template.
```
$ jsdoc -t `project folder` -c `configuration file` `source files` `README.md file`
```

conf.json
---
You can set options for customizing your documentation.

```
"templates": {
    "applicationName": "Demo",
    "disqus": "",
    "googleAnalytics": "",
    "openGraph": {
        "title": "",
        "type": "website",
        "image": "",
        "site_name": "",
        "url": ""
    },
    "meta": {
        "title": "",
        "description": "",
        "keyword": ""
    },
    "linenums": true,
    "sourceLinks": false
},
"plugins": [
    "./node_modules/jaguarjs-jsdoc/plugins/inherit-properties"
]
```

License
---
This project under the MIT License. Based on the default template of JSDoc 3.
