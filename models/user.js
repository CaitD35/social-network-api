const {Schema, model} = require('mongoose');

var validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*))$/;
    return re.test(email);
};

const UserSchema = new Schema({
    username: {
        type: String,
        default: '',
        unique: true,
        required: true,
        trim: true,
    },  
    email: {  
        type: String,
        default: '',
        unique: true,
        required: true,
        validate: [validateEmail, 'Please enter a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought', 
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        } 
    ],
},
);