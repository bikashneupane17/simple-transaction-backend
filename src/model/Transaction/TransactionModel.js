import TransactionSchema from "./TransactionSchema.js";

//add new transaction
export const addNewTransaction = (transObj) => {
  return TransactionSchema(transObj).save();
};

//get all transaction
export const getTransactionById = (userId) => {
  return !userId ? null : TransactionSchema.find({ userId });
};

//delete selected transaction
export const deleteTransactionById = (userId, idsToDelete) => {
  return !userId
    ? null
    : TransactionSchema.deleteMany({ _id: { $in: idsToDelete } });
};
