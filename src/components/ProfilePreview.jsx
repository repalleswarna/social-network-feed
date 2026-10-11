import { Popover, Avatar, Button } from "antd";
import { EnvironmentOutlined, TeamOutlined } from "@ant-design/icons";

export default function ProfilePreview({ user, children }) {
  const content = (
    <div className="w-64">
      <div className="flex items-center gap-3">
        <Avatar src={user.avatar} size={56} />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-gray-500">{user.title}</p>
          <p className="text-xs text-gray-500">{user.company}</p>
        </div>
      </div>
      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p><EnvironmentOutlined /> {user.location}</p>
        <p><TeamOutlined /> {user.connections} connections</p>
      </div>
      <Button type="primary" block className="mt-3" size="small">
        Connect
      </Button>
    </div>
  );

  return (
    <Popover content={content} trigger="hover" placement="bottomLeft">
      {children}
    </Popover>
  );
}
