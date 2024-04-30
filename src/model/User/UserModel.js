import UserSchema from "./UserSchema.js";

//Insert User
export const addNewUser = (userObj) => {
  return UserSchema(userObj).save();
};

//Find User By Email
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

//Update

//Delete
