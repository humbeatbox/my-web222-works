/**
 * WEB222 – Assignment 05
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Hsiao-Kang Chang
 *      Student ID: 120049234
 *      Date:       July 11,2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
//console.log({ artists, songs }, "App Data");

//return artist array
function getArtistById(artists, artistId, targetElement) {
  const artist = artists.find((a) => a.artistId === artistId);
  if (artist) {
    targetElement.textContent = artist.name;
  } else {
    console.warn(`Artist not found: ${artistId}`);
  }
  return artist;
}
//check the explicit list
function filterExplicitSongs(songs, artistId) {
  return songs.filter((song) => song.artistId === artistId && song.explicit === false);
}
//clear the target element
function clearTarget(targetElement) {
  //choose the target element, if it exists in the DOM
  const element =
    typeof targetElement === "string" ? document.querySelector(targetElement) : targetElement;
  // if the element is existing then cleanup
  if (element) {
    element.innerHTML = "";
  } else {
    console.warn(`Element not found: ${targetElement}`);
  }
}
//add the ddArtistLinks
function addArtistLinks(artist, targetElement) {
  const leftB = document.createElement("span");
  leftB.textContent = "(";
  const rightB = document.createElement("span");
  rightB.textContent = ")";
  targetElement.appendChild(leftB);

  artist.urls.forEach((url, index, arr) => {
    const selectedArtistInfo = document.createElement("a");
    selectedArtistInfo.textContent = index === arr.length - 1 ? url.name : `${url.name},`;
    selectedArtistInfo.href = url.url;
    selectedArtistInfo.target = "_blank";
    targetElement.appendChild(selectedArtistInfo);
  });

  targetElement.appendChild(rightB);
}
//create Tile function
function createTitle(songsTableTitle) {
  const titleName = ["Song Name", "Year", "Duration"];
  const row = document.createElement("tr");
  titleName.forEach((e) => {
    const title = document.createElement("th");
    title.textContent = e;
    row.appendChild(title);
  });
  songsTableTitle.appendChild(row);
}

//create card
function createSongCard(song) {
  // Create a <div> to hold the card
  const card = document.createElement("div");
  // Add the .card class to the <div>
  card.classList.add("card");
  // Set the data-url attribute
  card.setAttribute("data-url", song.url);

  // Create a song image, use the .card-image class
  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.alt = song.title;
  songImg.classList.add("card-image");
  card.appendChild(songImg);

  // Create a <div> to hold the card details
  const cardDetails = document.createElement("div");
  cardDetails.classList.add("card__details");
  card.appendChild(cardDetails);

  // Create the song title, use the .songTitleTag class
  const songTitle = document.createElement("div");
  songTitle.textContent = song.title;
  songTitle.classList.add("songTitleTag");
  cardDetails.appendChild(songTitle);

  // Create the song year, use the .yearTag class
  const songYear = document.createElement("div");
  songYear.textContent = song.year;
  songYear.classList.add("yearTag");
  cardDetails.appendChild(songYear);

  // Create the song duration, use the .durationTag class
  const songDuration = document.createElement("div");
  const minutes = Math.floor(song.duration / 60);
  const seconds = song.duration % 60;
  songDuration.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  songDuration.classList.add("durationTag");
  cardDetails.appendChild(songDuration);

  // Add a click event listener to the card to open the song URL in a new tab
  card.addEventListener("click", () => {
    window.open(card.getAttribute("data-url"), "_blank");
  });

  // Return the card’s <div> element to the caller
  return card;
}
//load the event while the DOMLoad
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("#menu");
  const selectedArtistTitle = document.querySelector("#selected-artist");
  const songsTableBody = document.querySelector("#songs");
  const songsTableTitle = document.querySelector("#songsTitle");
  const selectedContainer = document.querySelector("#container");
  //use the ID to list the song
  function showSongsForArtist(artistId) {
    //find out array for singer
    const artist = getArtistById(artists, artistId, selectedArtistTitle);

    //add the Artist info link
    addArtistLinks(artist, selectedArtistTitle);

    //check the explicit list
    const filteredSongs = filterExplicitSongs(songs, artistId);

    //add the title
    //clearTarget(songsTableTitle);
    //createTitle(songsTableTitle);

    //clear and generate a new one
    clearTarget(songsTableBody);
    // filteredSongs.forEach((song) => {
    //   const row = document.createElement("tr");
    //   row.addEventListener("click", () => console.log(song));

    //   //add the song
    //   const titleCell = document.createElement("td");
    //   const titleLink = document.createElement("a");
    //   titleLink.href = song.url;
    //   titleLink.target = "_blank";
    //   titleLink.textContent = song.title;
    //   titleCell.appendChild(titleLink);

    //   //add year of song
    //   const yearCell = document.createElement("td");
    //   yearCell.textContent = song.year;

    //   //transform the time type and add it
    //   const durationCell = document.createElement("td");
    //   const minutes = Math.floor(song.duration / 60);
    //   const seconds = song.duration % 60;
    //   durationCell.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    //   row.appendChild(titleCell);
    //   row.appendChild(yearCell);
    //   row.appendChild(durationCell);

    //   songsTableBody.appendChild(row);
    // });
    clearTarget(selectedContainer);
    filteredSongs.forEach((song) => {
      const songCard = createSongCard(song);
      selectedContainer.appendChild(songCard);
    });
  }

  //create button and call the
  function createBtn(artists, menu) {
    artists.forEach((artist) => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.id = artist.artistId;
      menu.appendChild(button);

      //when click call show song by the artistID
      button.addEventListener("click", () => showSongsForArtist(artist.artistId));
    });
  }
  //when load it will create a button
  createBtn(artists, menu);
  //by default, for show the first singer and song when load
  if (artists.length > 0) {
    showSongsForArtist(artists[0].artistId);
  }
});
