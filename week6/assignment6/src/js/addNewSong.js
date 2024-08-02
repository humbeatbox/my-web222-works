document.getElementById("add-song-video").addEventListener("click", function () {
  const container = document.getElementById("songs-videos-container");

  const eachDiv = document.createElement("div");
  eachDiv.className = "song-video-group"; // ensure class name is correct

  // create input element
  const input = document.createElement("input");
  input.type = "url";
  input.name = "songs_videos[]";
  //for each input, set the same id but can be identified
  input.id = `songs-videos-${container.children.length + 1}`;
  input.placeholder = "https://example.com/song";

  // create label element
  const label = document.createElement("label");
  //for each label, set the same id but can be identified
  label.htmlFor = `explicit-lyrics-${container.children.length + 1}`;
  label.className = "checkbox-container";
  label.textContent = "Explicit Lyrics";

  // create checkbox element
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  //for each checkbox, set the same id but can be identified
  checkbox.id = `explicit-lyrics-${container.children.length + 1}`;
  checkbox.name = "explicit_lyrics[]";
  checkbox.tabIndex = 5;

  // insert elements
  eachDiv.appendChild(input);
  eachDiv.appendChild(label);
  eachDiv.appendChild(checkbox);

  container.appendChild(eachDiv);
});

// Form submission handler
document.getElementById("songForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const container = document.getElementById("songs-videos-container");
  const songData = [];

  const groups = container.getElementsByClassName("song-video-group");
  for (let i = 0; i < groups.length; i++) {
    const urlInput = groups[i].querySelector('input[type="url"]');
    const checkboxInput = groups[i].querySelector('input[type="checkbox"]');

    const song = {
      url: urlInput.value,
      explicit: checkboxInput.checked
    };
    songData.push(song);
  }

  // Create a hidden input to submit JSON string
  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "songData"; // Name for the JSON data
  hiddenInput.value = JSON.stringify(songData);

  // Append hidden input to the form
  this.appendChild(hiddenInput);

  // Submit the form
  this.submit();
});
