const socket = io()
var i = 0;

$(document).ready(function() {
    let timeOut = null
    $('#message').on('input', function() {
        clearTimeout(timeOut)
        let value = $(this).val()
        timeOut = setTimeout(function () {
            if(value == '') {
                $('#btn-submit').html(`
                    <button type="submit" class="btn text-pink px-3 me-1" disabled><i class="fa-regular fs-4 fa-paper-plane"></i></button>
                `)
            } else {
                // $('#btn-submit').html(`
                //     <button type="submit" class="btn text-pink px-3 me-1"><i class="fa-solid fs-4 fa-microphone"></i></button>
                // `)
                $('#btn-submit').html(`
                    <button type="submit" class="btn text-pink px-3 me-1"><i class="fa-regular fs-4 fa-paper-plane"></i></button>
                `)
            }
        }, 300)
    })

    $('#chat-form').on('submit', function(e) {
        e.preventDefault()
        let value = $('#message').val()
        socket.emit("chat message", value)
        $('#message').val('')
    })
})

socket.on("chat message", (msg) => {
    i++
    let messageField = $('#message-field')
    let newDiv = $('<div>')
    newDiv.addClass('my-3 shadow text-light px-4 pt-2 pb-1 bubble w-fc')
    if(msg.isBotResponse) {
        newDiv.addClass('bot-responses')
    }
    newDiv.html(`
        <div id="message-${i}">${msg.text}</div>
        <div class="row my-2">
            <div class="col-auto pe-0">
                <a onclick="textToSpeech('message-${i}')" class="text-warning btn-speech"><i class="fa-solid fa-microphone"></i></a>
            </div>
            <div class="col-auto">
                <a onclick="copyText('${i}', 'message-${i}')" id="${i}" class="text-warning btn-copy-clipboard"><i class="fa-regular fa-clipboard"></i></a>
            </div>
        </div>  
    `)
    messageField.append(newDiv)
    window.scrollTo(0, document.body.scrollHeight)
})

const textToSpeech = (id) => {
    let text = document.getElementById(id).innerText
    responsiveVoice.speak(text, 'UK English Male')
}

const copyText = (idButton, idText) => {
    let button = document.getElementById(idButton)
    let text = document.getElementById(idText)

    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(text.innerHTML)
            button.innerHTML = `<i class="fa-solid fa-check"></i>`
            setTimeout(() => {
                button.innerHTML = `<i class="fa-regular fa-clipboard"></i>`
            }, 1000);
        } catch (error) {
            throw new Error(error)   
        }
    })
}

const menu = () => {
    $('.ham-menu span').toggleClass('active')
    $('.menu').toggleClass('d-none')
} 