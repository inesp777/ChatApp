import "./App.css";
import React, { useState } from 'react';
import { Chat, Login, UserContext } from './components/index';
import { randomColor } from './Utility/Utility';

/*Scaledron channel ID*/
const CHANNEL_ID = "dZNk6g5tSDui82co";


export default function App() {
  const [user, setUser] = useState("");
  const [drone, setDrone] = useState(null);
  const [date, setDate] = useState(null);

  function onUserLogin(username) {
    if (username) {
      const avcolor = randomColor();
      const drone = new window.Scaledrone(CHANNEL_ID, {
        data: { username, avcolor },
      });
      drone.on("open", () => {
        setDrone(drone);
        setUser({ id: drone.clientId, username, avcolor });
      });
      setDate(new Date());
    }
  }

  function userLogout() {
    drone.close();
    setDrone(null);
    setUser(null);
  }

  return (
    <>
      <UserContext.Provider value={{ user, drone, onUserLogin, userLogout, date }}>
        {!user && <Login />}
        {user && <Chat />}
      </UserContext.Provider>
    </>
  );
}