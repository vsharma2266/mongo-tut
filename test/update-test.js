const mocha = require('mocha');
const assert = require('assert');
const User = require('../src/user');

function assertName(operation, done) {
    operation
    .then(() => User.find({}))
            .then((u) => {
                
                assert(u.length === 1);
                assert(u[0].name === 'Alex');
                done();
            });
}

    describe('', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', postCount: 1 });
        joe.save()
            .then(() => {
                done();
            })
    })

    it('should save using instance', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    })

    it('should update model instance', (done) => {
        assertName(joe.update({ name: 'Alex' }), done);
    });

    it('should increment postCount by 1', (done) => {
        User.update({ name: 'Joe' }, { $inc: { postCount: 1 }})
            .then(() => User.findOne({ name: 'Joe' }))
            .then((u) => {
                assert(u.postCount === 2);
                done();
            })
    });


})