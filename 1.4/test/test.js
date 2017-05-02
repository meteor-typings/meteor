/**
 * All code below was copied from the examples at http://docs.meteor.com/.
 * When necessary, code was added to make the examples work (e.g. declaring a variable
 * that was assumed to have been declared earlier)
 */
"use strict";
/*********************************** Begin setup for tests ******************************/
var mongo_1 = require("meteor/mongo");
var meteor_1 = require("meteor/meteor");
var check_1 = require("meteor/check");
var tracker_1 = require("meteor/tracker");
var templating_1 = require("meteor/templating");
var blaze_1 = require("meteor/blaze");
var session_1 = require("meteor/session");
var http_1 = require("meteor/http");
var reactive_var_1 = require("meteor/reactive-var");
var accounts_base_1 = require("meteor/accounts-base");
var browser_policy_common_1 = require("meteor/browser-policy-common");
var ddp_rate_limiter_1 = require("meteor/ddp-rate-limiter");
var Rooms = new mongo_1.Mongo.Collection('rooms');
var Messages = new mongo_1.Mongo.Collection('messages');
var Monkeys = new mongo_1.Mongo.Collection('monkeys');
//var x = new Mongo.Collection<xDAO>('x');
//var y = new Mongo.Collection<yDAO>('y');
/********************************** End setup for tests *********************************/
/**
 * From Core, Meteor.startup section
 * Tests Meteor.isServer, Meteor.startup, Collection.insert(), Collection.find()
 */
if (meteor_1.Meteor.isServer) {
    meteor_1.Meteor.startup(function () {
        if (Rooms.find().count() === 0) {
            Rooms.insert({ name: "Initial room" });
        }
    });
}
/**
 * From Publish and Subscribe, Meteor.publish section
 **/
meteor_1.Meteor.publish("rooms", function () {
    return Rooms.find({}, { fields: { secretInfo: 0 } });
});
meteor_1.Meteor.publish("adminSecretInfo", function () {
    return Rooms.find({ admin: this.userId }, { fields: { secretInfo: 1 } });
});
meteor_1.Meteor.publish("roomAndMessages", function (roomId) {
    check_1.check(roomId, String);
    return [
        Rooms.find({ _id: roomId }, { fields: { secretInfo: 0 } }),
        Messages.find({ roomId: roomId })
    ];
});
/**
 * Also from Publish and Subscribe, Meteor.publish section
 */
meteor_1.Meteor.publish("counts-by-room", function (roomId) {
    var self = this;
    check_1.check(roomId, String);
    var count = 0;
    var initializing = true;
    var handle = Messages.find({ roomId: roomId }).observeChanges({
        added: function (id) {
            count++;
            // if (!initializing)
            //   this.changed("counts", roomId, {count: count});
        },
        removed: function (id) {
            count--;
            // Todo: Not sure how to define in typescript
            //      self.changed("counts", roomId, {count: count});
        }
    });
    initializing = false;
    // Todo: Not sure how to define in typescript
    //  self.added("counts", roomId, {count: count});
    self.ready();
    self.onStop(function () {
        handle.stop();
    });
});
var Counts = new mongo_1.Mongo.Collection("counts");
tracker_1.Tracker.autorun(function () {
    meteor_1.Meteor.subscribe("counts-by-room", session_1.Session.get("roomId"));
});
// Checking status
var status = 'connected';
console.log("Current room has " +
    Counts.find(session_1.Session.get("roomId")).count +
    " messages.");
/**
 * From Publish and Subscribe, Meteor.subscribe section
 */
meteor_1.Meteor.subscribe("allplayers");
/**
 * Also from Meteor.subscribe section
 */
tracker_1.Tracker.autorun(function () {
    meteor_1.Meteor.subscribe("chat", { room: session_1.Session.get("current-room") });
    meteor_1.Meteor.subscribe("privateMessages");
});
/**
 * From Methods, Meteor.methods section
 */
meteor_1.Meteor.methods({
    foo: function (arg1, arg2) {
        check_1.check(arg1, String);
        check_1.check(arg2, [Number]);
        var you_want_to_throw_an_error = true;
        if (you_want_to_throw_an_error)
            throw new meteor_1.Meteor.Error("404", "Can't find my pants");
        return "some return value";
    },
    bar: function () {
        // .. do other stuff ..
        return "baz";
    }
});
/**
 * From Methods, Meteor.Error section
 */
function meteorErrorTestFunction1() {
    throw new meteor_1.Meteor.Error("logged-out", "The user must be logged in to post a comment.");
}
function meteorErrorTestFunction2() {
    throw new meteor_1.Meteor.Error(403, "The user must be logged in to post a comment.");
}
meteor_1.Meteor.call("methodName", function (error) {
    if (error.error === "logged-out") {
        session_1.Session.set("errorMessage", "Please log in to post a comment.");
    }
});
var error = new meteor_1.Meteor.Error("logged-out", "The user must be logged in to post a comment.");
console.log(error.error === "logged-out");
console.log(error.reason === "The user must be logged in to post a comment.");
console.log(error.details !== "");
/**
 * From Methods, Meteor.call section
 */
meteor_1.Meteor.call('foo', 1, 2, function (error, result) { });
var result = meteor_1.Meteor.call('foo', 1, 2);
var Chatrooms = new mongo_1.Mongo.Collection("chatrooms");
Messages = new mongo_1.Mongo.Collection("messages");
var myMessages = Messages.find({ userId: session_1.Session.get('myUserId') }).fetch();
Messages.insert({ text: "Hello, world!" });
Messages.update(myMessages[0]._id, { $set: { important: true } });
var Posts = new mongo_1.Mongo.Collection("posts");
Posts.insert({ title: "Hello world", body: "First post" });
// Couldn't find assert() in the meteor docs
//assert(Posts.find().count() === 1);
/**
 * Todo: couldn't figure out how to make this next line work with Typescript
 * since there is already a Collection constructor with a different signature
 *
 var Scratchpad = new Mongo.Collection;
 for (var i = 0; i < 10; i++)
 Scratchpad.insert({number: i * 2});
 assert(Scratchpad.find({number: {$lt: 9}}).count() === 5);
 **/
var Animal = (function () {
    function Animal(doc) {
    }
    Animal.prototype.makeNoise = function () {
        console.log(this.sound);
    };
    return Animal;
}());
// Define a Collection that uses Animal as its document
var Animals = new mongo_1.Mongo.Collection("Animals", {
    transform: function (doc) { return new Animal(doc); }
});
// Create an Animal and call its makeNoise method
Animals.insert({ name: "raptor", sound: "roar" });
Animals.findOne({ name: "raptor" }).makeNoise(); // prints "roar"
/**
 * From Collections, Collection.insert section
 */
// DA: I added the variable declaration statements to make this work
var Lists = new mongo_1.Mongo.Collection('Lists');
var Items = new mongo_1.Mongo.Collection('Lists');
var groceriesId = Lists.insert({ name: "Groceries" });
Items.insert({ list: groceriesId, name: "Watercress" });
Items.insert({ list: groceriesId, name: "Persimmons" });
/**
 * From Collections, collection.update section
 */
var Players = new mongo_1.Mongo.Collection('Players');
templating_1.Template['adminDashboard'].events({
    'click .givePoints': function () {
        Players.update(session_1.Session.get("currentPlayer"), { $inc: { score: 5 } });
    }
});
/**
 * Also from Collections, collection.update section
 */
meteor_1.Meteor.methods({
    declareWinners: function () {
        Players.update({ score: { $gt: 10 } }, { $addToSet: { badges: "Winner" } }, { multi: true });
    }
});
/**
 * From Collections, collection.remove section
 */
templating_1.Template['chat'].events({
    'click .remove': function () {
        Messages.remove(this._id);
    }
});
// DA: I added this next line
var Logs = new mongo_1.Mongo.Collection('logs');
meteor_1.Meteor.startup(function () {
    if (meteor_1.Meteor.isServer) {
        Logs.remove({});
        Players.remove({ karma: { $lt: -2 } });
    }
});
Posts = new mongo_1.Mongo.Collection("posts");
Posts.allow({
    insert: function (userId, doc) {
        // the user must be logged in, and the document must be owned by the user
        return (userId && doc.owner === userId);
    },
    update: function (userId, doc, fields, modifier) {
        // can only change your own documents
        return doc.owner === userId;
    },
    remove: function (userId, doc) {
        // can only remove your own documents
        return doc.owner === userId;
    },
    fetch: ['owner']
});
Posts.deny({
    update: function (userId, doc, fields, modifier) {
        // can't change owners
        return doc.userId !== userId;
    },
    remove: function (userId, doc) {
        // can't remove locked documents
        return doc.locked;
    },
    fetch: ['locked'] // no need to fetch 'owner'
});
/**
 * From Collections, cursor.forEach section
 */
var topPosts = Posts.find({}, { sort: { score: -1 }, limit: 5 });
var count = 0;
topPosts.forEach(function (post) {
    console.log("Title of post " + count + ": " + post.title);
    count += 1;
});
/**
 * From Collections, cursor.observeChanges section
 */
// DA: I added this line to make it work
var Users = new mongo_1.Mongo.Collection('users');
var count1 = 0;
var query = Users.find({ admin: true, onlineNow: true });
var handle = query.observeChanges({
    added: function (id, user) {
        count1++;
        console.log(user.name + " brings the total to " + count1 + " admins.");
    },
    removed: function () {
        count1--;
        console.log("Lost one. We're now down to " + count1 + " admins.");
    }
});
var cursor;
// After five seconds, stop keeping the count.
setTimeout(function () { handle.stop(); }, 5000);
/**
 * From Sessions, Session.set section
 */
tracker_1.Tracker.autorun(function () {
    meteor_1.Meteor.subscribe("chat-history", { room: session_1.Session.get("currentRoomId") });
});
// Causes the function passed to Tracker.autorun to be re-run, so
// that the chat-history subscription is moved to the room "home".
session_1.Session.set("currentRoomId", "home");
/**
 * From Sessions, Session.get section
 */
// Page will say "We've always been at war with Eastasia"
// DA: commented out since transpiler didn't like append()
//document.body.append(frag1);
// Page will change to say "We've always been at war with Eurasia"
session_1.Session.set("enemy", "Eurasia");
/**
 * From Sessions, Session.equals section
 */
var value;
session_1.Session.get("key") === value;
session_1.Session.equals("key", value);
/**
 * From Accounts, Meteor.users section
 */
meteor_1.Meteor.publish("userData", function () {
    return meteor_1.Meteor.users.find({ _id: this.userId }, { fields: { 'other': 1, 'things': 1 } });
});
meteor_1.Meteor.users.deny({ update: function () { return true; } });
/**
 * From Accounts, Meteor.loginWithExternalService section
 */
meteor_1.Meteor.loginWithGithub({
    requestPermissions: ['user', 'public_repo']
}, function (err) {
    if (err)
        session_1.Session.set('errorMessage', err.reason || 'Unknown error');
});
/**
 * From Accounts, Accounts.ui.config section
 */
accounts_base_1.Accounts.ui.config({
    requestPermissions: {
        facebook: ['user_likes'],
        github: ['user', 'repo']
    },
    requestOfflineToken: {
        google: true
    },
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
/**
 * From Accounts, Accounts.validateNewUser section
 */
accounts_base_1.Accounts.validateNewUser(function (user) {
    if (user.username && user.username.length >= 3)
        return true;
    throw new meteor_1.Meteor.Error("403", "Username must have at least 3 characters");
});
// Validate username, without a specific error message.
accounts_base_1.Accounts.validateNewUser(function (user) {
    return user.username !== "root";
});
/**
 * From Accounts, Accounts.onCreateUser section
 */
accounts_base_1.Accounts.onCreateUser(function (options, user) {
    var d6 = function () { return Math.floor(Math.random() * 6) + 1; };
    user.dexterity = d6() + d6() + d6();
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;
    return user;
});
/**
 * From Passwords, Accounts.emailTemplates section
 */
accounts_base_1.Accounts.emailTemplates.siteName = "AwesomeSite";
accounts_base_1.Accounts.emailTemplates.from = "AwesomeSite Admin <accounts@example.com>";
accounts_base_1.Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Awesome Town, " + user.profile.name;
};
accounts_base_1.Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    return "You have been selected to participate in building a better future!"
        + " To activate your account, simply click the link below:\n\n"
        + url;
};
/**
 * From Templates, Template.myTemplate.helpers section
 */
templating_1.Template['adminDashboard'].helpers({
    foo: function () {
        return session_1.Session.get("foo");
    }
});
templating_1.Template['newTemplate'].helpers({
    helperName: function () {
    }
});
templating_1.Template['newTemplate'].created = function () {
};
templating_1.Template['newTemplate'].rendered = function () {
};
templating_1.Template['newTemplate'].destroyed = function () {
};
templating_1.Template['newTemplate'].events({
    'click .something': function (event, template) {
    }
});
templating_1.Template.registerHelper('testHelper', function () {
    return 'tester';
});
var instance = templating_1.Template.instance();
var data = templating_1.Template.currentData();
var data = templating_1.Template.parentData(1);
var body = templating_1.Template.body;
/**
 * From Match section
 */
var Chats = new mongo_1.Mongo.Collection('chats');
meteor_1.Meteor.publish("chats-in-room", function (roomId) {
    // Make sure roomId is a string, not an arbitrary mongo selector object.
    check_1.check(roomId, String);
    return Chats.find({ room: roomId });
});
meteor_1.Meteor.methods({ addChat: function (roomId, message) {
        check_1.check(roomId, String);
        check_1.check(message, {
            text: String,
            timestamp: Date,
            // Optional, but if present must be an array of strings.
            tags: check_1.Match.Optional('Test String')
        });
        // ... do something with the message ...
    } });
/**
 * From Match patterns section
 */
var pat = { name: check_1.Match.Optional('test') };
check_1.check({ name: "something" }, pat); // OK
check_1.check({}, pat); // OK
check_1.check({ name: undefined }, pat); // Throws an exception
// Outside an object
check_1.check(undefined, check_1.Match.Optional('test')); // OK
/**
 * From Deps, Tracker.autorun section
 */
tracker_1.Tracker.autorun(function () {
    var oldest = Monkeys.findOne('age = 20');
    if (oldest)
        session_1.Session.set("oldest", oldest.name);
});
tracker_1.Tracker.autorun(function (c) {
    if (!session_1.Session.equals("shouldAlert", true))
        return;
    c.stop();
    alert("Oh no!");
});
/**
 * From Deps, Deps.Computation
 */
if (tracker_1.Tracker.active) {
    tracker_1.Tracker.onInvalidate(function () {
        console.log('invalidated');
    });
}
/**
 * From Tracker, Tracker.Dependency
 */
var weather = "sunny";
var weatherDep = new tracker_1.Tracker.Dependency;
var getWeather = function () {
    weatherDep.depend();
    return weather;
};
var setWeather = function (w) {
    weather = w;
    // (could add logic here to only call changed()
    // if the new value is different from the old)
    weatherDep.changed();
};
/**
 * From HTTP, HTTP.call section
 */
meteor_1.Meteor.methods({ checkTwitter: function (userId) {
        check_1.check(userId, String);
        this.unblock();
        var result = http_1.HTTP.call("GET", "http://api.twitter.com/xyz", { params: { user: userId } });
        if (result.statusCode === 200)
            return true;
        return false;
    } });
http_1.HTTP.call("POST", "http://api.twitter.com/xyz", { data: { some: "json", stuff: 1 } }, function (error, result) {
    if (result.statusCode === 200) {
        session_1.Session.set("twizzled", true);
    }
});
/**
 * From Email, Email.send section
 */
meteor_1.Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        check_1.check([to, from, subject, text], [String]);
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
    }
});
// In your client code: asynchronously send an email
meteor_1.Meteor.call('sendEmail', 'alice@example.com', 'Hello from Meteor!', 'This is a test of Email.send.');
var testTemplate = new blaze_1.Blaze.Template('foo');
var testView = new blaze_1.Blaze.View('foo');
blaze_1.Blaze.Template.instance();
blaze_1.Blaze.render(testTemplate, el);
blaze_1.Blaze.renderWithData(testTemplate, { testData: 123 }, el);
blaze_1.Blaze.remove(testView);
blaze_1.Blaze.getData(el);
blaze_1.Blaze.getData(testView);
blaze_1.Blaze.toHTML(testTemplate);
blaze_1.Blaze.toHTML(testView);
blaze_1.Blaze.toHTMLWithData(testTemplate, { test: 1 });
blaze_1.Blaze.toHTMLWithData(testTemplate, function () { });
blaze_1.Blaze.toHTMLWithData(testView, { test: 1 });
blaze_1.Blaze.toHTMLWithData(testView, function () { });
var reactiveVar1 = new reactive_var_1.ReactiveVar('test value');
var reactiveVar2 = new reactive_var_1.ReactiveVar('test value', function (oldVal) { return true; });
var varValue = reactiveVar1.get();
reactiveVar1.set('new value');
// Covers this PR:  https://github.com/DefinitelyTyped/DefinitelyTyped/pull/8233
var isConfigured = accounts_base_1.Accounts.loginServicesConfigured();
accounts_base_1.Accounts.onPageLoadLogin(function () {
    // do something
});
// Covers this PR:  https://github.com/DefinitelyTyped/DefinitelyTyped/pull/8065
var loginOpts = {
    requestPermissions: ["a", "b"],
    requestOfflineToken: true,
    loginUrlParameters: { asdf: 1, qwer: "1234" },
    loginHint: "Help me",
    loginStyle: "Bold and powerful",
    redirectUrl: "popup",
    profile: "asdfasdf"
};
meteor_1.Meteor.loginWithMeteorDeveloperAccount(loginOpts, function (error) { });
accounts_base_1.Accounts.emailTemplates.siteName = "AwesomeSite";
accounts_base_1.Accounts.emailTemplates.from = "AwesomeSite Admin <accounts@example.com>";
accounts_base_1.Accounts.emailTemplates.headers = { asdf: 'asdf', qwer: 'qwer' };
accounts_base_1.Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Awesome Town, " + user.profile.name;
};
accounts_base_1.Accounts.emailTemplates.enrollAccount.html = function (user, url) {
    return "<h1>Some html here</h1>";
};
accounts_base_1.Accounts.emailTemplates.enrollAccount.from = function () {
    return "asdf@asdf.com";
};
accounts_base_1.Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    return "You have been selected to participate in building a better future!"
        + " To activate your account, simply click the link below:\n\n"
        + url;
};
var handle = accounts_base_1.Accounts.validateLoginAttempt(function (attemptInfoObject) {
    var type = attemptInfoObject.type;
    var allowed = attemptInfoObject.allowed;
    var error = attemptInfoObject.error;
    var user = attemptInfoObject.user;
    var connection = attemptInfoObject.connection;
    var methodName = attemptInfoObject.methodName;
    var methodArguments = attemptInfoObject.methodArguments;
    return true;
});
handle.stop();
// Covers https://github.com/meteor-typings/meteor/issues/8
var publicSetting = meteor_1.Meteor.settings.public['somePublicSetting'];
var deeperPublicSetting = meteor_1.Meteor.settings.public['somePublicSetting']['deeperSetting'];
var privateSetting = meteor_1.Meteor.settings['somePrivateSetting'];
var deeperPrivateSetting = meteor_1.Meteor.settings['somePrivateSettings']['deeperSetting'];
// Covers https://github.com/meteor-typings/meteor/issues/9
var username = templating_1.Template.instance().find('#username').value;
// Covers https://github.com/meteor-typings/meteor/issues/3
browser_policy_common_1.BrowserPolicy.framing.disallow();
browser_policy_common_1.BrowserPolicy.content.allowEval();
// Covers https://github.com/meteor-typings/meteor/issues/18
if (meteor_1.Meteor.isDevelopment) {
    Rooms._dropIndex({ field: 1 });
}
// Covers https://github.com/meteor-typings/meteor/issues/20
Rooms.find().count(true);
// Covers https://github.com/meteor-typings/meteor/issues/21
if (meteor_1.Meteor.isTest) {
}
ddp_rate_limiter_1.DDPRateLimiter.addRule({ userId: 'foo' }, 5, 1000);
ddp_rate_limiter_1.DDPRateLimiter.addRule(function (userId) { return userId == 'foo'; }, 5, 1000);
templating_1.Template.instance().autorun(function () { }).stop();
