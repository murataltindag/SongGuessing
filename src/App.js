import React, { useState } from 'react';
import YouTube from 'react-youtube';
import './App.css';

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [player, setPlayer] = useState(null);
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started
  const [currentIndex, setCurrentIndex] = useState(0); // New state to track the current index

  const tracks = [
    { id: 'devil_town', title: 'Devil Town', youtubeId: 'KvaxYUfGHnk' },
    { id: 'this_is_home', title: 'This is Home', youtubeId: 'ZM_Gamwxvtc' },
    { id: 'lemon_boy', title: 'Lemon Boy', youtubeId: '-itZVX-SUkI' },
    { id: 'just_add_water', title: 'Just Add Water', youtubeId: '080CFmpeWdM' },
    { id: 'juliet', title: 'Juliet', youtubeId: 'GYsgDprYmIw' },
    { id: 'boys_will_be_bugs', title: 'Boys Will Be Bugs', youtubeId: 'uREGk0fT0GQ' },
    { id: 'advice', title: 'Advice', youtubeId: 'ExfUNHKva3Q' },
    { id: 'self_control', title: 'Self Control', youtubeId: 'ZgUid6ECQkI' },
    { id: 'hug_all_ur_friends', title: 'Hug All Ur Friends', youtubeId: 'F4kcczygOcw' },
    { id: 'home', title: 'Home', youtubeId: '2APLh8_ExU0' },
    { id: 'feb_14', title: 'Feb 14', youtubeId: 'Uan7Ik3QJRM' },
    { id: 'telescope', title: 'Telescope', youtubeId: 'arhVOqG_xZ4' },
    { id: 'things_that_make_it_warm', title: 'Things That Make It Warm', youtubeId: 'gcT0lUoNY4E' },
    { id: 'sweet_tooth', title: 'Sweet Tooth', youtubeId: 'Ypmes7XisTg' },
    { id: 'i_miss_my_mum', title: 'I Miss My Mum', youtubeId: 'pljyPJS_uro' },
    { id: 'smoke_signals', title: 'Smoke Signals', youtubeId: 'zkIX6rux-yI' },
    { id: 'sharpener', title: 'Sharpener', youtubeId: 'omp965oK0p8' },
    //{ id: 'sharpener_calling_me_again', title: 'Sharpener\'s Calling Me Again', youtubeId: 'muQadsSc54U' },
    { id: 'paul', title: 'Paul', youtubeId: 'L3FqTCku6bI' },
    { id: 'ur_gonna_wish_u_believed_me', title: 'Ur Gonna Wish U Believed Me', youtubeId: 'OylaEf0b5XU' },
    { id: 'teenage_dirtbag', title: 'Teenage Dirtbag', youtubeId: 'zPFsM_Kz-Y0' },
    { id: 'squares', title: 'squares', youtubeId: '0gzHz43V3Ck' },
    { id: 'y_13', title: 'y 13', youtubeId: 'ZJUT4T9-jgY' },
    { id: 'fall_in_love_with_a_girl', title: 'Fall in Love with a Girl', youtubeId: 'Uk2jRDvHPbk' },
    { id: 'grocery_store', title: 'Grocery Store', youtubeId: '5VIdYIP4TSM' },
    { id: '1994', title: '1994', youtubeId: 'Kvy25Z8Mq7k' },
    { id: 'frog', title: 'Frog', youtubeId: 'SM84dZTvJvY' },
    { id: 'glacier_meadow', title: 'Glacier Meadow', youtubeId: 'EEb6tgxtB7k' }
  ];

  // Function to get a random track that is not the current one
  const getRandomTrack = () => {
    let nextTrack;
    do {
      nextTrack = tracks[Math.floor(Math.random() * tracks.length)];
    } while (currentTrack && nextTrack.id === currentTrack.id);
    return nextTrack;
  };

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    setCurrentTrack(getRandomTrack());
  };

  // Function to handle the "Give Up" action
  const giveUpAndNext = () => {
    alert(`The correct answer was: ${currentTrack.title}`);
    player.stopVideo();
    setCurrentTrack(getRandomTrack()); // Get a new random track
  };


  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const handleGuessChange = (event) => {
    setUserGuess(event.target.value);
  };

  const checkGuess = (e) => {
    e.preventDefault(); // Prevent the form from actually submitting
    if (userGuess.toLowerCase() === currentTrack.title.toLowerCase()) {
      alert('Correct!');
      player.stopVideo();
      startGame(); // Optionally, start a new game automatically
    } else {
      alert('Sorry, try again!');
    }
  };

  return (
    <div className="App">
      <h1>Cavetown Guessing Game</h1>
      {!gameStarted && <button onClick={startGame}>Start Game</button>}
      {currentTrack && (
        <>
          <YouTube
            videoId={currentTrack.youtubeId}
            opts={opts}
            onReady={onReady}
          />
          <form onSubmit={checkGuess}>
            <input type="text" value={userGuess} onChange={handleGuessChange} />
            <button type="submit">Submit Guess</button>
            <button type="button" onClick={giveUpAndNext}>Give Up</button> {/* New Give Up button */}
          </form>
        </>
      )}
    </div>
  );
}

export default App;
