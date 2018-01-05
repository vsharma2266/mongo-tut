const mocha = require('mocha');
const assert = require('assert');
const User = require('../src/user');

describe('', () => {

    it('save subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            post: [{title: 'PostTitle'}]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((u) => {                
                assert(u.post[0].title === 'PostTitle');
                done();
            })
    });

    // it('should create a new subdocument in exsisting document', (done) => {
    //     const joe = new User({
    //         name: 'Joe',
    //         post: []
    //     });
    //     joe.save()
    //     .then(() => User.findOne({ name: 'Joe' }))
    //     .then((user) => {
    //         user.post.push({ title: 'New Post'});
    //         return user.save();
    //     })
    //     .then(() => User.findOne({ name: 'Joe' }))
    //     .then((u) => {
    //         assert(u.post[0].title === 'New Post');
    //         done();
    //     })
    // })

    
    it('should remove subdocument in exsisting document', (done) => {
        const joe = new User({
            name: 'Joe',
            post: [{title : 'remove this'}]
        });
        joe.save()
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
            user.post[0].remove();
            return user.save();
        })
        .then(() => User.findOne({ name: 'Joe' }))
        .then((u) => {
            assert(!u.post.length);
            done();
        })
    })
})