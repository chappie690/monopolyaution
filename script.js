// Select DOM elements
const bidButton = document.getElementById('bid-btn');
const bidAmount = document.getElementById('bid-amount');
const timerDisplay = document.getElementById('timer');
const resultDisplay = document.getElementById('result');
const tickSound = document.getElementById('tick-sound'); // Tick-tock sound element
const chingSound = document.getElementById('ching-sound'); // Ching sound element
const propertySelect = document.getElementById('property'); // Select element for property

// Initialize variables
let currentBid = 0; // The starting bid
let timer = 20; // Timer starts at 20 seconds
let interval; // Holds the interval for the timer
let isAuctionStarted = false; // Tracks if the auction has started

// Function to handle bid increment
function updateBid() {
  // Get selected property
  const selectedProperty = propertySelect.value;
  console.log(`Property selected: ${selectedProperty}`); // Debugging: Log selected property

  // Start auction timer only on the first bid
  if (!isAuctionStarted) {
    startTimer();
    isAuctionStarted = true;
  }

  // Increment bid and reset timer
  currentBid += 10;
  bidAmount.textContent = `Current Bid: $${currentBid}`;
  resetTimer();
}

// Function to reset the timer
function resetTimer() {
  clearInterval(interval); // Clear the existing timer
  timer = 20; // Reset to 20 seconds
  timerDisplay.textContent = `Time Remaining: ${timer}s`;
  startTimer(); // Restart the timer
}

// Function to start the countdown timer
function startTimer() {
  // Play the tick-tock sound
  tickSound.play();
  tickSound.loop = true;

  interval = setInterval(() => {
    timer--; // Decrement the timer
    timerDisplay.textContent = `Time Remaining: ${timer}s`; // Update timer display

    // Reset the tick-tock sound without delay
    tickSound.currentTime = 0; // Rewind the sound to the beginning
    tickSound.play(); // Start the sound from the beginning

    // When the timer reaches 0
    if (timer <= 0) {
      clearInterval(interval); // Stop the timer
      stopTickSound(); // Stop the tick-tock sound
      bidButton.disabled = true; // Disable the bid button
      playChingSound(); // Play the ching sound
      resultDisplay.textContent = `Auction Ended! Final Bid: $${currentBid}`; // Show the result
    }
  }, 1000); // Run every second
}

// Function to stop the tick-tock sound
function stopTickSound() {
  tickSound.pause();
  tickSound.currentTime = 0; // Reset sound to the beginning
}

// Function to play the ching sound
function playChingSound() {
  chingSound.play();
}

// Attach event listener to the bid button
bidButton.addEventListener('click', updateBid);
