// Get entries from database to display on page

const getEntries = async function() {
    // fetch entries from server
    const response = await fetch("/entry_api");
    const entries = await response.json();
  
    // sort entries by timestamp in descending order
    entries.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // create HTML elements for each entry
    const logDiv = document.querySelector("#log-div");
    for (const entry of entries) {
      const root = document.createElement("div");
      const dateSpan = document.createElement("span");
      const zipSpan = document.createElement("span");
      const commentSpan = document.createElement("span");
      const citySpan = document.createElement("span");
  
      root.classList.add('log-box');
  
      dateSpan.textContent = new Date(entry.timestamp).toLocaleString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short'
      });
      zipSpan.textContent = `${entry.temp}`;
      commentSpan.textContent = `${entry.comment}`;
      citySpan.textContent = `${entry.city}`;
  
    // create a p element and append the dateSpan, citySpan, commentSpan, and zipSpan to it
    const p = document.createElement("p");
    p.append(dateSpan, document.createElement("br"), commentSpan);
    p.innerHTML += `. The temperature is ${zipSpan.textContent}°C in ${citySpan.textContent}.`;

    // append the p element to the logDiv
    root.append(p);
    logDiv.prepend(root);
    }
  }
  
getEntries();

const getLatestEntry = async function() {
    // fetch entries from server
    const response = await fetch("/entry_api");
    const entries = await response.json();
  
    // sort entries by timestamp in descending order
    entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
    // create HTML elements for the latest entry
    const latestEntry = entries[0];
    const logDiv = document.querySelector("#log-div");
    const root = document.createElement("div");
    const dateDiv = document.createElement("span");
    const zipDiv = document.createElement("span");
    const commentDiv = document.createElement("span");
    const cityDiv = document.createElement("span");
  
    root.classList.add('log-box');
  
    dateDiv.textContent = new Date(latestEntry.timestamp).toLocaleString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short'
      });
    zipDiv.textContent = `${latestEntry.temp}`;
    commentDiv.textContent = `${latestEntry.comment}`;
    cityDiv.textContent = `${latestEntry.city}`;
  
  // create a p element and append the dateDiv, commentDiv, and zipDiv to it
  const p = document.createElement("p");
  p.append(dateDiv, document.createElement("br"), commentDiv);
  p.innerHTML += `. The temperature is ${zipDiv.textContent}°C in ${cityDiv.textContent}.`;

  // append the p element to the logDiv
  root.append(p);
  logDiv.prepend(root);
  }
  

const button = document.querySelector('input[type="submit"]');
button.addEventListener('click', async (event) => {

  event.preventDefault();
  const comment = document.getElementById('comment').value;
  const zip = document.getElementById('zip').value;

// Get the temperature for the entered zip code
  const response = await fetch(`/weather?zip=${zip}`);
  const data = await response.json();
  const temp = data.temperature;
  const city = data.location;

// Create a bundle object with temp and comment

  const bundle = { temp, comment, city };
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(bundle)
  };
  const responseJSON = await fetch('/input_api', options);
  const json = await responseJSON.json();
  console.log(json);

  getLatestEntry();

});

