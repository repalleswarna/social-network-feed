export const users = [
  { id: 1, name: "You (Ravi Kumar)", title: "Frontend Developer", company: "TechCorp", location: "Andhra Pradesh", connections: 320, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 2, name: "Priya Sharma", title: "Product Manager", company: "Innovate Labs", location: "Bengaluru", connections: 850, avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 3, name: "Arjun Reddy", title: "Backend Engineer", company: "CloudNine", location: "Hyderabad", connections: 540, avatar: "https://i.pravatar.cc/150?img=33" },
  { id: 4, name: "Sneha Iyer", title: "UI/UX Designer", company: "PixelWorks", location: "Chennai", connections: 1200, avatar: "https://i.pravatar.cc/150?img=45" },
];

export const currentUser = users[0];

export const getUser = (id) => users.find((u) => u.id === id);
