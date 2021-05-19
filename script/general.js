const firebaseConfig = {
    apiKey: "AIzaSyD9KoHYGh39yD3AVfw8gVeNvY0q5EXB2jE",
    authDomain: "taller1-pw211.firebaseapp.com",
    projectId: "taller1-pw211",
    storageBucket: "taller1-pw211.appspot.com",
    messagingSenderId: "252463248566",
    appId: "1:252463248566:web:920db6220bd20f8a336217"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();