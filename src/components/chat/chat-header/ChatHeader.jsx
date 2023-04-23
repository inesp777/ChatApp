import React, { useContext } from "react";
import { ChatContext } from "../../index";
import "./ChatHeader.css";

const options = { weekday: 'long', month: 'long', day: 'numeric' };


export default function ChatHeader() {
  const { onClickLogout, user, date } = useContext(ChatContext);

  return (
    <div className="c-header__item">
      <div className="c-header__button__item">
        <button className="c-header__button" onClick={onClickLogout} type="submit">
          LogOut
        </button>
      </div>
      <div className="c-header__greetings__item" >
        <div>
          <p>Welcome <span style={{ color: user.avcolor }}> {user.username}</span>!</p>
        </div>
        <div>
          <p style={{fontSize:"12px"}}> {date.toLocaleDateString('hr-HR', options)} { date.toLocaleTimeString('hr-HR')}</p>
        </div>
      </div>

    </div>
  );
}
