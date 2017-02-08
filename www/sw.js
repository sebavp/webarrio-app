self.addEventListener("push", function(event) {
  var json = {title: "hola",  body: "body"}//event.data.json();
  console.log("received")
  console.log(event.data.text())
  self.registration.showNotification(json.title, {
    body: json.body,
    icon: 'img/favicons/apple-icon.png',
  });
});