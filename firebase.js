// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDiegmNAb_60Ecj8jHfxpbcD_Pqv8rndZo",
    authDomain: "maestro-41470.firebaseapp.com",
    projectId: "maestro-41470",
    storageBucket: "maestro-41470.appspot.com",
    messagingSenderId: "471544158937",
    appId: "1:471544158937:web:660cecfcb6b8e27d61fcc8"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Initialize EmailJS
  emailjs.init("l9Qm9w7_tZOWoJsHv");
  
  // Auto-populate events if none exist
  const defaultEvents = [
    { name: "Auditorium Booking", venue:"Main Auditorium", chairs:100, projectors:3, microphones:5 },
    { name: "Conference Room A", venue:"Conf Room A", chairs:50, projectors:1, microphones:2 },
    { name: "Outdoor Stage", venue:"Campus Stage", chairs:200, projectors:2, microphones:10 }
  ];
  
  async function populateEvents() {
    const snapshot = await db.collection("events").get();
    if(snapshot.empty){
      defaultEvents.forEach(async evt => {
        await db.collection("events").add(evt);
      });
    }
  }
  populateEvents();
  