import React, { useState } from "react";
import API_URL from "../services/api";

function AdminLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {
            
            //username and password when entered , they are checked there

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username, //admin
                        password: password //admin123
                    })
                }
            );

            //response is stored in data
            const data = await response.json(); 

            //if response is success then  adminloggedin is true
            if (data.success) {

                localStorage.setItem("adminLoggedIn", "true");

                //open admin dashboard
                window.location.href = "/admin/dashboard";
            } else {
                setMessage(data.message);
            }

        } catch (error) {

            console.error(error);
            setMessage("Unable to connect to backend");

        }
    };


    return (
        <div className="admin-login">

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