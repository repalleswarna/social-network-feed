import { useState, useMemo } from "react";
import { message, Pagination, Empty } from "antd";
import { initialPosts } from "../data/posts";
import { currentUser, getUser } from "../data/users";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import EditPostModal from "../components/EditPostModal";
import FeedFilters from "../components/FeedFilters";

const PAGE_SIZE = 3;

export default function FeedPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  // filter + pagination state
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  // ---------- CREATE ----------
  const handleCreate = (content) => {
    setPosts([
      { id: Date.now(), userId: currentUser.id, content, createdAt: new Date().toISOString(), likedBy: [], comments: [] },
      ...posts,
    ]);
    setPage(1);
    messageApi.success("Post created");
  };

  // ---------- EDIT ----------
  const handleEditSave = (id, content) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, content, edited: true } : p)));
    setEditingPost(null);
    messageApi.success("Post updated");
  };

  // ---------- DELETE ----------
  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
    messageApi.success("Post deleted");
  };

  // ---------- LIKE ----------
  const handleLike = (id) => {
    setPosts(
      posts.map((p) => {
        if (p.id !== id) return p;
        const already = p.likedBy.includes(currentUser.id);
        return {
          ...p,
          likedBy: already ? p.likedBy.filter((u) => u !== currentUser.id) : [...p.likedBy, currentUser.id],
        };
      })
    );
  };

  // ---------- COMMENT ----------
  const handleComment = (postId, text) => {
    const c = { id: Date.now(), userId: currentUser.id, text, createdAt: new Date().toISOString() };
    setPosts(posts.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, c] } : p)));
  };

  // ---------- FILTER + SORT ----------
  const filteredPosts = useMemo(() => {
    let list = [...posts];

    if (filter === "mine") list = list.filter((p) => p.userId === currentUser.id);
    if (filter === "liked") list = list.filter((p) => p.likedBy.includes(currentUser.id));

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.content.toLowerCase().includes(q) ||
          getUser(p.userId).name.toLowerCase().includes(q)
      );
    }

    if (sort === "newest") list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === "oldest") list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sort === "liked") list.sort((a, b) => b.likedBy.length - a.likedBy.length);

    return list;
  }, [posts, filter, search, sort]);

  // ---------- PAGINATION ----------
  const start = (page - 1) * PAGE_SIZE;
  const pagedPosts = filteredPosts.slice(start, start + PAGE_SIZE);

  // reset to page 1 when filters change
  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-2xl px-3 py-6">
      {contextHolder}
      <h1 className="mb-4 text-2xl font-bold">Network Feed</h1>

      <CreatePost user={currentUser} onCreate={handleCreate} />

      <FeedFilters
        filter={filter} setFilter={withReset(setFilter)}
        search={search} setSearch={withReset(setSearch)}
        sort={sort} setSort={withReset(setSort)}
      />

      {pagedPosts.length === 0 ? (
        <Empty description="No posts found" className="rounded-lg bg-white py-10" />
      ) : (
        pagedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            author={getUser(post.userId)}
            isOwner={post.userId === currentUser.id}
            onEdit={setEditingPost}
            onDelete={handleDelete}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))
      )}

      {filteredPosts.length > PAGE_SIZE && (
        <div className="flex justify-center py-4">
          <Pagination
            current={page}
            pageSize={PAGE_SIZE}
            total={filteredPosts.length}
            onChange={setPage}
            showSizeChanger={false}
          />
        </div>
      )}

      <EditPostModal
        open={!!editingPost}
        post={editingPost}
        onSave={handleEditSave}
        onCancel={() => setEditingPost(null)}
      />
    </div>
  );
}
