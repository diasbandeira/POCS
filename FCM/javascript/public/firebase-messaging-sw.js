
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')

var firebaseConfig = {
  apiKey: "AIzaSyCtd9k71J5MByX6AqFmO25EoWpglIAvPrc",
  authDomain: "fmcpoc-68c89.firebaseapp.com",
  projectId: "fmcpoc-68c89",
  storageBucket: "fmcpoc-68c89.appspot.com",
  messagingSenderId: "823486963468",
  appId: "1:823486963468:web:e60a383cab5652d072b329",
    measurementId: "G-0YCRVRQTQW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  // const notificationTitle = 'Background Message Title';
  // const notificationOptions = {
  //   body: 'Background Message body.',
  //   icon: './log.jpg',
  //   image: './log.jpg'
  // };

  // return self.registration.showNotification(notificationTitle, notificationOptions);
});

