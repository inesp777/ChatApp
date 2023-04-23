import React, { useContext, useEffect, useRef } from "react";
import { ChatContext, UserContext } from "../../index";

export default function ChatMessageList() {
  const { messageArray } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const bottomRef = useRef();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [messageArray]);

  function showMessage(msg) {
    switch (msg.type) {

      case "MEMBER_JOINED":
        return (
          <div
            className="c-message__item c-message__joined-left"
            key={msg.id}
          >
            <div className="c-message--joined">
              {msg.user.username} {msg.message}
            </div>
          </div>
        );

      case ("MEMBER_LEFT"):
        return (
          <div
            className="c-message__item c-message__joined-left"
            key={msg.id}
          >
            <div className="c-message--left">
              {msg.user.username} {msg.message}
            </div>
          </div>
        );

      default:
        const currentMember = (user.id === msg.user.id) ? true : false;
        let class1, class2, class3;
        if (currentMember) {
          class1 = "c-message__item  my-item";
          class2 = "c-message__message__username my-username";
          class3 = "c-message__message__text my-message";
        } else {
          class1 = "c-message__item  others-item";
          class2 = "c-message__message__username others-username";
          class3 = "c-message__message__text others-message";
        }
        return (
          <div className={class1} key={msg.id}>
            <span className="message_list_avatarc" style={{ backgroundColor: msg.user.avcolor }}>
            </span>
            <div className="c-message__message-item">
              <div className={class2}>
                <div>{msg.user.username}</div>
              </div>
              <div className={class3}>{msg.message}</div>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="c-messages">
      {messageArray.map((msg) => showMessage(msg))}
      <div className="bottomContainerElement" ref={bottomRef}></div>
    </div>
  );
}
