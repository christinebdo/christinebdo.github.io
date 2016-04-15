var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Result = new Schema({
    sessionToken: String,
    count: Number,
    score: Number,
    playerScore: Number,
    blowTime: [Date],
    tieTime: Date,
    explodeTime: Date,
    startTime: Date,
    newRoundTime: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Result', Result);
