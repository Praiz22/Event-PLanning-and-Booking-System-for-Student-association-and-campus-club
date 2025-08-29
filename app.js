// === Firebase Config ===
const firebaseConfig = {
  apiKey: "AIzaSyDiegmNAb_60Ecj8jHfxpbcD_Pqv8rndZo",
  authDomain: "maestro-41470.firebaseapp.com",
  projectId: "maestro-41470",
  storageBucket: "maestro-41470.appspot.com",
  messagingSenderId: "471544158937",
  appId: "1:471544158937:web:660cecfcb6b8e27d61fcc8",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// === EmailJS Init ===
emailjs.init("l9Qm9w7_tZOWoJsHv");

// === DOM Elements ===
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const heroCarousel = $("#heroCarousel");
const upcomingEventsGrid = $("#upcomingEventsGrid");
const pastEventsGrid = $("#pastEventsGrid");
const testimonialsCarousel = $("#testimonialsCarousel");
const bookingModal = $("#bookingModal");
const closeModalBtn = $("#closeModal");
const bookBtn = $("#bookBtn");
const modalEventTitle = $("#modalEventTitle");
const clientNameInput = $("#clientName");
const clientEmailInput = $("#clientEmail");
const resourcesContainer = $("#resources-container");
const addResourceBtn = $("#addResourceBtn");
const successModal = $("#successModal");
const closeSuccessModalBtn = $("#closeSuccessModal");
const successMessage = $("#successMessage");
const ratingStars = $$('#ratingSection .stars-form span');
const submitRatingBtn = $('#submitRatingBtn');

let selectedEvent = null;

// --- Sample Data for Seeding ---
const sampleEvents = [
  { name: "LAUTECH Music Night", venue: "Main Auditorium", chairs: 100, projectors: 3, microphones: 5, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?concert,music', date: 'October 25, 2025' },
  { name: "Tech Talk '25", venue: "Conference Room A", chairs: 50, projectors: 1, microphones: 2, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?tech,startup', date: 'November 10, 2025' },
  { name: "Art Exhibition", venue: "Gallery 1", chairs: 30, projectors: 1, microphones: 0, status: 'past', imageUrl: 'https://source.unsplash.com/1600x900/?art,gallery', date: 'September 1, 2025' },
  { name: "Job Fair 2025", venue: "Multi-Purpose Hall", chairs: 200, projectors: 4, microphones: 6, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?job,fair', date: 'November 22, 2025' },
  { name: "Debate Competition", venue: "Lecture Hall 301", chairs: 75, projectors: 2, microphones: 4, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?debate,public-speaking', date: 'December 5, 2025' },
  { name: "Film Screening", venue: "Cinema Hall B", chairs: 80, projectors: 2, microphones: 2, status: 'past', imageUrl: 'https://source.unsplash.com/1600x900/?film,movie', date: 'October 8, 2025' },
  { name: "Sports Day", venue: "Stadium", chairs: 300, projectors: 1, microphones: 8, status: 'past', imageUrl: 'https://source.unsplash.com/1600x900/?sports,day', date: 'September 20, 2025' },
  { name: "Hackathon 2.0", venue: "IT Lab", chairs: 40, projectors: 5, microphones: 5, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?hackathon', date: 'December 15, 2025' },
  { name: "Career Seminar", venue: "Conference Room B", chairs: 60, projectors: 2, microphones: 3, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?career,seminar', date: 'January 10, 2026' },
  { name: "Cultural Festival", venue: "Auditorium", chairs: 150, projectors: 3, microphones: 7, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?cultural,festival', date: 'January 28, 2026' },
  { name: "Science Fair", venue: "Main Quad", chairs: 90, projectors: 2, microphones: 4, status: 'past', imageUrl: 'https://source.unsplash.com/1600x900/?science,fair', date: 'August 18, 2025' },
  { name: "Workshop", venue: "Training Room 1", chairs: 40, projectors: 1, microphones: 2, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?workshop', date: 'February 5, 2026' },
  { name: "Alumni Reunion", venue: "Student Union Hall", chairs: 120, projectors: 3, microphones: 6, status: 'past', imageUrl: 'https://source.unsplash.com/1600x900/?alumni,reunion', date: 'July 15, 2025' },
  { name: "Talent Show", venue: "Auditorium", chairs: 180, projectors: 4, microphones: 8, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?talent,show', date: 'February 20, 2026' },
  { name: "Photography Exhibition", venue: "Art Gallery", chairs: 25, projectors: 1, microphones: 1, status: 'past', imageUrl: 'https://source.unsplash.com/1600x900/?photography,exhibition', date: 'June 10, 2025' },
  { name: "Entrepreneurship Summit", venue: "Hall C", chairs: 80, projectors: 3, microphones: 5, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?entrepreneurship,summit', date: 'March 1, 2026' },
  { name: "Poetry Slam", venue: "Cafe", chairs: 20, projectors: 0, microphones: 2, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?poetry,slam', date: 'March 15, 2026' },
  { name: "Robotics Showcase", venue: "Engineering Lab", chairs: 50, projectors: 2, microphones: 3, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?robotics,showcase', date: 'March 25, 2026' },
  { name: "Fitness Bootcamp", venue: "Sports Complex", chairs: 10, projectors: 1, microphones: 4, status: 'past', imageUrl: 'https://source.unsplash.com/1600x900/?fitness,bootcamp', date: 'August 5, 2025' },
  { name: "Charity Gala", venue: "Grand Ballroom", chairs: 250, projectors: 3, microphones: 7, status: 'upcoming', imageUrl: 'https://source.unsplash.com/1600x900/?charity,gala', date: 'April 10, 2026' }
];

const testimonials = [
  { author: "Jane Doe", text: "The booking process was so smooth and the venue was perfect! MAESTRO is a game-changer for campus events. 💯", stars: 5 },
  { author: "John Smith", text: "I was worried about the projector setup, but the team was incredibly helpful. The service is top-notch.", stars: 5 },
  { author: "Sarah Lee", text: "Using MAESTRO saved our club so much time. The UI is amazing and the floating backgrounds are so cool!", stars: 4 },
  { author: "Mike Ross", text: "A modern, efficient system. I'm impressed by the seamless integration with Firebase. Keep up the great work!", stars: 5 },
  { author: "Alex Green", text: "Effortless booking, transparent availability, and a beautiful interface. Highly recommend MAESTRO!", stars: 5 },
  { author: "Emily White", text: "The resources list made it so easy to get exactly what we needed. A flawless experience from start to finish.", stars: 5 }
];

const bookableResources = [
  'Chairs', 'Projectors', 'Microphones', 'Sound System', 'Stage Lights', 'Whiteboards', 'Extension Cords'
];

// Seed data to Firebase if collections are empty
async function seedData() {
  const eventsSnapshot = await db.collection("events").get();
  if (eventsSnapshot.empty) {
    for (const evt of sampleEvents) {
      await db.collection("events").add(evt);
    }
  }

  const testimonialsSnapshot = await db.collection("testimonials").get();
  if (testimonialsSnapshot.empty) {
    for (const t of testimonials) {
      await db.collection("testimonials").add(t);
    }
  }
}

// === Rendering Functions ===

// Helper to get dominant color from an image
async function getDominantColor(url) {
  try {
    const palette = await Vibrant.from(url).getPalette();
    const dominantColor = palette.Vibrant || palette.DarkVibrant || palette.LightVibrant || palette.Muted;
    if (dominantColor) {
      return `rgb(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b})`;
    }
  } catch (error) {
    console.error("Vibrant.js error:", error);
  }
  return 'rgba(0,0,0,0.8)'; // Fallback color
}

// Render Hero Carousel
async function renderHeroCarousel(events) {
  heroCarousel.innerHTML = "";
  const carouselItemsHTML = events.map(event => {
    return `
      <div class="carousel-item-lg">
        <img src="${event.imageUrl}" alt="${event.name}" class="carousel-item-lg-img">
        <div class="carousel-overlay">
          <div class="carousel-text">
            <h2 class="display-5 fw-bold">${event.name}</h2>
            <p>${event.venue}</p>
            <button class="btn mt-3" onclick="openBooking('${event.id}')">Book Now</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  heroCarousel.innerHTML = carouselItemsHTML + `
    <div class="carousel-controls">
      <button class="carousel-control-btn prev-btn">&lt;</button>
      <button class="carousel-control-btn next-btn">&gt;</button>
    </div>
  `;
  
  const items = $$('.carousel-item-lg');
  const totalItems = items.length;
  let currentItem = 0;
  
  if (totalItems > 0) {
    items[0].classList.add('active');
  }

  const updateCarousel = (index) => {
    items.forEach((item, idx) => {
      item.classList.remove('active');
      if (idx === index) {
        item.classList.add('active');
      }
    });
  };

  const nextSlide = () => {
    currentItem = (currentItem + 1) % totalItems;
    updateCarousel(currentItem);
  };
  
  // Set up event listeners and auto-advance after rendering is complete
  if ($('.prev-btn')) {
    $('.prev-btn').addEventListener('click', () => {
      currentItem = (currentItem - 1 + totalItems) % totalItems;
      updateCarousel(currentItem);
    });
  }

  if ($('.next-btn')) {
    $('.next-btn').addEventListener('click', nextSlide);
  }
  
  // Update the overlay background with dominant color once images are loaded
  events.forEach(async (event, index) => {
    const dominantColor = await getDominantColor(event.imageUrl);
    items[index].querySelector('.carousel-overlay').style.background = `linear-gradient(to top, ${dominantColor} 0%, transparent 100%)`;
  });

  setInterval(nextSlide, 5000);
}

// Render Event Grids
function renderEventsGrid(events, gridElement) {
  gridElement.innerHTML = "";
  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-12";
    card.innerHTML = `
      <div class="card card-event-info h-100" data-id="${event.id}">
        <div class="card-content-img" style="background-image: url('${event.imageUrl}');"></div>
        <h4>${event.name}</h4>
        <p class="text-muted mb-2">${event.venue}</p>
        <div class="mt-auto">
          <span class="soft-accent me-2">Chairs: ${event.chairs}</span>
          <span class="soft-accent">Projectors: ${event.projectors}</span>
        </div>
      </div>
    `;
    card.querySelector('.card').addEventListener('click', () => openBooking(event.id));
    gridElement.appendChild(card);
  });
}

// Render Testimonials Carousel
function renderTestimonials(testimonials) {
  testimonialsCarousel.innerHTML = "";
  testimonials.forEach(t => {
    const card = document.createElement("div");
    card.className = "card p-4";
    const starIcons = '<span>&#9733;</span>'.repeat(t.stars) + '<span>&#9734;</span>'.repeat(5 - t.stars);
    card.innerHTML = `
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-stars">${starIcons}</div>
      <p class="testimonial-author">- ${t.author}</p>
    `;
    testimonialsCarousel.appendChild(card);
  });
  // Duplicate for infinite scroll
  const items = $$('#testimonialsCarousel .card');
  items.forEach(item => {
    testimonialsCarousel.appendChild(item.cloneNode(true));
  });
  testimonialsCarousel.classList.add('testimonials-animation');
}

// Main Load Function
async function loadData() {
  await seedData(); // Ensure data is seeded first
  const eventsSnapshot = await db.collection("events").get();
  const events = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status === 'past');
  
  const testimonialsSnapshot = await db.collection("testimonials").get();
  const testimonials = testimonialsSnapshot.docs.map(doc => doc.data());

  renderHeroCarousel(upcomingEvents.slice(0, 3));
  renderEventsGrid(upcomingEvents, upcomingEventsGrid);
  renderEventsGrid(pastEvents, pastEventsGrid);
  renderTestimonials(testimonials);
}

// === Booking Form Logic ===
async function openBooking(id) {
  const docSnap = await db.collection("events").doc(id).get();
  if (!docSnap.exists) {
    alert("Event not found!");
    return;
  }
  
  selectedEvent = { id: docSnap.id, ...docSnap.data() };
  
  modalEventTitle.innerText = selectedEvent.name;
  resourcesContainer.innerHTML = '';
  addResourceInput('Chairs', selectedEvent.chairs || 0);
  addResourceInput('Projectors', selectedEvent.projectors || 0);
  addResourceInput('Microphones', selectedEvent.microphones || 0);

  bookingModal.classList.add("open");
}

function closeModal() {
  bookingModal.classList.remove("open");
}

function addResourceInput(resourceName, maxCount) {
  const resourceGroup = document.createElement("div");
  resourceGroup.className = "resource-input-group";
  const resourceOptions = bookableResources.map(res => `<option value="${res}">${res}</option>`).join('');
  
  resourceGroup.innerHTML = `
    <select class="form-select resource-name">
      ${resourceOptions}
    </select>
    <input type="number" class="form-control resource-count" min="0" value="0" max="${maxCount}" placeholder="Count">
  `;

  // Set selected option
  const select = resourceGroup.querySelector('select');
  select.value = resourceName;

  resourcesContainer.appendChild(resourceGroup);
}

addResourceBtn.addEventListener('click', () => {
  addResourceInput('Chairs', selectedEvent.chairs || 0); // Default to Chairs for new inputs
});

// Booking submission
bookBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  
  const name = clientNameInput.value;
  const email = clientEmailInput.value;
  if (!name || !email) {
    alert("Please fill in your name and email.");
    return;
  }

  const requestedResources = {};
  let validRequest = true;

  $$('.resource-input-group').forEach(group => {
    const resourceName = group.querySelector('.resource-name').value;
    const count = parseInt(group.querySelector('.resource-count').value);
    
    // Check if the property exists and if the request is valid
    if (count > (selectedEvent[resourceName.toLowerCase()] || 0)) {
      validRequest = false;
    }
    requestedResources[resourceName.toLowerCase()] = count;
  });

  if (!validRequest) {
    alert("Requested resources exceed availability ❌");
    return;
  }

  const originalBtnText = bookBtn.innerHTML;
  bookBtn.disabled = true;
  bookBtn.innerHTML = 'Booking... <span class="spinner"></span>';

  try {
    const docRef = db.collection("events").doc(selectedEvent.id);
    const docSnap = await docRef.get();
    const ev = docSnap.data();
    
    // Deduct resources
    const updatedResources = {};
    for (const res in requestedResources) {
      updatedResources[res] = ev[res] - requestedResources[res];
    }
    await docRef.update(updatedResources);

    // Save booking
    await db.collection("bookings").add({
      eventId: selectedEvent.id, eventName: selectedEvent.name,
      name, email, resources: requestedResources,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Send Email to client
    const emailTemplateParams = {
      to_email: email,
      client_name: name,
      event_name: selectedEvent.name,
      ...requestedResources
    };
    await emailjs.send("service_jn1spxe", "template_nfhduqn", emailTemplateParams);

    closeModal();
    successMessage.innerText = `A confirmation email has been sent to ${email}.`;
    successModal.classList.add('open');
    loadData(); // Reload data to show updated availability
  } catch (err) {
    console.error(err);
    alert("Booking failed ❌");
  } finally {
    bookBtn.disabled = false;
    bookBtn.innerHTML = originalBtnText;
  }
});

closeModalBtn.addEventListener("click", closeModal);
closeSuccessModalBtn.addEventListener("click", () => successModal.classList.remove('open'));

// === Rating Logic ===
let userRating = 0;
ratingStars.forEach(star => {
  star.addEventListener('click', (e) => {
    userRating = e.target.dataset.value;
    ratingStars.forEach(s => s.classList.remove('rated'));
    for (let i = 0; i < userRating; i++) {
      ratingStars[i].classList.add('rated');
    }
  });
});

submitRatingBtn.addEventListener('click', async () => {
  if (userRating === 0) {
    alert("Please select a rating before submitting.");
    return;
  }
  
  try {
    await db.collection("ratings").add({
      rating: parseInt(userRating),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("Thank you for your rating!");
    userRating = 0;
    ratingStars.forEach(s => s.classList.remove('rated'));
  } catch (e) {
    console.error("Error adding rating: ", e);
    alert("Failed to submit rating. Please try again.");
  }
});

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  loadData();
});