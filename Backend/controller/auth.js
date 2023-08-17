import {db} from '../db.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hash = await argon2.hash(password);

    // Insert the hashed password into the database
    const q = 'INSERT INTO users (`username`, `email`, `password`) VALUES(?, ?, ?)';
    const values = [username, email, hash];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  } catch (err) {
    return res.json(err);
  }
};




export const login = (req, res) => {
  const { username, password } = req.body;

  const q = 'SELECT * FROM users WHERE username = ?';
  db.query(q, [username], async (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User Not Found!");

    try {
      const storedHashedPassword = data[0].password;

      // Compare the password using argon2
      const isPasswordCorrect = await argon2.verify(storedHashedPassword, password);

      if (!isPasswordCorrect) return res.status(400).json("Wrong Username or Password");

      const token = jwt.sign({ id: data[0].id }, 'jwtkey');
      const { password: hashedPassword, ...other } = data[0];

      res.cookie("access_token", token, {
        httpOnly: true,
      }).status(200).json(other);
    } catch (err) {
      return res.json(err);
    }
  });
};

export const logout = (req,res)=>{
 res.clearCookie("access_token" , {
   sameSite: 'none',
   secure:true
 }).status(200).json("User has been logged out")
  
}