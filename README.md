## Typings for Meteor

1.2v: ambient Meteor typigns, i.e., defines modules like `Meteor`, `Mongo` etc.

1.3v: defines new Meteor 1.3 namespaces like `meteor/meteor`, `meteor/mongo` etc
based on the ambient version from 1.2v.

## Development

In order to build all typings run `gulp build`.

`1.2` and `1.3` share the same Meteor core packages typings, which are located in `1.2/packages`.
When you run `gulp 1_3`, typings are being copied to the `1.3` folder and modified 
to contain modules that corresponds Meteor 1.3 namespaces.
