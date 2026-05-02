// Step 1: Define the createLoginTracker Function (Outer Function)
const createLoginTracker = (userInfo) => {
                  
  // Initialize Login Tracking
  let attemptCount = 0;
  const MAX_ATTEMPTS = 3;

  // Define and Return an Inner Arrow Function
  return (passwordAttempt) => {
    // Increment attemptCount each time it’s called
    attemptCount++;

    // Account Lock Check (Before processing)
    if (attemptCount > MAX_ATTEMPTS) {
      return "Account locked due to too many failed login attempts";
    }

    // Password Check
    if (passwordAttempt === userInfo.password) {
      // Reset attempts if needed, or keep locked if passed 3
      return "Login successful";
    } else {
      // Return message with attempt count
      return `Login failed. Attempt ${attemptCount} of ${MAX_ATTEMPTS}.`;
    }
  };
};

// --- Test and Refine ---

// 1. Initialize for a user
const checkUserLogin = createLoginTracker({
  username: "user1",
  password: "password123"
});

// 2. Test scenarios
console.log(checkUserLogin("wrong1"));   // "Login failed. Attempt 1 of 3."
console.log(checkUserLogin("wrong2"));   // "Login failed. Attempt 2 of 3."
console.log(checkUserLogin("password123")); // "Login successful" (Even on 3rd try)

// 3. Test locking after 3 failed attempts
const checkUserLogin2 = createLoginTracker({
    username: "user2",
    password: "secretPassword"
});

console.log(checkUserLogin2("wrong1")); // "Login failed. Attempt 1 of 3."
console.log(checkUserLogin2("wrong2")); // "Login failed. Attempt 2 of 3."
console.log(checkUserLogin2("wrong3")); // "Login failed. Attempt 3 of 3."
console.log(checkUserLogin2("wrong4")); // "Account locked due to too many failed login attempts"



