const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');
const assert = require('assert');

describe('', () => {

    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        blogPost = new BlogPost({ title: 'How to mongo', content: 'Mongoose '});

        joe.blogPosts.push(blogPost);
 
        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
    })

    it('should delete blogposts on user delete', (done) => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {                
                assert(count === 0);
                done();
            })
    })

})