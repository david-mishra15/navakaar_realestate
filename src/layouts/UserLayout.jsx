import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom"; // Outlet import करना जरूरी है

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1 bg-brand-paper mb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
