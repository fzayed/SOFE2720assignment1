var socket = io();

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
}
var hand = {
    rock: false,
    paper: false,
    scissors: false
}
document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
        case 80: //P
            hand.paper = true;
            break;
        case 82: //R
            hand.rock = true;
            break;
        case 67: //C
            hand.scissors = true;
            break;
    }
});
document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
        case 80: //P
            hand.paper = false;
            break;
        case 82: //R
            hand.rock = false;
            break;
        case 67: //C
            hand.scissors = false;
            break;
    }
});
socket.emit('new player');
setInterval(function() {
    socket.emit('movement', movement);
    socket.emit('hand', hand);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
    context.clearRect(0, 0, 800, 600);
    let users = [];
    for (var id in players) {
        var player = players[id];
        users.push(player);
        context.fillStyle = player.color || 'green';
        context.beginPath();
        context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        context.fill();
    }
    if (Object.keys(users).length == 2) {
        if (users[0].color == "pink" && users[1].color == "blue") {
            alert("Player 2 wins!");
            hand.paper = false;
            hand.rock = false;
            hand.scissors = false;
        } else if (users[0].color == "pink" && users[1].color == "yellow") {
            alert("Player 1 wins!")
            hand.paper = false;
            hand.rock = false;
            hand.scissors = false;
        } else if (users[0].color == "blue" && users[1].color == "pink") {
            alert("Player 1 wins!")
            hand.paper = false;
            hand.rock = false;
            hand.scissors = false;
        } else if (users[0].color == "blue" && users[1].color == "yellow") {
            alert("Player 2 wins!")
            hand.paper = false;
            hand.rock = false;
            hand.scissors = false;
        } else if (users[0].color == "yellow" && users[1].color == "blue") {
            alert("Player 1 wins!")
            hand.paper = false;
            hand.rock = false;
            hand.scissors = false;
        } else if (users[0].color == "yellow" && users[1].color == "pink") {
            alert("Player 2 wins!")
            hand.paper = false;
            hand.rock = false;
            hand.scissors = false;
        }
    }
});