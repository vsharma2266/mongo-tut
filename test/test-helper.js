const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/user_test');
    mongoose.connection
        .once('openUri', () => console.log('mongo connection complete'))
        .on('error', (error) => {
            console.warn('Warning', error);   
        });
    done();
})


beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
     // can't drop multiple collections at on time
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            })
        })
    });
})