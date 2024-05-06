import express from "express";
import { addNewUser, getUserByEmail } from "../model/User/UserModel.js";
import { compairPassword, hashPassword } from "../utils/bcrypt.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const result = await findUser(req.body);

    res.json({
      status: "success",
      message: "User Profile Found",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
});

userRouter.post("/signup", async (req, res) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const result = await addNewUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New User Register Success",
        })
      : res.json({
          status: "error",
          message: "User Register Failed, Try Again",
        });
  } catch (error) {
    let code = 500;
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "User already Exists";
      code = 200;
    }
    res.status(code).json({
      status: `error`,
      message: error.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (user?._id) {
      const isMatched = compairPassword(password, user.password);
      //remove the password so server doesnot send it to client
      user.password = undefined;

      if (isMatched) {
        //authorised
        return res.json({
          status: "success",
          message: "Profile Found, Welcome",
          user,
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid Email or Password, try again",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default userRouter;
