angular.module('WeBarrio.config', [])
  .constant("CONFIG", {
    // apiURL: (window.location.hostname == "localhost") ? 'http://localhost:8100/api2' : "https://admin.webarrio.cl/api",
    apiURL: 'http://192.168.0.144:8100/api2',
    apiKey: "AIzaSyCK2M3JsJ0bCpooHJZ78bTkkA2Qix-qio0",
    authDomain: "webarrio-6ffa7.firebaseapp.com",
    databaseURL: "https://webarrio-6ffa7.firebaseio.com",
    storageBucket: "webarrio-6ffa7.appspot.com",
    notificationIcon: 'img/favicons/apple-icon.png',
    oneSignalAppId: "646e05c4-981f-4ee7-ac65-5188930efbc5"
  });