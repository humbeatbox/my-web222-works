/**
 * WEB222 – Assignment 04
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
 *      Date:       June 28,2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
//console.log({ artists, songs }, "App Data");

//load the event while the DOMLoad
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("#menu");
  const selectedArtistTitle = document.querySelector("#selected-artist");
  const songsTableBody = document.querySelector("#songs");

  //use the ID to list the song
  function showSongsForArtist(artistId) {
    //find out array for singer
    const artist = artists.find((a) => a.artistId === artistId); //if true return the artistID object
    selectedArtistTitle.textContent = artist.name;

    const leftB = document.createElement("span");
    leftB.textContent = "(";
    const rightB = document.createElement("span");
    rightB.textContent = ")";
    selectedArtistTitle.appendChild(leftB);
    artist.urls.forEach((url, index, arr) => {
      console.log(url.name);
      const selectedArtistInfo = document.createElement("a");
      //let the last link without the comma
      if (index === arr.length - 1) {
        selectedArtistInfo.textContent = url.name;
      } else {
        selectedArtistInfo.textContent = `${url.name},`;
      }
      selectedArtistInfo.href = url.url;
      selectedArtistInfo.target = "_blank";
      selectedArtistTitle.appendChild(selectedArtistInfo);
    });
    selectedArtistTitle.appendChild(rightB);
    //clear
    songsTableBody.innerHTML = "";
    //check the explicit list
    const filteredSongs = songs.filter(
      (song) => song.artistId === artistId && song.explicit === false
    );

    //add the title
    const titleName = ["Song Name", "Year", "Duration"];
    titleName.forEach((e) => {
      const title = document.createElement("th");
      title.textContent = `${e}`;
      songsTableBody.appendChild(title);
    });

    filteredSongs.forEach((song) => {
      const row = document.createElement("tr");
      row.addEventListener("click", () => console.log(song));

      //add the song
      const titleCell = document.createElement("td");
      const titleLink = document.createElement("a");
      titleLink.href = song.url;
      titleLink.target = "_blank";
      titleLink.textContent = song.title;
      titleCell.appendChild(titleLink);

      //add year of song
      const yearCell = document.createElement("td");
      yearCell.textContent = song.year;

      //transform the time type and add it
      const durationCell = document.createElement("td");
      const minutes = Math.floor(song.duration / 60);
      const seconds = song.duration % 60;
      durationCell.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      row.appendChild(titleCell);
      row.appendChild(yearCell);
      row.appendChild(durationCell);

      songsTableBody.appendChild(row);
    });
  }

  //when load it will create a button
  artists.forEach((artist) => {
    const button = document.createElement("button");
    button.textContent = artist.name;
    button.id = artist.artistId;
    menu.appendChild(button);

    //when click call show song by the artistID
    button.addEventListener("click", () => showSongsForArtist(artist.artistId));
  });

  //by default, for show the first singer and song when load
  if (artists.length > 0) {
    showSongsForArtist(artists[0].artistId);
  }
});
