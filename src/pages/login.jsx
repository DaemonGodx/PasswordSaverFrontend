import { set, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getCurrentUser, loginUser } from "../services/userServices";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Shield } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    try {
      await loginUser(data);
      const meRes = await getCurrentUser();
      dispatch(login(meRes.data.data));
      localStorage.setItem("user", JSON.stringify(meRes.data.data));
      localStorage.setItem("sessionStart", Date.now().toString());
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b1220] to-[#1a2233] text-white px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#121a2f] p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-6 gap-3">
          <Shield className="text-teal-400 w-8 h-8" />
          <h1 className="text-3xl font-bold">VaultPass</h1>
        </div>

        <p className="text-gray-400 text-center text-sm mb-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-400 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address"
              }
            })}
            className={`w-full px-3 py-2 rounded-lg bg-gray-900 border ${
              errors.email ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-teal-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be 8+ chars, include uppercase, lowercase, number & symbol"
              }
            })}
            className={`w-full px-3 py-2 rounded-lg bg-gray-900 border ${
              errors.password ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-teal-500`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-600 text-black py-2 rounded-lg font-semibold transition disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      
    </div>
    
  );
}
