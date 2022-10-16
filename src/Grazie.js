import styles from './Grazie.module.css';
import { useEffect, useState } from 'react';

const timerDelay = 5;

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const happyFace = (
  <svg
    className={styles.happyFace}
    xmlns="http://www.w3.org/2000/svg"
    height="48"
    width="48"
  >
    <path d="M31.3 21.35q1.15 0 1.925-.775Q34 19.8 34 18.65t-.775-1.925q-.775-.775-1.925-.775t-1.925.775q-.775.775-.775 1.925t.775 1.925q.775.775 1.925.775Zm-14.6 0q1.15 0 1.925-.775.775-.775.775-1.925t-.775-1.925q-.775-.775-1.925-.775t-1.925.775Q14 17.5 14 18.65t.775 1.925q.775.775 1.925.775Zm7.3 13.6q2.85 0 5.3-1.3 2.45-1.3 3.9-3.55.4-.6.1-1.175-.3-.575-1-.575-.3 0-.65.2-.35.2-.55.45-1.2 1.7-3.075 2.6-1.875.9-3.975.9-2.15 0-4.05-.875t-3.05-2.575q-.2-.3-.525-.5t-.675-.2q-.65 0-.975.575-.325.575.175 1.325 1.35 2.1 3.775 3.4 2.425 1.3 5.275 1.3ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-20Zm0 17q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Z" />
  </svg>
);

const sadFace = (
  <svg
    className={styles.sadFace}
    xmlns="http://www.w3.org/2000/svg"
    height="48"
    width="48"
  >
    <path d="M31.3 21.35q1.15 0 1.925-.775Q34 19.8 34 18.65t-.775-1.925q-.775-.775-1.925-.775t-1.925.775q-.775.775-.775 1.925t.775 1.925q.775.775 1.925.775Zm-14.6 0q1.15 0 1.925-.775.775-.775.775-1.925t-.775-1.925q-.775-.775-1.925-.775t-1.925.775Q14 17.5 14 18.65t.775 1.925q.775.775 1.925.775ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-20Zm0 17q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm-8.25-7.25q.35 0 .675-.2.325-.2.525-.5 1.15-1.7 3.05-2.575 1.9-.875 4.05-.875 2.1 0 3.975.9t3.075 2.6q.2.25.55.45.35.2.65.2.7 0 1-.575.3-.575-.1-1.175-1.45-2.25-3.9-3.55-2.45-1.3-5.3-1.3-2.85 0-5.275 1.275Q16.3 29.7 14.95 31.8q-.5.75-.175 1.35.325.6.975.6Z" />
  </svg>
);

const sadFaceSmall = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
    <path d="M15.5 11q.65 0 1.075-.425Q17 10.15 17 9.5q0-.65-.425-1.075Q16.15 8 15.5 8q-.65 0-1.075.425Q14 8.85 14 9.5q0 .65.425 1.075Q14.85 11 15.5 11Zm-7 0q.65 0 1.075-.425Q10 10.15 10 9.5q0-.65-.425-1.075Q9.15 8 8.5 8q-.65 0-1.075.425Q7 8.85 7 9.5q0 .65.425 1.075Q7.85 11 8.5 11ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Zm-3.875-3q.175 0 .363-.1.187-.1.287-.25.55-.75 1.375-1.2Q10.975 15 12 15q1.025 0 1.85.45.825.45 1.375 1.2.1.15.275.25.175.1.35.1.45 0 .663-.4.212-.4-.088-.85-.65-.975-1.825-1.613-1.175-.637-2.6-.637t-2.6.637q-1.175.638-1.85 1.663-.275.425-.062.813.212.387.637.387Z" />
  </svg>
);

const backArrow = (
  <svg
    className={styles.backArrow}
    xmlns="http://www.w3.org/2000/svg"
    height="48"
    width="48"
  >
    <path d="m22.35 38.95-13.9-13.9q-.25-.25-.35-.5Q8 24.3 8 24q0-.3.1-.55.1-.25.35-.5L22.4 9q.4-.4 1-.4t1.05.45q.45.45.45 1.05 0 .6-.45 1.05L13.1 22.5h24.8q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075-.425.425-1.075.425H13.1l11.4 11.4q.4.4.4 1t-.45 1.05q-.45.45-1.05.45-.6 0-1.05-.45Z" />
  </svg>
);

const getStoredGrazies = () => {
  if (localStorage.getItem('grazies') === null) {
    localStorage.setItem('grazies', JSON.stringify([]));
  }
  const storedGrazies = JSON.parse(localStorage.getItem('grazies'));
  return storedGrazies;
};

const setStoredGrazies = (newGrazies) => {
  localStorage.setItem('grazies', JSON.stringify(newGrazies));
};

const Grazie = () => {
  const [todayDate, setTodayDate] = useState();
  const [happyMode, setHappyMode] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gratefuls, setGratefuls] = useState([]);
  const [showAllGratefuls, setShowAllGratefuls] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [enough, setEnough] = useState(false);
  const [randomG, setRandomG] = useState({ date: '', message: '' });

  useEffect(() => {
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setTodayDate(date);
  }, []);

  useEffect(() => {
    const allGrazies = getStoredGrazies();
    setGratefuls(allGrazies);
    if (gratefuls.length > 4) {
      setEnough(true);
      console.log('Enough gratefuls!');
    } else {
      // setHappyMode(true);
      return;
    }
  }, [gratefuls.length]);

  useEffect(() => {
    let toastTimer = setTimeout(() => setShowToast(false), timerDelay * 1000);
    return () => { clearTimeout(toastTimer); }
  }, [gratefuls]);

  //   useEffect(() => {
  //     timer = toastTimer =
  //     const myTimeout = setTimeout(myGreeting, 5000);

  // function myStopFunction() {
  //   clearTimeout(myTimeout);
  // }
  //     setShowToast(true);

  //     setShowToast(false);
  //     clearTimeout(timer);
  //   }, []);

  const showToastHandler = () => {
    scrollToTop();
    setShowToast(true);
  };

  const hideToastHandler = () => {
    setShowToast(false);
  };

  const beGratefulHandler = (event) => {
    event.preventDefault();
    const newGratitude = { date: todayDate, message: inputValue };
    console.log({ date: todayDate, message: inputValue });
    const newGrates = gratefuls;
    newGrates.push(newGratitude);
    setGratefuls((prevValue) => newGrates);
    setStoredGrazies(newGrates);
    console.log(gratefuls);
    setHappyMode(null);
    setInputValue('');
    showToastHandler();
  };

  const getRandomGrateful = () => {
    const random = gratefuls[Math.floor(Math.random() * gratefuls.length)];
    setRandomG(random);
    setHappyMode(false);
  };

  return (
    <div className={styles.grazie}>
      <h1 onClick={() => setHappyMode(null)}>Welcome to Graz!e</h1>
      <p className={styles.date}>{`It's ${todayDate}`}</p>
      {happyMode === null && (
        <p className={styles.howAreYouFeeling}>How are you feeling?</p>
      )}
      {happyMode === false && <hr />}
      {happyMode === false && (
        <div className={styles.imSorry}>
          <p className={styles.imSorryToHear}>
            I'm sorry to hear you're feeling{' '}
          </p>
          <span className={styles.smallSad}>{sadFaceSmall}</span>
        </div>
      )}
      {happyMode === null && (
        <div className={styles.emojiBtns}>
          <button
            className={styles.emojiBtn}
            onClick={() => {
              setHappyMode(true);
            }}
          >
            {happyFace}
          </button>
          {enough && (
            <button
              className={styles.emojiBtn}
              onClick={() => {
                getRandomGrateful();
              }}
            >
              {sadFace}
            </button>
          )}
        </div>
      )}
      {happyMode === true && (
        <form onSubmit={beGratefulHandler}>
          <div className={styles.emojiBtns}>
            <button
              className={styles.emojiBtnSelected}
              onClick={() => {
                console.log(null);
              }}
            >
              {happyFace}
            </button>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="entry">What are you grateful for today?</label>
            <input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              type="text"
              className={styles.formControl}
              id="entry"
              aria-describedby="entryMsg"
              placeholder=""
            />
          </div>
          <button className={styles.submitBtn} type="submit">
            Be Grateful
          </button>
        </form>
      )}
      {happyMode === false && (
        <div className={styles.sadMode}>
          <p className={styles.reminder}>
            As a reminder that momentary feelings of worry and doubt will pass,
            and that all days have the potential to be great...
          </p>
          {/* <hr /> */}
          <div className={styles.messageContainer}>
            <p className={styles.message}>{`On ${randomG.date}, you said:`}</p>
            <p className={styles.message}>
              <b>{`"${randomG.message}"`}</b>
            </p>
          </div>
          {/* <hr /> */}
          <p className={styles.letsFind}>
            Let's find something to be grateful for today and{' '}
            <span className={styles.link} onClick={() => setHappyMode(true)}>
              awknowledge it now.
            </span>{' '}
            {/* it for later. */}
          </p>
        </div>
      )}
      {/* {!showAllGratefuls === true && <p className={styles.viewAllLink} onClick={() => setShowAllGratefuls(true)}>View all my Graz!es</p>}
      {showAllGratefuls === true && <div className={styles.allGratefuls}><ul>{gratefuls.map(g => <li key={g.date}><p>{g.date}</p><p>{g.message}</p></li>)}</ul></div>} */}
      {/* <div className={styles.aboutSection}>
      {!showAbout === true && <p className={styles.aboutLink} onClick={() => setShowAbout(true)}>Learn more about Graz!e</p>}
      {showAbout === true && <div className={styles.aboutText}><p>Graz!e - a play on the Italian word for <em>thanks</em> - is a simple app that lets you enter small phrases of joy & gratitude - daily or just when you have moments of awareness. These records of joy & appreciation are then available to you on days when a small reminder of those wonderful things can help you get past and onto the next great day.</p><p>How it works: Tap the happy face to create an entry on days when you are feeling happy & appreciative. Tap the sad face on those other days.</p>
      <p>Note: You need 5 great days before you can tap the sad face.</p><p className={styles.closeLink} onClick={() => setShowAbout(false)}>Close</p></div>}
      </div> */}
      {showToast && (
        <div className={styles.confirmationToast}>
          <p>Your entry has been received.</p>
          <p>Keep tracking these moments.</p>
          <p>They're all around you!</p>
        </div>
      )}
    </div>
  );
};

export default Grazie;
