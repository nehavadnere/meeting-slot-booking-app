// Configuration
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyp5EyxXV-1vIDUGXvAvhn4BN67eDmkMwktx_NWRQ3DlBXYOPxHkTQR90eas2CeQqVw/exe";
const teams = [
    'Systems Engineering w AI - Systems Engineering w AI', 'tCognition Inc. - Development of XSEED.ai - A Next-Generation Applicant Tracking System (ATS)', 'Tech Diversified - MARS Mobile Addiction Recovery System 1', 'Tech Diversified - MARS Mobile Addiction Recovery System 2', 'The HillMar & Ash Group - Farm Food App', 'The Piper LLC - Development of a Native Android Ride-Sharing App for The Piper LLC', 'The Piper LLC - Development of a Native iOS Ride-Sharing App for The Piper LLC', 'The Sturge-Weber Foundation - The SWF - Warrior University for Lifetime Learning', 'Unboxme - Rules Based Advertising SaaS Product', 'Varsity Media Foundation - Varsity Sports Show app for Android', 'Varsity Media Foundation - Varsity Sports Show app for IOS', 'Varsity Media Foundation - Varsity Sports Show subscription internet channel to view sporting events', 'Vently: Building a Consumer Social Application to Revolutionize the Social Landscape', 'ViB Digital - Enhancing Multi-Sensorial User Experience for Digital Vision Board Applications', 'ViB Digital - Web BuilderPro: Streamlined Website Redesign and Optimization', 'Vizmoo LLC - VR gamified movement therapy web-mobile portal', 'Vloe - AI Avatar and automated chatbot', 'Window Tint Preview App', 'WingSuite', 'WorldME - World ME Streaming', 'Youth Transformation Center - Redesign Website', 'YYC Beeswax - Revamp website/create new website', 'YYC Beeswax - Website Overhaul/Creation and Custom Plugin Development', 'YYC Beeswax - Wordpress Plugins'
];

// Initial time slots (these would typically come from your Google Sheet)
let timeSlots = [
    { id: 1, time: '03/17 11:30 AM - 12:00 PM', teams: [] },
    { id: 2, time: '03/17 12:00 PM - 12:30 PM', teams: [] },
    { id: 3, time: '03/17 12:30 PM - 1:00 PM', teams: [] },
    { id: 4, time: '03/18 11:30 AM - 12:00 PM', teams: [] },
    { id: 5, time: '03/18 12:00 PM - 12:30 PM', teams: [] },
    { id: 6, time: '03/18 12:30 PM - 1:00 PM', teams: [] },
    { id: 7, time: '03/18 4:00 PM - 4:30 PM', teams: [] },
    { id: 8, time: '03/18 4:30 PM - 5:00 PM', teams: [] },
    { id: 9, time: '03/18 5:00 PM - 5:30 PM', teams: [] },
    { id: 10, time: '03/21 11:30 AM - 12:00 PM', teams: [] },
    { id: 11, time: '03/21 12:00 PM - 12:30 PM', teams: [] },
    { id: 12, time: '03/21 12:30 PM - 1:00 PM', teams: [] },
    { id: 13, time: '03/21 1:00 PM - 1:30 PM', teams: [] },
    { id: 14, time: '03/21 1:30 PM - 2:00 PM', teams: [] },
    { id: 15, time: '03/21 2:00 PM - 2:30 PM', teams: [] },
    { id: 16, time: '03/21 2:30 PM - 3:00 PM', teams: [] },
    { id: 17, time: '03/21 3:00 PM - 3:30 PM', teams: [] },
    { id: 18, time: '03/21 3:30 PM - 4:00 PM', teams: [] },
    { id: 19, time: '03/21 4:00 PM - 4:30 PM', teams: [] },
    { id: 20, time: '03/28 11:30 AM - 12:00 PM', teams: [] },
    { id: 21, time: '03/28 12:00 PM - 12:30 PM', teams: [] },
    { id: 22, time: '03/28 12:30 PM - 1:00 PM', teams: [] },
    { id: 23, time: '03/28 1:00 PM - 1:30 PM', teams: [] },
    { id: 24, time: '03/28 1:30 PM - 2:00 PM', teams: [] },
    { id: 25, time: '03/28 2:00 PM - 2:30 PM', teams: [] },
    { id: 26, time: '03/28 2:30 PM - 3:00 PM', teams: [] },
    { id: 27, time: '03/28 3:00 PM - 3:30 PM', teams: [] },
    { id: 28, time: '03/28 3:30 PM - 4:00 PM', teams: [] },
    { id: 29, time: '03/28 4:00 PM - 4:30 PM', teams: [] }
  ];

// DOM Elements
const teamSelect = document.getElementById('team-select');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const timeSlotsContainer = document.getElementById('time-slots-container');
const bookButton = document.getElementById('book-button');
const confirmation = document.getElementById('confirmation');
const confirmTeam = document.getElementById('confirm-team');
const confirmSlot = document.getElementById('confirm-slot');
const confirmEmail = document.getElementById('confirm-email');
const newBookingButton = document.getElementById('new-booking');

// State variables
let selectedTimeSlot = null;
let bookedTeams = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', init);

function init() {
    populateTeamDropdown();
    fetchBookings();
    setupEventListeners();
}

function populateTeamDropdown() {
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        teamSelect.appendChild(option);
    });
}

function fetchBookings() {
    // In a real application, you would fetch the current bookings from Google Sheets
    // For this example, we'll simulate with some pre-booked slots
    fetch(SCRIPT_URL + '?action=getBookings')
        .then(response => response.json())
        .then(data => {
            timeSlots = data.timeSlots;
            bookedTeams = data.bookedTeams;
            renderTimeSlots();
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
            // Fallback to render with default data if fetch fails
            renderTimeSlots();
        });
}

function renderTimeSlots() {
    timeSlotsContainer.innerHTML = '';
    
    timeSlots.forEach(slot => {
        // Only show slots that have less than 2 teams booked
        if (slot.teams.length < 2) {
            const slotElement = document.createElement('div');
            slotElement.classList.add('time-slot');
            slotElement.dataset.id = slot.id;
            
            const timeText = document.createElement('span');
            timeText.textContent = slot.time;
            
            const availability = document.createElement('span');
            availability.classList.add('availability');
            availability.textContent = `${2 - slot.teams.length} slot(s) available`;
            
            slotElement.appendChild(timeText);
            slotElement.appendChild(availability);
            
            slotElement.addEventListener('click', () => selectTimeSlot(slot.id));
            
            timeSlotsContainer.appendChild(slotElement);
        }
    });
}

function selectTimeSlot(slotId) {
    // Clear previous selection
    document.querySelectorAll('.time-slot.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Set new selection
    selectedTimeSlot = slotId;
    document.querySelector(`.time-slot[data-id="${slotId}"]`).classList.add('selected');
}

function setupEventListeners() {
    bookButton.addEventListener('click', handleBooking);
    newBookingButton.addEventListener('click', resetForm);
    emailInput.addEventListener('input', validateEmail);
}

function validateEmail() {
    const email = emailInput.value.trim();
    const isASUEmail = email.endsWith('@asu.edu');
    
    if (email && !isASUEmail) {
        emailError.textContent = 'Please enter a valid ASU email address (@asu.edu)';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function handleBooking() {
    const teamName = teamSelect.value;
    const email = emailInput.value.trim();
    
    // Validate inputs
    if (!teamName) {
        alert('Please select your team.');
        return;
    }
    
    if (!email || !validateEmail()) {
        alert('Please enter a valid ASU email address.');
        return;
    }
    
    if (!selectedTimeSlot) {
        alert('Please select a time slot.');
        return;
    }
    
    // Check if team has already booked a slot
    if (bookedTeams.includes(teamName)) {
        alert('Your team has already booked a slot.');
        return;
    }
    
    // Find the selected time slot
    const slot = timeSlots.find(s => s.id === selectedTimeSlot);
    
    // Submit booking to Google Sheets
    submitBooking(teamName, email, slot);
}

function submitBooking(teamName, email, slot) {
    const bookingData = {
        action: 'bookSlot',
        teamName: teamName,
        email: email,
        slotId: slot.id,
        slotTime: slot.time,
        bookingDateTime: new Date().toISOString()
    };
    
    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showConfirmation(teamName, slot.time, email);
            // Update local data
            slot.teams.push(teamName);
            bookedTeams.push(teamName);
        } else {
            alert('Booking failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error submitting booking:', error);
        alert('An error occurred while booking. Please try again.');
    });
}

function showConfirmation(team, time, email) {
    document.querySelector('.booking-form').classList.add('hidden');
    confirmation.classList.remove('hidden');
    
    confirmTeam.textContent = team;
    confirmSlot.textContent = time;
    confirmEmail.textContent = email;
}

function resetForm() {
    // Reset form fields
    teamSelect.value = '';
    emailInput.value = '';
    emailError.textContent = '';
    selectedTimeSlot = null;
    
    // Update UI
    document.querySelectorAll('.time-slot.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    document.querySelector('.booking-form').classList.remove('hidden');
    confirmation.classList.add('hidden');
    
    // Refresh bookings
    fetchBookings();
}

