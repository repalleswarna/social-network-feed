import { ConfigProvider } from "antd";
import FeedPage from "./pages/FeedPage";

export default function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#0a66c2", borderRadius: 8 } }}>
      <FeedPage />
    </ConfigProvider>
  );
}
