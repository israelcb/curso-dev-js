const socketIO = require('socket.io');
let io = socketIO(3000);

let usuarios = [];
let mensagens = [];

io.on('connection', function(socket) {

    console.log('[server] NOVO USUÁRIO CONECTADO');

    socket.on('criarUsuario', function(dadosUsuario) {

        usuarios.push(dadosUsuario);
        console.log('[server] NOVO USUÁRIO CRIADO => ', dadosUsuario);
        console.log('[server] LISTA DE USUÁRIOS => ', usuarios);
    });

    socket.on('criarMensagem', function(mensagem) {

        mensagens.push(mensagem);
        console.log('[server] NOVA MENSAGEM => ', mensagem);
        console.log('[server] LISTA DE MENSAGENS => ', mensagens);

        io.emit('listarMensagens', mensagens);
    });

    socket.on('disconnect', function() {

        usuarios = usuarios.filter(u => u.id !== socket.id);
        console.log('[server] USUÁRIO DESCONECTADO => ', socket.id);
    });
});

console.log('[server] APLICAÇÃO RODANDO NA PORTA 3000!');