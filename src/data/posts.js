export const initialPosts = [
  {
    id: 1, userId: 2,
    content: "Excited to announce that our team just shipped v2.0! 🚀 Huge thanks to everyone involved.",
    createdAt: "2026-10-08T10:30:00",
    likedBy: [1, 3],
    comments: [{ id: 101, userId: 3, text: "Congrats Priya! 🎉", createdAt: "2026-10-08T11:00:00" }],
  },
  {
    id: 2, userId: 3,
    content: "Tip: always add indexes on columns you filter by. Saved us 80% query time today.",
    createdAt: "2026-10-07T15:10:00",
    likedBy: [2],
    comments: [],
  },
  {
    id: 3, userId: 1,
    content: "Learning React 19 + Tailwind v4 + Ant Design. Building a social feed as practice!",
    createdAt: "2026-10-06T09:00:00",
    likedBy: [],
    comments: [],
  },
  {
    id: 4, userId: 4,
    content: "Design is not just how it looks, it's how it works. New portfolio case study is live.",
    createdAt: "2026-10-05T18:45:00",
    likedBy: [1, 2, 3],
    comments: [],
  },
  {
    id: 5, userId: 2,
    content: "We're hiring! Looking for a React developer with 2+ years experience. DM me.",
    createdAt: "2026-10-04T12:00:00",
    likedBy: [],
    comments: [],
  },
  {
    id: 6, userId: 3,
    content: "Just finished a deep dive on database sharding. Happy to share notes if anyone is interested.",
    createdAt: "2026-10-03T08:20:00",
    likedBy: [4],
    comments: [],
  },
];
