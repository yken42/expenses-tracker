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

export default function ExpenseModal({ open, setOpen, isIncome }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');

  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleClose = () => {
    setOpen(false);
    // Reset all form fields when closing
    setAmount('');
    setCategory('');
    setName('');
  };

  const handleSubmit = async () => {
    // Validate inputs (including name)
    if (!amount || !category || !name) {
      alert('Please fill in all fields');
      return;
    }

    const transaction = {
      name,
      amount: parseFloat(isIncome ? amount : -amount),
      category,
      type: isIncome ? 'income' : 'expense',
    };

    try {
      await addTransaction(transaction);
      // Handle form submission      
      // Close modal and reset form
      handleClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        onClick: handleClose
      }}
    >
      <Box 
        sx={style}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Expense
        </Typography>
        
        {/* Name Input Field */}
        <TextField
          fullWidth
          label="Expense Name"
          type="text"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Grocery Shopping"
        />
        
        {/* Amount Input Field */}
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

        {/* Category Select Field */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="transportation">Transportation</MenuItem>
            <MenuItem value="utilities">Utilities</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        {/* Update Submit Button */}
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
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}