import { useState } from "react";
import { Card, Avatar, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

export default function CreatePost({ user, onCreate }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onCreate(text.trim());
    setText("");
  };

  return (
    <Card className="mb-4 shadow-sm">
      <div className="flex gap-3">
        <Avatar src={user.avatar} size={48} />
        <div className="flex-1">
          <Input.TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start a post..."
            autoSize={{ minRows: 2, maxRows: 6 }}
            maxLength={500}
            showCount
          />
          <div className="mt-2 flex justify-end" style={{ marginTop: 24 }}>
            <Button type="primary" icon={<SendOutlined />} onClick={handleSubmit} disabled={!text.trim()}>
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
