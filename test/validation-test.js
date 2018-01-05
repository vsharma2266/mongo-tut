const mocha = require('mocha');
const assert = require('assert');
const User = require('../src/user');

describe('', () => {

    it('should require a user name', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required.')
    })

    it('should require a user name', () => {
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;        
        assert(message === 'Name must be longer than 2 characters.')
    })
    
    it('should disallow saving invalid data', (done) => {
        const user = new User({ name: 'Al' });
        user.save()
        .catch((v) => {
            const { message } = v.errors.name;        
            assert(message === 'Name must be longer than 2 characters.')            
            done();
        })
    })

})