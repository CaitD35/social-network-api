const { Schema, model } = require('mongoose');

function dateValidator(date) {
    return date === new Date().toLocaleDateString();
} 

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },  
        createdAt: {
            type: Date,
            default: Date.now,
            validate: [dateValidator, 'Please enter a valid date'],
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction',
            } 
        ],
    },
);