const { Schema, types } = require('mongoose');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 10,
        },  
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

function formatDate(createdAt) {
    return createdAt.toLocalDateString("en-US",{
    day: "2-digit",
    year: "numeric",
    month: "long",
    minutes: "2-digit",
    hours: "2-digit",
    
});
}   

module.exports = reactionSchema;
