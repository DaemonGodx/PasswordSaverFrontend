import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const SESSION_DURATION = 15 * 60; // seconds

const useSessionTimer = () => {
  const dispatch = useDispatch();

  // Get remaining time from localStorage (runs once)
  const getInitialTime = () => {
    const sessionStart = localStorage.getItem("sessionStart");
    if (!sessionStart) return 0;

    const elapsed = Math.floor(
      (Date.now() - Number(sessionStart)) / 1000
    );

    return Math.max(SESSION_DURATION - elapsed, 0);
  };

  const [secondsLeft, setSecondsLeft] = useState(getInitialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          dispatch(logout());
          localStorage.removeItem("user");
          localStorage.removeItem("sessionStart");
          window.location.replace("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Format mm:ss
  const formattedTime = `${Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0")}:${(secondsLeft % 60)
    .toString()
    .padStart(2, "0")}`;

  return { secondsLeft, formattedTime };
};

export default useSessionTimer;
