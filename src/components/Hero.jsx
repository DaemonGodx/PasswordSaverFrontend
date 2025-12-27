import { ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-[#121a2f]/70 border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 px-4 py-1.5 rounded-full text-sm mb-4">
          <ShieldCheck size={16} />
          Secure & Encrypted
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white">
          Your passwords,{" "}
          <span className="text-teal-400">safely stored</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mt-4">
          Manage all your credentials in one secure vault. Military-grade
          encryption and zero-knowledge architecture ensure your data stays
          private — always.
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-400 rounded-full" />
            256-bit AES Encryption
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-400 rounded-full" />
            Zero-Knowledge Security
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
