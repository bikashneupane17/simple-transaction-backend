import express from "express";
import {
  addNewTransaction,
  deleteTransactionById,
  getTransactionById,
} from "../model/Transaction/TransactionModel.js";

const transactionRouter = express.Router();

transactionRouter.get("/", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const trans = (await getTransactionById(authorization)) ?? [];

    console.log(trans);

    res.json({
      status: "success",
      message: "Here are the list of the transactions",
      trans,
    });
  } catch (error) {
    res.status(500).json({
      status: "erroraaaa",
      message: error.message,
    });
  }
});

transactionRouter.post("/", async (req, res) => {
  // console.log(req.body);
  // console.log(req.headers.authorization);

  try {
    const { authorization } = req.headers;

    const trans = await addNewTransaction({
      userId: authorization,
      ...req.body,
    });

    trans?._id
      ? res.json({
          status: "success",
          message: "New Transaction Added",
          trans,
        })
      : res.json({
          status: "error",
          message: "Unable to process the request, Try again",
        });
  } catch (error) {
    res.json({
      status: "erroraaaa",
      message: error.message,
    });
  }
});

transactionRouter.delete("/", async (req, res) => {
  try {
    console.log(req.body + "This is the");

    const { authorization } = req.headers;
    console.log("Auth" + authorization);

    const trans = await deleteTransactionById(authorization, req.body);

    trans?.deletedCount
      ? res.json({
          status: "success",
          message: " Transaction Deleted",
          trans,
        })
      : res.json({
          status: "error",
          message: "Unable to process the request, Try again",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default transactionRouter;
