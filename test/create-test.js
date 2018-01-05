const mocha = require('mocha');
const assert = require('assert');
const User = require('../src/user');

describe('Creating Record', () => {

    it('save a user', (done) => {
        const joe = new User({ name: 'Joe' });
        joe.save().then(() => {
            assert(!joe.isNew);
            done();
        });
    })

});