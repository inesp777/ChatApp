import React, { useContext } from "react";
import {ChatContext} from "../../index";

export default function ChatMemberList() {
  const { membersArray } = useContext(ChatContext);

  return (
    <div className="c-member-list__item">
      <div>Members: ({membersArray.length})</div>
      {membersArray.map((member) => (
        <div className="c-member-list__member__item" key={member.id}>
          <span className="member_list_avatarc" style={{ backgroundColor: member.clientData.avcolor }}>
          </span>
          <span className="c-member-list__member__username">
            {member.clientData.username}
          </span>
        </div>
      ))}
    </div>
  );
}
