const app = () => {
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline path");
  const song = document.querySelector(".song");
  const bgImage = document.querySelector("#playerContainer");
  const waterfall = document.getElementById("waterfallBtn");
  const stream = document.getElementById("streamBtn");
  const night = document.getElementById("nightBtn");
  const space = document.getElementById("spaceBtn");

  //Sounds
  const sounds = document.querySelectorAll(".sound-selection button");
  //   Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-selection button");
  //   Get the length of the outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);
  //   Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      checkPlaying(song);
    });
  });

  // Play Sounds
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //   Select Sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  // Function to stop and play sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      play.src = "./components/pause-icon.svg";
    } else {
      song.pause();
      play.src = "./components/play-button-svgrepo-com.svg";
    }
  };

  // Change background image of player depending on which sound is playing

  waterfall.addEventListener("click", () => {
    bgImage.style.backgroundImage =
      "url('./images/vecteezy_print-beauty-waterfall-nature-vector_11726031.jpg')";
  });

  stream.addEventListener("click", () => {
    bgImage.style.backgroundImage = "url('./images/cupg_g4j8_150407.jpg')";
  });

  night.addEventListener("click", () => {
    bgImage.style.backgroundImage = "url('./images/h9no_ulmv_180727.jpg')";
  });

  space.addEventListener("click", () => {
    bgImage.style.backgroundImage =
      "url('./images/vecteezy_space-landscape-in-purple-tones-nature-on-another-planet_5389414.jpg')";
  });

  //   Animate the timer
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // seconds = seconds < 10 ? "0" + seconds : seconds;

    // Animate circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./components/play-button-svgrepo-com.svg";
    }
  };
};

app();
