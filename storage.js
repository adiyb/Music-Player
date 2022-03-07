import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";

import {
    getStorage,
    ref,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDyLonjWaR_SVezC1t8kM2_OgurhnsVQiU",
    authDomain: "music-player-4df62.firebaseapp.com",
    databaseURL:
        "https://music-player-4df62-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "music-player-4df62",
    storageBucket: "music-player-4df62.appspot.com",
    messagingSenderId: "501979279183",
    appId: "1:501979279183:web:94936e84252f1d6b261f3a",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/* ---------------- downloading songs from firebase --------------------- */

const badHabits = ref(storage, "Bad Habits.mp3");
const levitating = ref(storage, "Levitating.mp3");
const wap = ref(storage, "WAP.mp3");
const boss = ref(storage, "Boss.mp3");
const blueSkies = ref(storage, "Blue Skies.mp3");
const thereforeIAm = ref(storage, "Therefore I Am.mp3");
const kissMeMore = ref(storage, "Kiss Me More.mp3");


let songs = [badHabits,boss,levitating,blueSkies,wap,kissMeMore,thereforeIAm];
let audios = document.querySelectorAll("audio");

songs.forEach(function(song , index){

    getDownloadURL(song)
    .then((url) => {
        audios[index].setAttribute("src",url);
});
});



