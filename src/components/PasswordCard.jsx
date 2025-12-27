import { Eye, EyeOff, Copy, Trash, Edit } from "lucide-react";
import { useState } from "react";
import { vpp } from "../services/userServices";
import { getDecrypted } from "../services/saveServices";

const PasswordCard = ({ site, url, passwordId, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShowPassword = async () => {
    const input = prompt("Enter your profile password");
    if (!input) return;

    try {
      setLoading(true);
      await vpp({ profilePassword: input });
      const res = await getDecrypted(passwordId);
      setPassword(res.data.data.password);
      setProfilePassword(res.data.data.profilePassword);
      setShowPassword(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch password");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!showPassword) {
      alert("Enable password first!");
      return;
    }
    await navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <div
      className="bg-[#121a2f]/80 border border-white/10 backdrop-blur-xl
                 rounded-xl p-5 flex flex-col justify-between
                 hover:border-teal-500/40 transition"
    >
      {/* Top content */}
      <div>
        <h3 className="text-lg font-semibold text-white truncate">
          {site}
        </h3>

        <p className="text-sm text-gray-400 truncate mt-1">
          <a href={url} className="text-teal-400"target="_blank" >{url}</a>
        </p>

        <div className="mt-4 space-y-2 text-sm">
          <p className="text-gray-300">
            Password:&nbsp;
            <span className="font-mono">
              {showPassword ? password : "••••••••"}
            </span>
          </p>

          <p className="text-gray-300">
            Profile:&nbsp;
            <span className="font-mono">
              {showPassword ? profilePassword : "••••••••"}
            </span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end items-center gap-4 mt-6 text-gray-400">
        {showPassword ? (
          <EyeOff
            className="cursor-pointer hover:text-teal-400"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <Eye
            className="cursor-pointer hover:text-teal-400"
            onClick={handleShowPassword}
          />
        )}

        <Copy
          className="cursor-pointer hover:text-teal-400"
          onClick={handleCopy}
        />

        <Edit
          className="cursor-pointer hover:text-teal-400"
          onClick={onEdit}
        />

        <Trash
          className="cursor-pointer hover:text-red-500"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default PasswordCard;
