const express = require("express");

const router = express.Router();

const { loginAdmin } = require("../controllers/authController");

router.post("/login", loginAdmin);

module.exports = router;
// POST /login
//       ↓
// loginAdmin()





// AdminLogin.jsx
//       │
//       │ fetch()
//       ↓
// POST /api/auth/login
//       │
//       ↓
// Express server
//       │
//       ↓
// authRoutes.js
//       │
//       ↓
// loginAdmin()
//       │
//       ↓
// Check username/password
//       │
//       ├── Correct → success: true
//       │
//       └── Wrong   → 401 error