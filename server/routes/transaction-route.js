import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createTransaction,
  getAllTransaction,
  getTransactionById,
  updateTransaction,
} from "../controllers/transaction-controller.js";

const router = express.Router();

router
  .route('/')
  .post(isAuthenticated, createTransaction)
  .get(isAuthenticated, getAllTransaction);

router
  .route('/:transaction_id')
  .get(isAuthenticated, getTransactionById)
  .put(isAuthenticated, updateTransaction);

export default router;
