"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var upload_js_1 = require("./upload.js");
var app_1 = __importDefault(require("firebase/app"));
require("firebase/storage");
var firebaseConfig = {
    apiKey: "AIzaSyAP5_6EOB_o7gSdoy7oYDfqSpN0AZgxNo4",
    authDomain: "fe-upload-9f2cf.firebaseapp.com",
    projectId: "fe-upload-9f2cf",
    storageBucket: "fe-upload-9f2cf.appspot.com",
    messagingSenderId: "860506852295",
    appId: "1:860506852295:web:966021c07952fd1ee0e7e2"
};
app_1.default.initializeApp(firebaseConfig);
var storage = app_1.default.storage();
upload_js_1.upload('#file', {
    multi: true,
    types: ['.jpg', '.png'],
    onUpload: function (files, preview) {
        var fillesArr = Array.from(files);
        fillesArr.forEach(function (file, index) {
            var ref = storage.ref('images/' + file.size);
            var task = ref.put(file);
            task.on('state_changed', function (snapshot) {
                var percentage = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                console.log(percentage);
                var block = preview[index].querySelector('.preview__info-progress');
                if (block)
                    block.textContent = percentage.toString();
            }, function (error) {
                console.error(error);
            }, function () {
                console.log("completed");
            });
        });
    }
});
