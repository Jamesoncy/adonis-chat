let ws = null
let channel = ""
$(function () {
  if (window.username) {
    if(window.username === "james" || window.username === "test") channel = "chat:james"
    else channel = "chat"
    startChat()
  }
})

function startChat () {
  ws = adonis.Ws('ws://127.0.0.1:3333').connect()

  ws.on('open', () => {
    $('.connection-status').addClass('connected')
    subscribeToChannel()
  })

  ws.on('error', () => {
    $('.connection-status').removeClass('connected')
  })
}

function subscribeToChannel () {
  const chat = ws.subscribe(channel, {options: 'dasda'})

  chat.on('error', () => {
    $('.connection-status').removeClass('connected')
    alert()
  })

  chat.on('message', (message) => {
    $('.messages').append(`
      <div class="message"><h3> ${message.username} </h3> <p> ${message.body} </p> </div>
    `)
  })
}

$('#message').keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault()

    const message = $(this).val()
    $(this).val('')

    /* ws.getSubscription(channel).emit('error', {
      username: window.username,
      body: message
    }) */
    ws.getSubscription(channel).emit('message', {
      username: window.username,
      body: message
    })
    return
  }
})
