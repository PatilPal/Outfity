
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import styles from "./Profile.module.css";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setError("Unable to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.profilePage}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {user?.displayName?.charAt(0).toUpperCase() ||
            user?.email?.charAt(0).toUpperCase() ||
            "U"}
        </div>

        <h2>{user?.displayName || "Outfity User"}</h2>

        <p className={styles.email}>{user?.email}</p>

        <div className={styles.divider} />

        <button
          className={styles.logoutButton}
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Signing out..." : "Log Out"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </section>
  );
}

export default Profile;
