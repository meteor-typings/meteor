## Typings for Meteor

1.2v: ambient Meteor typings, i.e., defines modules like `Meteor`, `Mongo` etc.

1.3v: contains ambient modules from 1.2v and defines new Meteor 1.3 namespaces
like `meteor/meteor`, `meteor/mongo` etc based on them.

## Installation

`typings install registry:env/meteor --ambient`

`typings` is a major typings utility today, which can install and search typings across
multiple registers including [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

For example, if you want to install NodeJS typings, try: `typigns install registry:env/node --ambient`.

To find out if there is any typings for a particular library or NPM, use `typings search ...`.
For more information, please read [here](https://github.com/typings/typings).

You could try also to copy&paste `typings.json` file located at the root of this repo to your app.
It is supposed to contain major typings Meteor depends on. After copying, execute `typings install`.

If you want to install some Atmosphere package's typings, search for an appropriate repo in the current
[`meteor-typings`](https://github.com/meteor-typings) organization, which is supposed to contain all available typings of such type.
If you find that package's typings repo, go inside and read how to install typings.
If not - you are very welcome to create new repo and contribute typings.

## Development

In order to build all typings run `gulp build`.

`1.2` and `1.3` share the same Meteor core packages typings, which are located in `1.2/packages`.
When you run `gulp 1_3`, typings are modified to contain modules with the names same as
Meteor 1.3 namespaces.
