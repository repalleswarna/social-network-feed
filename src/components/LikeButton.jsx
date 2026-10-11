import { Button } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";

export default function LikeButton({ liked, count, onClick }) {
  return (
    <Button
      type="text"
      onClick={onClick}
      icon={liked ? <LikeFilled className="text-blue-600" /> : <LikeOutlined />}
      className={liked ? "!text-blue-600 font-semibold" : ""}
    >
      {count > 0 ? count : ""} Like
    </Button>
  );
}
