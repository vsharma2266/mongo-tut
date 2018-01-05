const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({ 
    name: {
        type: String,
        validate: {
            validator: (name) => name.length >  2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [ true, 'Name is required.' ]
    },
    postCount: Number,
    post: [PostSchema],
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]    
});

// UserSchema.virtual('postCount').get(function() {
//     return this.posts.length;
// })


UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost'); // avoid cyclical dependency 
    BlogPost.remove({ _id: { $in: this.blogPosts }})
        .then(() => next());
})

const User = mongoose.model('user', UserSchema); // user model/class

module.exports = User;
