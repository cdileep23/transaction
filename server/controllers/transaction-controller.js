import transaction from "../models/transaction.js";
import mongoose from "mongoose";


export const createTransaction = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount, transaction_type } = req.body;
    const status = "PENDING";

    if (!amount || !transaction_type) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    const newTransaction = await transaction.create({
      amount,
      user: userId,
      transaction_type,
      status,
    });

    return res.status(201).json({
      message: "Transaction successfully added",
      success: true,
      transaction: newTransaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllTransaction = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required", success: false });
    }

    const transactions = await transaction.find({ user: userId });

    return res.status(200).json({
      message: "Successfully retrieved all transactions of user",
      success: true,
      transactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getTransactionById = async (req, res) => {
    try {
      const { transaction_id } = req.params; 
   console.log(transaction_id)
      
      if (!transaction_id) {
        return res.status(400).json({
          message: 'Transaction ID is required',
          success: false,
        });

      }

      console.log("transaction id")
  
    
      const findTransaction = await transaction.findById(transaction_id);
  
    
      if (!findTransaction) {
        return res.status(404).json({
          message: 'Transaction not found',
          success: false,
        });
      }
  
    
      return res.status(200).json({
        message: 'Successfully retrieved the transaction',
        success: true,
        transaction: findTransaction,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message, success: false });
    }
  };
  

export const updateTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;

    const updatedTransaction = await transaction.findByIdAndUpdate(
      transaction_id,
      { ...req.body },
      { new: true } 
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found", success: false });
    }

    return res.status(200).json({
      message: "Successfully updated transaction",
      success: true,
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
