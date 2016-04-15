var APP = {};

console.log('hi');

$.get('/uniqueToken', function(data) {
    APP.token = data.token;
});

$.post('/save', {

    var collection = db.get('balloon-data');

    sessionToken: APP.token,
    count: count,
    score: score,
    playerScore: playerScore,
    blowTime: [blowTime],
    tieTime: tieTime,
    explodeTime: explodeTime,
    startTime: startTime,
    newRoundTime: newRoundTime
}, function(data) {
    console.log(data);
})

