import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/States";
import PasswordCard from "../components/PasswordCard";
import { allSavedPasswords, deletePassword } from "../services/saveServices";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import AddPasswordModal from "../components/AddPasswordModel.jsx";
import Footer from "../components/footer.jsx";

const Dashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("sessionStart");
    navigate("/", { replace: true });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      try {
        await deletePassword(id);
        alert("Password deleted successfully!");
        fetchPasswords();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete password");
      }
    }
  };

  const handleEdit = (passwordItem) => {
    setEditData(passwordItem);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setOpenModal(true);
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    const handleBackButton = () => {
      dispatch(logout());
      localStorage.removeItem("user");
      localStorage.removeItem("sessionStart");
      window.location.replace("/");
    };
    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [dispatch]);

  const fetchPasswords = async () => {
    setLoading(true);
    try {
      const res = await allSavedPasswords();
      setPasswords(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch passwords", err);
      setPasswords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const filteredPasswords = passwords.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

return (
  <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#1a2233] text-white flex flex-col">
    <Navbar onLogout={handleLogout} />

    {/* Hero */}
    <section className="px-8 md:px-12 lg:px-16 mt-6">
      <div className="shadow-lg shadow-black/30 rounded-2xl">
        <Hero />
      </div>
    </section>

    {/* Stats */}
    <section className="px-8 md:px-12 lg:px-16 mt-6">
      <Stats total={passwords.length} />
    </section>

    {/* Search + Add (NO extra container box) */}
    <section className="px-8 md:px-12 lg:px-16 mt-6">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <input
          type="text"
          placeholder="Search passwords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg
                     bg-[#121a2f] border border-white/10
                     text-white placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-teal-500
                     shadow-md shadow-black/30"
        />

        <button
          onClick={handleAdd}
          className="bg-teal-500 hover:bg-teal-600
                     px-6 py-3 rounded-lg font-semibold
                     shadow-lg shadow-black/40 transition"
        >
          + Add Password
        </button>
      </div>
    </section>

    {/* Modal */}
    {openModal && (
      <AddPasswordModal
        mode={editData ? "edit" : "add"}
        defaultValues={editData}
        onClose={() => {
          setOpenModal(false);
          setEditData(null);
        }}
        onSuccess={fetchPasswords}
      />
    )}

    {/* Password Cards */}
    <section className="px-8 md:px-12 lg:px-16 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading && (
          <p className="col-span-full text-gray-400 animate-pulse">
            Loading passwords...
          </p>
        )}

        {!loading && filteredPasswords.length === 0 && (
          <p className="col-span-full text-gray-500">
            No passwords found
          </p>
        )}

        {!loading &&
          filteredPasswords.map((item) => (
            <PasswordCard
              key={item._id}
              passwordId={item._id}
              site={item.name}
              url={item.url}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="mt-auto">
      <Footer />
    </footer>
  </div>
);


};

export default Dashboard;
