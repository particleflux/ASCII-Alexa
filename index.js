'use strict';

const Alexa = require('ask-sdk-v1adapter');
const APP_ID = 'amzn1.ask.skill.fa724d1b-4759-4065-90de-6e979a74593b';
const SKILL_NAME = 'ASCII';

exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;

    alexa.registerHandlers(handlers);
    alexa.execute();
};

let handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', 'Entschuldigung, es fehlt ein Buchstabe');
    },
    'ConvertCharIntent': function () {
        this.emit('ConvertChar');
    },
    'ConvertChar': function () {
        let slotValue = this.event.request.intent.slots.character.value;
        if (!slotValue || !slotValue.length) {
            // error
            this.emit(':tell', 'Entschuldigung, es fehlt ein Buchstabe');
        }

        let code = slotValue.charCodeAt(0);

        let output = slotValue[0] + ' entspricht ASCII ' + code;
        this.emit(':tellWithCard', output, SKILL_NAME, output);
    }
};