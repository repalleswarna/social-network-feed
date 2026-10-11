import { useState } from "react";
import { Avatar, Input, Button } from "antd";
import dayjs from "dayjs";
import { getUser, currentUser } from "../data/users";
import ProfilePreview from "./ProfilePreview";

export default function CommentSection({ comments, onAdd }) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <div className="flex gap-2">
        <Avatar src={currentUser.avatar} />
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={submit}
          placeholder="Add a comment..."
          maxLength={200}
        />
        <Button type="primary" onClick={submit} disabled={!text.trim()}>
          Send
        </Button>
      </div>

      <div className="mt-3 space-y-3">
        {comments.map((c) => {
          const u = getUser(c.userId);
          return (
            <div key={c.id} className="flex gap-2">
              <ProfilePreview user={u}>
                <Avatar src={u.avatar} size={32} className="cursor-pointer" />
              </ProfilePreview>
              <div className="rounded-lg bg-gray-100 px-3 py-2">
                <p className="text-sm font-semibold">
                  {u.name}{" "}
                  <span className="text-xs font-normal text-gray-400">
                    {dayjs(c.createdAt).format("DD MMM, hh:mm A")}
                  </span>
                </p>
                <p className="text-sm">{c.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
