// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS
const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// 2. RAW TEXT STRINGS
let storyText =
  "It was a hot day, so :insertx: went to the store. When they got there, they saw :inserty:. Bob was so surprised that he :insertz: while wearing 300 pounds of weight and experiencing 94 fahrenheit temperature.";

let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["a giant lollipop", "an enormous ice cream", "a tiny egg"];
let insertZ = ["suddenly danced", "quickly ran", "crazily jumped"];

// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION
randomize.addEventListener("click", result);

function result() {
// Create a fresh copy of the story each time
  let newStory = storyText;
  
// Select random values from each array
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

// Replace the placeholders with the random values. The regular expression with the /g flag replaces all instances.
  newStory = newStory.replace(/:insertx:/g, xItem);
  newStory = newStory.replace(/:inserty:/g, yItem);
  newStory = newStory.replace(/:insertz:/g, zItem);

// Replace 'Bob' with the custom name if provided
  if (customName.value !== "") {
    newStory = newStory.replace("Bob", customName.value);
  }

// Check if UK radio button is selected to convert units
  if (document.getElementById("uk").checked) {
// Convert 300 pounds to stones (1 stone = 14 pounds)
    const weight = Math.round(300 / 14) + " stone";
// Convert 94°F to centigrade using the formula (F - 32) * 5/9
    const temperature = Math.round((94 - 32) * (5 / 9)) + " centigrade";
// Replace the US values with the converted UK values
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 fahrenheit", temperature);
  }

// Display the final story in the <p> element
  story.textContent = newStory;
}
