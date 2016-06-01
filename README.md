## Typings for Meteor

1.2v: ambient Meteor typings, i.e., defines modules like `Meteor`, `Mongo` etc.

1.3v: contains ambient modules from 1.2v and defines new Meteor 1.3 namespaces
like `meteor/meteor`, `meteor/mongo` etc based on them.

## Development

In order to build all typings run `gulp build`.

`1.2` and `1.3` share the same Meteor core packages typings, which are located in `1.2/packages`.
When you run `gulp 1_3`, typings are modified to contain modules with the names same as
Meteor 1.3 namespaces.

## Installation

`typings install registry:env/meteor --ambient`