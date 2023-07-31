const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');


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
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],

    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
} );

function formatDate(createdAt) {
    return createdAt.toLocalDateString("en-US",{
    day: "2-digit",
    year: "numeric",
    month: "long",
    minutes: "2-digit",
    hours: "2-digit",
    
});
}

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;