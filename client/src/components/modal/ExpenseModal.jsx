import { useState } from 'react';
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// ... existing code ...

const [amount, setAmount] = useState('');
const [category, setCategory] = useState('');

<Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={style}>
  <Typography id="modal-modal-title" variant="h6" component="h2">
    Add New Expense
  </Typography>
  
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

  {/* Submit Button */}
  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
    <Button 
      variant="contained" 
      onClick={() => {
        // Validate inputs
        if (!amount || !category) {
          alert('Please fill in all fields');
          return;
        }
        
        // Handle form submission
        console.log({ amount, category });
        
        // Clear form and close modal
        setAmount('');
        setCategory('');
        handleClose();
      }}
    >
      Submit
    </Button>
  </Box>
</Box>
</Modal>
// ... existing code ...