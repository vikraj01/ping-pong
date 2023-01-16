let roomDetails
const $joinPlayer = $('#join-player')
const $createPlayer = $('#create-player')
const $roomId = $('#room-id')
const $joinBtn = $('#join-button')
const $createBtn = $('#create-button')

//-------------------------------------------------//
function generateId () {
  return (
    Math.random().toString(36).substring(2, 9) +
    Math.random().toString(36).substring(2, 9)
  )
}

function updateJoinButtonState () {
  if ($roomId.val()?.trim() === '' || $joinPlayer.val()?.trim() === '') {
    $joinBtn.prop('disabled', true)
  } else {
    $joinBtn.prop('disabled', false)
  }
}
function updateCreateButtonState () {
  if ($createPlayer.val()?.trim() === '') {
    $createBtn.prop('disabled', true)
  } else {
    $createBtn.prop('disabled', false)
  }
}

//-------------------------------------------------//
$('#join button, #join .action-icon img').on('click', () => {
  if ($('#join').hasClass('on-click-style')) {
    roomDetails = {
      room: $('#room-id').val(),
      isCreate: false,
      player: $joinPlayer.val()
    }

    
    localStorage.setItem('room-details', JSON.stringify(roomDetails))
    window.location.assign('pong.html')
  } else {
    $('#create, #ai').hide()
    $('#room-id').show()
    $('#join').addClass('on-click-style')
    $('.action div:nth-child(2)').addClass('class1')
    $('.fa').show()
    $('.intro').css('gap', '47px')
    $('.player-name').show()

    $joinBtn.prop('disabled', true)

    $roomId.on('input', updateJoinButtonState)
    $joinPlayer.on('input', updateJoinButtonState)
  }
})

$('#create button, #create .action-icon img').on('click', () => {
  if ($('#create').hasClass('on-click-style')) {
    roomDetails = {
      room: $('#created-room-id').val(),
      isCreate: false,
      player: $createPlayer.val()
    }
    localStorage.setItem('room-details', JSON.stringify(roomDetails))
    window.location.assign('pong.html')
  } else {
    $('#join, #ai').hide()
    $('#created-room-id').show().val(generateId())
    $('#create').addClass('on-click-style')
    $('.action div:nth-child(2)').addClass('class1')
    $('.fa').show()
    $('.intro').css('gap', '47px')
    $('#create-button').html('Join This Room')
    $('.player-name').show()

    $createBtn.prop('disabled', true)
    $createPlayer.on('input', updateCreateButtonState)
  }
})

$('.fa-arrow-left').on('click', () => {
  $('#create, #join, #ai').show()
  $('#created-room-id , #room-id').hide()
  $('#join').removeClass('on-click-style')
  $('#create').removeClass('on-click-style')
  $('.fa').hide()
  $('.intro').css('gap', '100px')
  $('.player-name').hide()
  $('#create-button').html('Create room')

  //------------------- //

  $createBtn.prop('disabled', false)
  $joinBtn.prop('disabled', false)

  $createPlayer.val('').off('input', updateCreateButtonState)
  $joinPlayer.val('').off('input', updateJoinButtonState)
  $roomId.val('').off('input', updateJoinButtonState)
})

// -------------------------------------------------------- //

$('#ai').on('click', () => {
  localStorage.setItem('room-details', 'ai')
  window.location.assign('auto.html')
})

$('.fa-copy').on('click', () => {
  navigator.clipboard.writeText($('#created-room-id').val()).then(() => {
    $('.fa-copy').removeClass('fa-copy').addClass('fa-check')
    setTimeout(function () {
      $('.fa-check').removeClass('fa-check').addClass('fa-copy')
    }, 1000)
  })
})

// ------------------------------------------------//
