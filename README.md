## Typings for Meteor [![Build Status](https://travis-ci.org/meteor-typings/meteor.svg?branch=master)](https://travis-ci.org/meteor-typings/meteor)

1.2v: ambient Meteor typings, i.e., defines modules like `Meteor`, `Mongo` etc.

1.3v: contains ambient modules from 1.2v and defines based on them new Meteor 1.3 namespaces
like `meteor/meteor`, `meteor/mongo` etc.

## Installation

`typings install registry:env/meteor --global`

`typings` is a major typings utility today, which can install and search typings across
multiple registers including [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

For example, if you want to install NodeJS typings, try: `typings install registry:env/node --global`.

To find out if there is any typings for a particular library or NPM, use `typings search ...`.
For more information, please read [here](https://github.com/typings/typings).

You could try also to copy&paste `typings.json` file located at the root of this repo to your app.
It is supposed to contain major typings Meteor depends on. After copying, execute `typings install`.

### Atmosphere packages

If you want to install some Atmosphere package's typings, search for an appropriate repo in the current
[`meteor-typings`](https://github.com/meteor-typings) organization, which is supposed to contain all available typings of such type.

If you have found that package's typings repo, go inside and read how to install typings.
If not - you are very welcome to create new repo and contribute typings.

## Development

In order to build all typings run `gulp build`.

`1.2` and `1.3` share the same Meteor core packages' typings, which are located in `1.2/packages`.
When you run `gulp 1_3`, typings are modified to contain modules corresponding new Meteor 1.3 namespaces.

## Contribution

Please make sure that you change associated Meteor packages' typings directly in `1.2/packages` and `1.3/packages` folders.
`main.d.ts` and `browser.d.ts` are built out of them. Here are contribution steps.

1. Install dependencies via `npm install` in this directory.
2. Change typing files in the directories `1.2/packages` or/and `1.3/packages`.
3. (Optional) Add test cases in the file `1.3/test/test.ts`.
4. Run `npm run build+test` to generate `[1.2|1.3]/[browser.d.ts|header.d.ts|main.d.ts]` and to test typings.
