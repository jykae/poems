/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

var Poem = describe('Poem', function () {
    property('title', String);
    property('content', String);
    property('created', Date, {default: Date.now});
    property('published', Boolean, {default:false});
    set('restPath', pathTo.poems);
});

var User = describe('User', function () {
	property('name', String, {default: null});
    property('email', String);
    property('password', String);
    set('restPath', pathTo.users);
});

//Relations
Poem.belongsTo(User, {as: 'author', foreignKey: 'userId'});
User.hasMany(Poem,   {as: 'poems',  foreignKey: 'userId'});
