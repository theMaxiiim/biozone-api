const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

const KeywordsSchema = new mongoose.Schema({
    messages : {
        type: String,
        required: true,
        trim: true
    },
    queueItemId : {
        type: String,
        trim: true
    },
    device : {
        type: String,
        required: true,
        trim: true
    }
});

KeywordsSchema.plugin(timestamp);

const Keywords = mongoose.model('Keywords', KeywordsSchema);

module.exports = Keywords;

 