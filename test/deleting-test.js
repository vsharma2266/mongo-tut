const mocha = require('mocha');
const assert = require('assert');
const User = require('../src/user');


describe('Deleting Record', () => {

    let joe;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => {
                done();
            })
    })

    it('should remove using instance', (done) => {
        joe.remove()
            .then(() => User.findOne({ name: 'Joe' })
                .then((user) => {
                    assert(user === null);
                    done();
                }))
    });

    it('should remove using class', (done) => {
        User.remove({ name: 'Joe'})
            .then(() => User.findOne( { name: 'Joe' })
                .then((u) => {
                    assert(u === null);
                    done();
                }));
    });

    it('should remove using class using findOne', (done) => {
        User.findOneAndRemove({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' })
                .then((user) => {
                    assert(user === null);
                    done();
                }))
    });

    it('should remove using class using findOne by Id', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ name: 'Joe' })
                .then((user) => {
                    assert(user === null);
                    done();
                }))
    });    
});