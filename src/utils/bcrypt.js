import bcryptjs from "bcryptjs";
const saltRound = 15;

//encrypt
export const hashPassword = (plainPass) => {
  return bcryptjs.hashSync(plainPass, saltRound);

  //bcryptjs.hash(plainPass, 10)
  //here .hash takes 2 parameters
  //1st parm: text to encrypt
  //2nd parm: it is called 'salt', means how many times you want to encrypt the 1st parm
};

//decrypt
export const compairPassword = (plainPass, hashPass) => {
  return bcryptjs.compareSync(plainPass, hashPass);
};
