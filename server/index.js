const socketIO = require('socket.io');
let io = socketIO(3000);

let usuarios = [];

io.on('connection', function(socket) {

    console.log('[server] NOVO USUÁRIO CONECTADO');

    socket.on('criarUsuario', function(dadosUsuario) {

        usuarios.push(dadosUsuario);
        console.log('[server] NOVO USUÁRIO CRIADO => ', dadosUsuario);
    });

    socket.on('disconnect', function() {

        usuarios = usuarios.filter(u => u.id !== socket.id);
        console.log('[server] USUÁRIO DESCONECTADO => ', socket.id);
    });
});

console.log('[server] APLICAÇÃO RODANDO NA PORTA 3000!');