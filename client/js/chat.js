function retornaUsuario(id) {

    let urlString = window.location.href;
    let url = new URL(urlString);

    let usuario = url.searchParams.get('user');
    let status = url.searchParams.get('status');

    return { id, usuario, status };
}

let socket = io('ws://localhost:3000');

let $form = document.querySelector('#form-chat');
let $input = document.querySelector('#input-chat');
let $conversationMensages = document.querySelector('#mensagens-chat');

$form.addEventListener('submit',
function(event) {

    event.preventDefault();

    let mensagem = $input.value;
    $input.value = '';

    if (mensagem === '') {

        return;
    }

    socket.emit('criarMensagem', {
       usuario: retornaUsuario(socket.id),
       mensagem
    });
});

socket.on('connect', function() {

    socket.emit('criarUsuario', retornaUsuario(socket.id));
});

socket.on('listarMensagens', function(mensagens) {

    $conversationMensages.innerHTML = '';

    mensagens
    .forEach(({ mensagem, usuario }) => {

        let $text = document.createElement('p');
        $text.classList.add('message__text');
        $text.textContent = mensagem;

        let $box = document.createElement('div');
        $box.classList.add('message__box');

        let $mensagem = document.createElement('div');
        $mensagem.classList.add('message');

        if (usuario.usuario === retornaUsuario(socket.id).usuario) {

            $mensagem.classList.add('message--sent');
        }
        else {

            $mensagem.classList.add('message--received');

            let $user = document.createElement('p');
            $user.classList.add('message__user');
            $user.textContent = usuario.usuario;
            $box.append($user);
        }

        $box.append($text);
        $mensagem.append($box);
        $conversationMensages.append($mensagem);
        $conversationMensages.scrollTop = $conversationMensages.scrollHeight;
    });
});