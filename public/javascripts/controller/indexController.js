app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {

    $scope.messages = [ ]
    $scope.players = { }

    $scope.init = () => {
        const username = prompt('Ismingizni Kiriting!!!')

        if (username)
            initSocket(username)
        else
            return false
    }

    function initSocket(username) {
        const connectionOptions = {
            reconnectionAttempts: 3,
            reconnectionDelay: 600
        }

        indexFactory.connectSocket('http://localhost:3000', connectionOptions, {}).then(socket => {
            // console.log('Boglanish amalga oshirildi', socket);,
            socket.emit('newUser', { username })

            socket.on('initPlayers', players => {
                $scope.players = players
                $scope.$apply()
            })

            socket.on('newUser', (data) => {
                // console.log(data);
                const messageData = {
                    type: {
                        code: 0,
                        message: 1
                    },
                    username: data.username
                }
                $scope.messages.push(messageData)
                $scope.$apply()
            })

            socket.on('disUser', data => {
                const messageData = {
                    type: {
                        code: 0,
                        message: 0
                    },
                    username: data.username
                }
                $scope.messages.push(messageData)
                $scope.$apply()
            })
        }).catch(err => {
            console.log(err);
        })
    }
}])