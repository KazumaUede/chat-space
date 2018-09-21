json.array! @new_messages do |new_message|
  json.user_name  new_message.user.name
  json.created_at  new_message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.content  new_message.content
  json.image  new_message.image.url
  json.id     new_message.id
end
