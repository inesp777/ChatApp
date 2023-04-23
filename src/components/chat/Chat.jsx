import React, { useContext, useEffect, useState } from "react";
import {ChatHeader, ChatMessageList,ChatMemberList, ChatSendMessage, UserContext, ChatContext} from "../index";

import "./Chat.css";

const DEFAULT_ROOM_NAME = "observable-default-room";

export default function Chat() {
  const { user, drone, userLogout, date } = useContext(UserContext);

  const [messageArray, setMessageArray] = useState([]);
  const [membersArray, setMembersArray] = useState([]);

  useEffect(() => {
    if (user) {
      setupRoom(drone);
    }
  }, [user, drone]);

  function setupRoom(scaledrone) {
    scaledrone.on("error", (error) => console.error(error));

    const room = scaledrone.subscribe(DEFAULT_ROOM_NAME);

    room.on("error", (error) => console.error(error));

    room.on("members", function (members) {
      setMembersArray([...members]);
    });

    room.on("member_join", function (member) {
      setMembersArray(function (current) {
        return [...current, member];
      });

      setMessageArray((current) => {
        return [
          ...current,
          {
            message: "has joined the chat!",
            id: Math.random(),
            type: "MEMBER_JOINED",
            user: {
              username: member.clientData.username,
              avcolor: member.clientData.avcolor,
            },
          },
        ];
      });
    });

    room.on("member_leave", function (member) {
      setMembersArray((current) => {
        return current.filter((oneMember) => oneMember.id !== member.id);
      });
      setMessageArray((current) => {
        return [
          ...current,
          {
            message: "has left the chat!",
            id: Math.random(),
            type: "MEMBER_LEFT",
            user: {
              username: member.clientData.username,
              avcolor: member.clientData.avcolor,
            },
          },
        ];
      });
    });

    room.on("message", (message) => {
      setMessageArray((current) => {
        return [
          ...current,
          {
            message: message.data.message,
            id: message.id,
            type: "MESSAGE",
            user: {
              id: message.member.id,
              username: message.member.clientData.username,
              avcolor:message.member.clientData.avcolor,
            },
          },
        ];
      });
    });
  }

  function publishMessage(message) {
    drone.publish({
      room: DEFAULT_ROOM_NAME,
      message: { message },
    });
  }

  function onClickLogout() {
    userLogout();
  }

  return (
    <div className="chat">
      <ChatContext.Provider
        value={{
          publishMessage,
          onClickLogout,
          messageArray,
          membersArray,
          user, date,
        }}
      >
        <div className="chat__header">
          <ChatHeader />
        </div>
        <div className="chat__main">
          <div className="chat__main-item">
            <div className="chat__main-members">
              <ChatMemberList />
            </div>
            <div className="chat__main-messages">
              <ChatMessageList />
            </div>
          </div>
        </div>
        <div className="chat__footer">
          <ChatSendMessage />
        </div>
      </ChatContext.Provider>
    </div>
  );
}
