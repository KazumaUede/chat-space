$(function(){

  function buildHTML(message){
    //画像アップロードを判断する
    var image_src = message.image? message.image : "";
    var html = `<div class="contents__messages__user">
                  <div class="contents__messages__user__name">${message.user_name}</div>
                  <div class="contents__messages__user__createdat">${message.created_at}</div>
                </div>
                <div class="contents__messages__messeage">
                  <p class="lower-message__content">${message.content}</p>
                  <image src= ${ image_src }>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents__messages').append(html);
      //送信データ初期化
      $('.form__textarea__message').val('');
      $('#message_image').val('');
      //メッセージの一番下にスクロールする
      $('.contents__messages').animate({scrollTop: $('.contents__messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('メッセージの送信が失敗しました。');
    });
    return false;
  });
});
