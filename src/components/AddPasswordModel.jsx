import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { X } from "lucide-react";
import { addPassword, updatePassword } from "../services/saveServices";

const AddPasswordModal = ({ mode, defaultValues, onClose, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      url: "",
      password: "",
      profilePassword: ""
    }
  });

  // Reset form when switching between add/edit
  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || "",
        url: defaultValues.url || "",
        password: "",
        profilePassword: ""
      });
    } else {
      reset({
        name: "",
        url: "",
        password: "",
        profilePassword: ""
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data) => {
    try {
      if (mode === "edit") {
        await updatePassword(defaultValues._id, data);
        alert("Password updated!");
      } else {
        await addPassword(data);
        alert("Password added!");
      }

      reset();
      onSuccess?.();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save password");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#0b1220] p-6 rounded-xl w-[400px] shadow-2xl relative">
        {/* Close button */}
        <X
          className="absolute top-4 right-4 text-white cursor-pointer hover:text-red-500"
          onClick={onClose}
        />

        <h2 className="text-white text-2xl font-semibold mb-5 text-center">
          {mode === "edit" ? "Update Password" : "Add Password"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name is too short"
                }
              })}
              placeholder="Name"
              className={`p-3 w-full rounded-lg border bg-gray-900 text-white
                ${errors.name ? "border-red-500" : "border-gray-600"}
                focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* URL */}
          <div>
            <input
              type="url"
              inputMode="url"
              {...register("url", {
                required: "URL is required",
                minLength: {
                  value: 8,
                  message: "URL is too short"
                },
                maxLength: {
                  value: 2048,
                  message: "URL is too long"
                },
                pattern: {
                  value:
                    /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                  message:
                    "Enter a valid URL (must start with http:// or https://)"
                }
              })}
              placeholder="https://example.com"
              className={`p-3 w-full rounded-lg border bg-gray-900 text-white
                ${errors.url ? "border-red-500" : "border-gray-600"}
                focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
            {errors.url && (
              <p className="text-red-400 text-sm mt-1">
                {errors.url.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  
                  message: "Password must be at least 6 characters"
                }
              })}
              placeholder="Password"
              className={`p-3 w-full rounded-lg border bg-gray-900 text-white
                ${errors.password ? "border-red-500" : "border-gray-600"}
                focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Profile Password */}
          <input
            type="password"
            {...register("profilePassword")}
            placeholder="Profile Password (optional)"
            className="p-3 w-full rounded-lg border border-gray-600 bg-gray-900 text-white
                       focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-teal-500 text-black font-semibold hover:bg-teal-600"
            >
              {mode === "edit" ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPasswordModal;
