// Grab elements
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable button as long as the joke is being told
function toggleBtn() {
  button.disabled = !button.disabled;
}

// Pass jokes to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: '13b1907f88e84aea90e679ab3da886a2',
    src: joke,
    hl: 'en-gb',
    v: 'Lily',
    r: -1, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get jokes from API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Dark?blacklistFlags=nsfw,religious,racist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
      } else {
      joke = data.joke;
      }
    // Text-to-speech
    tellMe(joke);
    // Disable button
    toggleBtn();
  } catch (error) {
    // Catch error here
    console.log('Whoops!', error);
  }
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleBtn);