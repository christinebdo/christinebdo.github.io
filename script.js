var APP = {};

console.log('hi');

$.get('/uniqueToken', function(data) {
    APP.token = data.token;
});

$.post('/save', {
    sessionToken: APP.token,
    count: 1,
    score: 1,
    playerScore: 1,
    blowTime: [Date.now()],
    tieTime: Date.now(),
    explodeTime: Date.now(),
    startTime: Date.now(),
    newRoundTime: Date.now()
}, function(data) {
    console.log(data);
})
