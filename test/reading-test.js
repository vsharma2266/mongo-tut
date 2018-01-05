const mocha = require('mocha');
const assert = require('assert');
const User = require('../src/user');

describe('Reading Record', () => {
    let joe, b, c, d;
    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        a = new User({ name: 'Abc'});
        b = new User({ name: 'Bcd'});
        c = new User({ name: 'Cde'});

        Promise.all([joe.save(), a.save(), b.save(), c.save()])
            .then(() => done());
    })

    it('should find user with name "Joe"', (done) => {
        User.find({ name: 'Joe'}).then((users) => {            
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        });
    })

    it('should find user with particular id', (done) => {
        User.findOne({ _id: joe._id}).then((user) => {            
            assert(user._id.toString() === joe._id.toString());
            done();
        });
    })

    it('should skip and limit', (done) => {
        User.find({})
        .sort({ name: -1 })
        .skip(1)
        .limit(2)
            .then((u) => {                
                assert(u[0].name === 'Cde');
                assert(u.length === 2);
                done();
            });
    })

});