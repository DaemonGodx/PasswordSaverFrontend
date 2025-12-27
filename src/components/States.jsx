import { Lock, Database, ShieldCheck } from "lucide-react";

const Stats = ({ total }) => {
  const stats = [
    { icon: Database, label: "Saved Passwords", value: total },
    { icon: Lock, label: "AES Encryption", value: "256-bit" },
    { icon: ShieldCheck, label: "Secure Storage", value: "100%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((item, i) => (
        <div
          key={i}
          className="bg-[#121a2f]/80 border border-white/10 backdrop-blur-xl
                     px-6 py-5 rounded-xl flex items-center gap-4
                     hover:border-teal-500/40 transition"
        >
          {/* Icon */}
          <div className="p-3 rounded-lg bg-teal-500/10 text-teal-400">
            <item.icon size={22} />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm text-gray-400">{item.label}</p>
            <h3 className="text-lg font-semibold text-white">
              {item.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
