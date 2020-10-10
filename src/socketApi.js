const socketio = require('socket.io');
const io = socketio();

const socketApi = { };
socketApi.io = io;

const users = { }

io.on('connection', socket => {
	console.log('Foydalanuvchi boglandi!!!');
	socket.on('newUser', data => {
		// console.log(data);
		const defaultData = {
			id: socket.id,
			position: {
				x: 0,
				y: 0
			}
		}

		const userDate = Object.assign(data, defaultData)

		// users.push(userDate)
		users[socket.id] = userDate
		// console.log(userDate);

		socket.broadcast.emit('newUser', users[socket.id])
		socket.emit('initPlayers', users)

	})
	socket.on('disconnect', () => {
		socket.broadcast.emit('disUser', users[socket.id])

		delete users[socket.id]
		console.log(users);
	})
});

module.exports = socketApi;