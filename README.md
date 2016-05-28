## Typings for Meteor

1.2v: ambient Meteor typigns, i.e., defines modules like `Meteor`, `Mongo` etc.

1.3v: defines modules like `meteor/meteor`, `meteor/mongo` etc which correspond to Meteor 1.3 namespaces.
Content of the modules are the same as in 1.2v.

## Development

In order to build all typings run `gulp build`.

`1.2` and `1.3` share same Meteor core packages typings, which are located in `1.2/packages`.
Typings from `1.2/packages` folder are being copied to the `1.3` folder when you run `gulp 1_3` in order to build new Meteor 1.3 namespaces.

