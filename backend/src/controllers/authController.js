const loginAdmin = (req, res) => {
    const { username, password } = req.body;

    //when user enter valid username and password
    if (username === "admin" && password === "admin123") {
        return res.json({
            success: true,
            message: "Admin login successful"
        });
    }

    //when user does not enter valid usernaame nd password
    res.status(401).json({
        success: false,
        message: "Invalid username or password"
    });
};

module.exports = { loginAdmin };
// The React frontend will send:

// {
//     "username": "admin",
//     "password": "admin123"
// }

