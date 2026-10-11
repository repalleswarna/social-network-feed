import { useState, useEffect } from "react";
import { Modal, Input } from "antd";

export default function EditPostModal({ open, post, onSave, onCancel }) {
  const [text, setText] = useState("");

  // refill textarea whenever a different post is opened
  useEffect(() => {
    if (post) setText(post.content);
  }, [post]);

  return (
    <Modal
      title="Edit post"
      open={open}
      onOk={() => onSave(post.id, text.trim())}
      onCancel={onCancel}
      okText="Save"
      okButtonProps={{ disabled: !text.trim() }}
      destroyOnHidden
    >
      <Input.TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoSize={{ minRows: 4, maxRows: 10 }}
        maxLength={500}
        showCount
      />
    </Modal>
  );
}
