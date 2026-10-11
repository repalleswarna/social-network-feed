import { useState } from "react";
import { Card, Avatar, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { currentUser } from "../data/users";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import ProfilePreview from "./ProfilePreview";

export default function PostCard({ post, author, isOwner, onEdit, onDelete, onLike, onComment }) {
  const [showComments, setShowComments] = useState(false);
  const liked = post.likedBy.includes(currentUser.id);

  return (
    <Card className="mb-4 shadow-sm">
      <div className="flex items-start gap-3">
        <ProfilePreview user={author}>
          <Avatar src={author.avatar} size={48} className="cursor-pointer" />
        </ProfilePreview>

        <div className="flex-1">
          <ProfilePreview user={author}>
            <p className="inline-block cursor-pointer font-semibold leading-tight hover:underline">
              {author.name}
            </p>
          </ProfilePreview>
          <p className="text-xs text-gray-500">{author.title} at {author.company}</p>
          <p className="text-xs text-gray-400">
            {dayjs(post.createdAt).format("DD MMM YYYY, hh:mm A")}
            {post.edited && " · edited"}
          </p>
        </div>

        {isOwner && (
          <div className="flex items-center gap-2">
            <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(post)} />
            <Popconfirm
              title="Delete this post?"
              okText="Delete"
              okButtonProps={{ danger: true }}
              onConfirm={() => onDelete(post.id)}
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        )}
      </div>

      <p className="mt-3 whitespace-pre-wrap">{post.content}</p>

      <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-2">
        <LikeButton liked={liked} count={post.likedBy.length} onClick={() => onLike(post.id)} />
        <Button type="text" icon={<MessageOutlined />} onClick={() => setShowComments(!showComments)}>
          {post.comments.length > 0 ? post.comments.length : ""} Comment
        </Button>
      </div>

      {showComments && (
        <CommentSection comments={post.comments} onAdd={(t) => onComment(post.id, t)} />
      )}
    </Card>
  );
}
