const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogpost');
const assert = require('assert');

describe('', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        blogPost = new BlogPost({ title: 'How to mongo', content: 'Mongoose '});
        comment = new Comment({ content: 'Congrats'});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    })
    
    it('should save relation b/w user and bp', (done) => {
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then((u) => {
                assert(u.blogPosts[0].title === 'How to mongo')
                done();
            });
    })
    
    it('should save full relation b/w user and bp and comment', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((u) => {                
                assert(u.blogPosts[0].title === 'How to mongo');
                assert(u.blogPosts[0].comments[0].content === 'Congrats');
                assert(u.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    })
})