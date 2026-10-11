import { Segmented, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function FeedFilters({ filter, setFilter, search, setSearch, sort, setSort }) {
  return (
    <div className="mb-4 space-y-3 rounded-lg bg-white p-3 shadow-sm">
      <Segmented
        block
        value={filter}
        onChange={setFilter}
        options={[
          { label: "All", value: "all" },
          { label: "My Posts", value: "mine" },
          { label: "Liked", value: "liked" },
        ]}
      />
      <div className="flex gap-2">
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search posts or people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={sort}
          onChange={setSort}
          className="w-40"
          options={[
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
            { label: "Most liked", value: "liked" },
          ]}
        />
      </div>
    </div>
  );
}
