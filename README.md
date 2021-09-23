# Examples

Various examples for various use-cases, mostly helping others :)

## why in a repo?

I like to be platform independent. Things like Github gist are nice but tie me to the platform.
Having these things in a repo gives me flexibility.

It also consolidates all relevant examples in 1 place

## table of contents

```sh
.
├── bash
│   ├── parsing-command-line-params.sh
│   ├── remove-parentheses.sh # script to remove parentheses from all files in a directory (recursively)
│   └── whiptail.sh # tiny demo of how whiptail works

├── c
│   └── ani2png.c # convery .ani files into a sequence of .pngs

├── javascript
│   └── async # an example of how to use async / await in javascript
│       ├── async.js
│       ├── image.png
│       └── README.md
│   └── encoding
│       └── utf-16-base64.js # an example showing how to encode/decode UTF-16 strings
├── js-ts-frameworks # JS-TS framework specific examples
│   ├── Angular
│   │   └── state
│   │       └── HttpWithStateSettingsService.ts # both a higher order component and a state settings service example for Angular + ngxs
│   └── React
│       └── tests
│           └── redux-promise-middleware.spec.js # single spec file to validate a lot of redux promise middleware reducers

├── mongo
│   ├── add-field-with-default-value.js # add a field to an existing collection with a default value
│   ├── collectionNames-and-count.js # return a list of collections in a database with the number of documents in them
│   └── get-json-with-all-fields-recursively.js # returns a single object containing all different (nested) keys from all documents in a collection
├── typescript
│   ├── datetime
│   │   └── getCustomIsoString.ts # function to return a valid ISO string from a given date object

│   ├── geo
│   │   └── radiusToPolygon # example on how to convert from a radius to a GeoJSON polygon
│   │       ├── helpers.ts
│   │       ├── index.ts
│   │       └── point.ts

│   ├── typing
│   │   └── omit.ts # utility type "omit" examples
│   └── inheritance-and-interfaces.ts # basic introduction to inheritance and interfaces for front-end devs

├── LICENSE
└── README.md
```

## external examples

Examples which are either too big to include or not made by me.

- [Angular smart vs dumb components](https://github.com/Mastermindzh/angular-smart-dumb-component-example)
