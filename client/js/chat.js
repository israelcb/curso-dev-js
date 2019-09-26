function retornaUsuario(id) {

    let urlString = window.location.href;
    let url = new URL(urlString);

    let usuario = url.searchParams.get('user');
    let status = url.searchParams.get('status');

    return { id, usuario, status };
}

let socket = io('ws://localhost:3000');

socket.on('connect', function() {

    socket.emit('criarUsuario', retornaUsuario(socket.id));
});