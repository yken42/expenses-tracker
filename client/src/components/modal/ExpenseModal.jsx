import { useState } from 'react';
import useTransactionStore from '../../store/useTransactionStore';
import {
  Modal,
  Box,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

// Define category options
const CATEGORIES = {
  expense: [
    { value: "food", label: "Food" },
    { value: "transportation", label: "Transportation" },
    { value: "utilities", label: "Utilities" },
    { value: "entertainment", label: "Entertainment" },
    { value: "other", label: "Other" },
  ],
  income: [
    { value: "salary", label: "Salary" },
    { value: "investments", label: "Investments" },
    { value: "freelancing", label: "Freelancing" },
    { value: "other", label: "Other" },
  ],
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransactionModal({ open, setOpen, isIncome }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');

  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleClose = () => {
    setOpen(false);
    // Reset form fields
    setAmount('');
    setCategory('');
    setName('');
  };

  const handleSubmit = async () => {
    if (!amount || !category || !name) {
      alert('Please fill in all fields');
      return;
    }

    const transaction = {
      name: name,
      amount: parseFloat(isIncome ? amount : -amount),
      category,
      type: isIncome ? 'income' : 'expense',
    };

    console.log('Submitting transaction:', transaction);

    try {
      await addTransaction(transaction);
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add transaction');
    }
  };

  // Get current categories based on transaction type
  const currentCategories = isIncome ? CATEGORIES.income : CATEGORIES.expense;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{ onClick: handleClose }}
    >
      <Box 
        sx={style}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New {isIncome ? 'Income' : 'Expense'}
        </Typography>
        
        <TextField
          fullWidth
          label={isIncome ? "Income Name" : "Expense Name"}
          type="text"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isIncome ? "e.g., Monthly Salary" : "e.g., Grocery Shopping"}
        />
        
        <TextField
          fullWidth
          label="Amount"
          type="number"
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {currentCategories.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={handleClose}
            color="error"
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{
              bgcolor: isIncome ? '#089767' : '#8f0329',
              '&:hover': {
                bgcolor: isIncome ? '#067a52' : '#6b0220',
              }
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}