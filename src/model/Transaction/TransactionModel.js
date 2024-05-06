import TransactionSchema from "./TransactionSchema.js";

//add new transaction
export const addNewTransaction = (transObj) => {
  return TransactionSchema(transObj).save();
};

//get all transaction
export const getTransactionById = (userId) => {
  return !userId ? null : TransactionSchema.find({ userId });
};
