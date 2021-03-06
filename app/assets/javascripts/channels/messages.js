// In need of conversion to front end framework and a bit rushed!

function initMessages(room){

  App.messages = App.cable.subscriptions.create({channel: "MessagesChannel", room: room}, {
    connected: function() {
    },

    disconnected: function() {
    },

    received: function(data) {
      console.log(data)
      //structure and append populated elements to action cable message
      if (data.message.message_obj.user_id == data.message.current_user.id){
          $("#message_area").append('<div class="message my_message">  <div class="inner" id="'+ data.message.message_obj.id +'">' + 
          data.message.user_name.charAt(0).toUpperCase() + data.message.user_name.slice(1) + ': '+data.message.message_obj.content + 
          '<i class="fas fa-trash-alt trash_message" id="deleteId' + data.message.message_obj.id + '"></i><span class="date">' + 
          data.message.message_obj.created_at.substr(0,15) + '</span></div></div>')
        } else {
          $("#message_area").append('<div class="message their_message">  <div class="inner" id="'+ data.message.message_obj.id +
          '">' + data.message.user_name.charAt(0).toUpperCase() + data.message.user_name.slice(1) + ': '+data.message.message_obj.content + 
          '<span class="date">' + 
          data.message.message_obj.created_at.substr(0,15) + '</span> <i class="fas fa-trash-alt trash_message" id="deleteId' + data.message.message_obj.id + '"></i></div></div>')
          }
          document.querySelector('#textarea').value = ''; // clear message_box
          $('#message_box').toggleClass('open'); // hide message_box (input)
          messageWindow=document.getElementsByClassName('inner')
          messageWindow.length ? messageWindow[messageWindow.length-1].scrollIntoView({block: "end"}) : null
    }
  });
}
