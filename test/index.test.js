'use strict';

const alexaTest = require('alexa-skill-test-framework');
const myHandler = require('../index');
const describe = require('mocha').describe;

alexaTest.initialize(
    myHandler,
    'amzn1.ask.skill.fa724d1b-4759-4065-90de-6e979a74593b',
    'amzn1.ask.account.AM3B227HF3FAM1B261HK7FFM3A2'
);

describe('direct launch with char', function () {

    [
        {
            'char': 'a',
            'response': '97'
        },
        {
            'char': 'z',
            'response': '122'
        }
    ].forEach(function (data) {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('ConvertCharIntent', {
                    'character': data.char
                }),
                says: data.char + ' entspricht ASCII ' + data.response,
                shouldEndSession: true
            }
        ]);
    });
});


describe('direct launch without char', function () {

    alexaTest.test([
        {
            request: alexaTest.getIntentRequest('ConvertCharIntent', {
                'character': ''
            }),
            says: 'Entschuldigung, es fehlt ein Buchstabe',
            shouldEndSession: true
        }
    ]);
});

describe('LaunchRequest without char', function () {
    alexaTest.test([
        {
            request: alexaTest.getIntentRequest('LaunchRequest'),
            says: 'Entschuldigung, es fehlt ein Buchstabe',
            shouldEndSession: true
        }
    ]);
});