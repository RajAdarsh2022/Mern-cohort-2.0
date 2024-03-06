let count = 0;

function incrementCounter() {
  count++;
  console.log("Counter:", count);
  setTimeout(incrementCounter, 1000); // Call incrementCounter() again after 1 second
}

// Start the counter
incrementCounter();
