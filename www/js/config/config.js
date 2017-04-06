angular.module('WeBarrio.config', [])
  .constant("CONFIG", {
    apiURL: (window.location.hostname == "localhost") ? 'http://localhost:8100/api' : "https://admin.webarrio.cl/api",
    apiKey: "AIzaSyCK2M3JsJ0bCpooHJZ78bTkkA2Qix-qio0",
    authDomain: "webarrio-6ffa7.firebaseapp.com",
    databaseURL: "https://webarrio-6ffa7.firebaseio.com",
    storageBucket: "webarrio-6ffa7.appspot.com",
    notificationIcon: 'img/favicons/apple-icon.png'
  });