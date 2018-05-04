var restify = require('restify');
var builder = require('botbuilder');

// Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector to communicate with Bot framework
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages
server.post('/api/messages', connector.listen());

// Receive messages from user and respond
var bot = new builder.UniversalBot(connector, function(session){
    session.send("You said: %s", session.message.text);
})