import { useNavigate } from "react-router-dom";
import { Shield, Lock, Database, ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#1a2233] text-white flex flex-col">
      
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center text-center flex-1 px-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-teal-400 w-10 h-10" />
          <h1 className="text-4xl md:text-5xl font-bold">
            Vault<span className="text-teal-400">Pass</span>
          </h1>
        </div>

        <p className="text-gray-400 max-w-xl text-lg mb-8">
          A secure, encrypted password manager built to keep your credentials
          safe, private, and accessible — only by you.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 
                       rounded-lg font-semibold shadow-lg shadow-teal-500/30 transition"
          >
            Login <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 
                       rounded-lg font-semibold shadow-lg shadow-indigo-500/30 transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 md:px-12 lg:px-24 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#121a2f] p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
            <Lock className="text-teal-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
            <p className="text-gray-400 text-sm">
              Your passwords are encrypted using AES-256 and never stored in
              plain text.
            </p>
          </div>

          <div className="bg-[#121a2f] p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
            <Database className="text-teal-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Centralized Vault</h3>
            <p className="text-gray-400 text-sm">
              Store and manage all your credentials securely in one place.
            </p>
          </div>

          <div className="bg-[#121a2f] p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
            <Shield className="text-teal-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Session Protection</h3>
            <p className="text-gray-400 text-sm">
              Automatic session expiry keeps your account protected at all times.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-gray-500 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} VaultPass • Secure Password Manager
      </div>
    </div>
  );
};

export default Landing;
