var firebaseConfig = {
    apiKey: "AIzaSyBbj270QjXIDDdoQ6TbSx7j1CzlWVYaTPo",
    authDomain: "poccloudmessage.firebaseapp.com",
    projectId: "poccloudmessage",
    storageBucket: "poccloudmessage.appspot.com",
    messagingSenderId: "52909771649",
    appId: "1:52909771649:web:7c3b831ad6e038460ab680"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  
  function subscribeUser(){
      Notification.requestPermission().then(permission =>{
        console.log(permission);
        if(permission == "granted"){
            messaging.getToken({vapidKey:'BGHo-Jh73YqyadqZar5-2QClfWWQxNaBO-8URFxQOm84nSexZ_3du8D1BRD6rWT6Iq67qa2M9_QODswHbH5-kBU'})
            .then(currentToken =>{
               document.getElementById('tokenId').innerHTML = currentToken;
            })
            .catch(err => {
                console.log(err)
            })
        }
      })
  }

  messaging.onMessage(res =>{
      console.log("onMessage");
      console.log(res);
      
      showNotifications();
  });

function showNotifications(){
    
    console.log(Notification.permission);
    var notification = new Notification("title", {
        body: "corpo da mensagem"
    });
}  
  function sendMenssage(){
    let token = document.getElementById('token').value;
    let title = document.getElementById('title').value;
    let message = document.getElementById('message').value;

    let body = {
        "to": token,
        "notification":{
            "title": title,
            "body": message,
            "icon": "icon.png",
            "click_action": "https://google.com.br"
        }
    }
    let options ={
        method: 'POST',
        headers: new Headers({
            Authorization: "key=AAAAv7ul3ww:APA91bGdhaFeMYfDSDwObqm2bb88-mB7QElGwmH0N__IA0Iwwyi7pwXmoDhsFLoZNdBxWMTot_6PWhU9JHq39OVc3o2HaEgKzw6OVd41pC0ZOJRiLl7Q0M02A6wnUaBLNg2ZZXJBwwln",
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(body)
    }

    fetch("https://fcm.googleapis.com/fcm/send", options ).then(resp => {
        console.log(resp);
        console.log("Enviada");
    }).catch(err =>{
        console.log(err);
    });
}