
const form          = document.getElementById("checkInForm");
const nameInput     = document.getElementById("attendeeName");
const teamSelect    = document.getElementById("teamSelect");
const greeting      = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar   = document.getElementById("progressBar");
 
// Team count display elements
const waterCount    = document.getElementById("waterCount");
const zeroCount     = document.getElementById("zeroCount");
const powerCount    = document.getElementById("powerCount");
 
// Team member list elements (the <ul> tags inside each team card)
const waterList     = document.getElementById("waterList");
const zeroList      = document.getElementById("zeroList");
const powerList     = document.getElementById("powerList");
 
// ── 2. SET UP STARTING DATA ──────────────────────────────────
// These variables track numbers as attendees check in.
// We'll add 1 to them each time someone checks in.
 
let totalAttendees = 0;   // everyone
let waterAttendees = 0;   // Team Water Wise
let zeroAttendees  = 0;   // Team Net Zero
let powerAttendees = 0;   // Team Renewables
 
const ATTENDANCE_GOAL = 50;   // the target we're working toward
 
// ── 3. TEAM DISPLAY NAMES ────────────────────────────────────
// A plain object that maps the <select> value ("water", "zero", "power")
// to a human-readable name we can put in the greeting message.
 
const teamNames = {
  water: "Team Water Wise 🌊",
  zero:  "Team Net Zero 🌿",
  power: "Team Renewables ⚡"
};
 
// ── HELPER: ADD A NAME TO A TEAM'S MEMBER LIST ──────────────
// This function takes a <ul> element and a name string.
// It creates a new <li>, puts the name inside it, and appends
// it to the list. We call it once per check-in for the right team.
 
function addMemberToList(listElement, memberName) {
  const li = document.createElement("li");   // create a new <li> tag
  li.textContent = memberName;               // set its text to the name
  listElement.appendChild(li);              // add it to the bottom of the list
}
 
// ── 4. LISTEN FOR THE FORM SUBMISSION ───────────────────────
// "submit" fires when the user clicks "Check In" (or presses Enter).
// event.preventDefault() stops the page from reloading — the default
// browser behavior for forms.
 
form.addEventListener("submit", function (event) {
  event.preventDefault();   // keep everything on one page
 
  // Read the current value of the name input and trim extra spaces.
  const name = nameInput.value.trim();
 
  // Read which team option is selected.
  const team = teamSelect.value;
 
  // Safety check: if somehow both are empty, do nothing.
  if (!name || !team) return;
 
  // ── 5. UPDATE TOTAL COUNT ──────────────────────────────────
  totalAttendees = totalAttendees + 1;   // add 1 for the new attendee
  attendeeCount.textContent = totalAttendees;   // show the new number
 
  // ── 6. UPDATE THE CORRECT TEAM COUNT ──────────────────────
  // We use an if/else chain to decide which team variable to update
  // based on the value selected in the dropdown.
 
  if (team === "water") {
    waterAttendees = waterAttendees + 1;
    waterCount.textContent = waterAttendees;
    addMemberToList(waterList, name);
 
  } else if (team === "zero") {
    zeroAttendees = zeroAttendees + 1;
    zeroCount.textContent = zeroAttendees;
    addMemberToList(zeroList, name);
 
  } else if (team === "power") {
    powerAttendees = powerAttendees + 1;
    powerCount.textContent = powerAttendees;
    addMemberToList(powerList, name);
  }
 
  // ── 7. UPDATE THE PROGRESS BAR ────────────────────────────
  // Calculate what percentage of the goal we've reached,
  // then set the bar's width to that percentage.
  // Math.min makes sure we never go above 100%.
 
  const percentage = (totalAttendees / ATTENDANCE_GOAL) * 100;
  const cappedPercent = Math.min(percentage, 100);   // cap at 100%
  progressBar.style.width = cappedPercent + "%";
 
  // ── 8. SHOW THE GREETING MESSAGE ──────────────────────────
  // Build the message string using the name and team the user entered.
 
  const teamDisplayName = teamNames[team];   // look up the friendly name
 
  greeting.textContent = "Welcome, " + name + "! You're checked in for " + teamDisplayName + ". Glad you're here!";
 
  // Make the greeting visible (it starts hidden in the CSS).
  greeting.style.display = "block";
  greeting.className = "success-message";   // apply the blue styling
 
  // ── 9. RESET THE FORM ─────────────────────────────────────
  // Clear the input and dropdown so the next person can check in.
 
  nameInput.value  = "";
  teamSelect.value = "";
 
  // Put the cursor back in the name field automatically.
  nameInput.focus();
});