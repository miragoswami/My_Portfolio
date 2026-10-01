import React, { useState } from "react";
import API_URL from "../services/api";

function AdminLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username.trim(),
                        password: password
                    })
                }
            );

            let data = null;
            try {
                data = await response.json();
            } catch {
                data = null;
            }

            if (response.ok && data && data.success) {
                localStorage.setItem("adminLoggedIn", "true");
                window.location.href = "/admin/dashboard";
            } else {
                setMessage((data && data.message) || `Login failed (Status: ${response.status})`);
            }

        } catch (error) {
            console.error("Login request error:", error);
            setMessage("Unable to connect to backend server. Ensure backend is running.");
        }
    };

    return (
        <div className="admin-login">
            <a href="/" className="admin-back-btn">← Back to Portfolio</a>

            <h1>Admin Login</h1>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>
            </form>

            {message && (
                <p>{message}</p>
            )}
        </div>
    );
}

export default AdminLogin;


//               USER
//                 │
//                 ↓
//       /admin
//                 │
//                 ↓
//        AdminLogin.jsx
//                 │
//        Enter username
//        Enter password
//                 │
//                 ↓
//           Click Login
//                 │
//                 ↓
//        React fetch()
//                 │
//                 ↓
//  POST /api/auth/login
//                 │
//                 ↓
//        Express Backend
//                 │
//                 ↓
//        authController
//                 │
//         Check credentials
//                 │
//           ┌─────┴─────┐
//           │           │
//        Correct       Wrong
//           │           │
//           ↓           ↓
//        success       401
//           │           │
//           ↓           ↓
//     Dashboard       Error