import { Shield, LogOut } from "lucide-react";
import useSessionTimer from "../hooks/useSessionTimer";

const Navbar = ({ onLogout }) => {
  const { formattedTime } = useSessionTimer();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#090f1b]/80 border-b border-white/10">
      <div className="w-full px-8 md:px-12 py-4 flex items-center justify-between">
        
        {/* Logo – pushed left */}
        <div className="flex items-center gap-2 text-white text-xl font-bold">
          <Shield className="text-teal-400" size={22} />
          VaultPass
        </div>

        {/* Right side – pushed right */}
        <div className="flex items-center gap-6 text-sm">
          {/* Session Timer */}
          <div className="flex items-center gap-2 bg-[#121a2f] border border-white/10 px-4 py-2 rounded-lg text-gray-300">
            <span className="text-gray-400">Session</span>
            <span className="text-teal-400 font-medium">
              {formattedTime}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
