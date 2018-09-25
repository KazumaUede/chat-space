$(function () {
  function scroll() {
    //メッセージの一番下にスクロールする
    $('.contents__messages').animate({
      scrollTop: $('.contents__messages')[0].scrollHeight
    }, 'fast');
  }

  function buildHTML(message) {
    //画像アップロードを判断する
    var image_src = message.image ? message.image : "";
    var html = "<div class="contents__messages-top" data-message-id="${message.id}">"
                  "<div class="contents__messages__user">"
                    "<div class="contents__messages__user__name">${message.user_name}</div>"
                    "<div class="contents__messages__user__createdat">${message.created_at}</div>"
                  "</div>"
                  "<div class="contents__messages__messeage">"
                    "<p class="lower-message__content">${message.content}</p>"
                    "<image src= ${ image_src }>"
                  "</div>"
                "</div>"
    return html;
  }
  $('#new_message').on('submit', function (e) {
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
    .done(function (data) {
      var html = buildHTML(data);
      $('.contents__messages').append(html);
      // 送信データ初期化
      $('.form__textarea__message').val('');
      $('#message_image').val('');
      scroll();
    })
    .fail(function () {
      alert('メッセージの送信が失敗しました。');
    })
    return false;
  });
  $(function () {
    setInterval(update, 5000);
    //5000ミリ秒ごとにupdateという関数を実行する。
  });

  function update() {
    // 画面上での最新のメッセージIdを取得。
    var message_id = $('.contents__messages__top').last().data('messageId');
    $.ajax({
      url: window.location.href,
      type: "GET",
      data: {
        id: message_id
      }, // ここで先ほど所得した画面上メッセージIDを入れて、コントローラに送られる。
      dataType: 'json'
    }).done(function (messages) {
      if (messages.length !== 0) {
        // newメッセージがあれば順に
        messages.forEach(function (message) {
          var html = buildHTML(message);
          $('.contents__messages').append(html);
        });
        scroll();
      }
    });
  };
});
