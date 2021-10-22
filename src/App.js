import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [notificationText, set] = useState('');

  const sendTheNotification = () => {
    const options = {
      body: 'You earned 100 Wine IQ points.',
      icon: 'https://pngimg.com/uploads/cocktail/cocktail_PNG80.png',
      vibrate: [200, 100, 200],
    };
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      var notification = new Notification(notificationText, options);
      set('');
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          var notification = new Notification(notificationText, options);
          set('');
        }
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input
          name="notification"
          type="text"
          value={notificationText}
          onChange={(e) => set(e.target.value)}
        />
        <button onClick={() => sendTheNotification()}>
          Send the notification
        </button>
      </header>
    </div>
  );
}

export default App;
