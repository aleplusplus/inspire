
/**
 * App ID for the skill
 */
 var APP_ID = undefined; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill'),
    inspires = require('./inspires');

/**
 * Inspire is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Inspire = function () {
    AlexaSkill.call(this, APP_ID);
};

/**
 * Randon inspire quote
 */
var RANDOM_NUMBER = undefined;


// Extend AlexaSkill
Inspire.prototype = Object.create(AlexaSkill.prototype);
Inspire.prototype.constructor = Inspire;

Inspire.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Inspire onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Inspire.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Inspire onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Inspire, you can say inspire me";
    var repromptText = "You can say inspire me";
    response.ask(speechOutput, repromptText);
};

Inspire.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Inspire onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Inspire.prototype.intentHandlers = {
    // register custom intent handlers
    "InspireIntent": function (intent, session, response) {
        RANDOM_NUMBER = Math.floor(Math.random() * inspires.length);
        var speechOutput = inspires[RANDOM_NUMBER];
        response.tellWithCard(speechOutput, "Inspire "+ RANDOM_NUMBER, speechOutput);
    },
    "AMAZON.YesIntent": function (intent, session, response) {
        RANDOM_NUMBER = Math.floor(Math.random() * inspires.length);
        var speechOutput = inspires[RANDOM_NUMBER];
        response.tell(speechOutput);
    },
    "AMAZON.RepeatIntent": function (intent, session, response) {
        if(RANDOM_NUMBER === undefined){
            RANDOM_NUMBER = Math.floor(Math.random() * inspires.length);
        }
        var speechOutput = inspires[RANDOM_NUMBER];
        response.tell(speechOutput);
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },
    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say inspire me to me!", "You can say inspire me to me!");
    },
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Inspire skill.
    var inspire = new Inspire();
    inspire.execute(event, context);
};

//var rand = myArray[Math.floor(Math.random() * myArray.length)];
