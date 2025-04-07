import React, { useState } from 'react';
import useTransactionStore from '../../store/useTransactionStore';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, SwapHoriz as SwapIcon } from '@mui/icons-material';

export const TransactionTable = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Add this debug log
  console.log('Current transactions:', transactions);

  // Filter and search transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleEdit = (transaction) => {
    setEditingTransaction({ ...transaction });
  };

  const handleDelete = (transaction) => {
    setDeleteConfirmation(transaction);
  };

  const handleUpdateTransaction = async () => {
    if (!editingTransaction) return;

    try {
      const success = await updateTransaction(editingTransaction);
      if (success) {
        setEditingTransaction(null);
      } else {
        alert('Failed to update transaction');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update transaction');
    }
  };

  const handleConfirmDelete = async () => {
    // Implement delete logic here
    setDeleteConfirmation(null);
  };

  // Add categories based on transaction type
  const getCategories = (type) => {
    return type === 'income' 
      ? [
          { value: 'salary', label: 'Salary' },
          { value: 'freelancing', label: 'Freelancing' },
          { value: 'investments', label: 'Investments' },
          { value: 'other', label: 'Other' },
        ]
      : [
          { value: 'food', label: 'Food' },
          { value: 'transportation', label: 'Transportation' },
          { value: 'utilities', label: 'Utilities' },
          { value: 'entertainment', label: 'Entertainment' },
          { value: 'other', label: 'Other' },
        ];
  };

  // Add function to handle type toggle
  const handleToggleType = async (transaction) => {
    try {
      const updatedTransaction = {
        ...transaction,
        type: transaction.type === 'income' ? 'expense' : 'income',
        // Flip the amount sign when changing type
        amount: -transaction.amount
      };

      const success = await updateTransaction(updatedTransaction);
      if (!success) {
        alert('Failed to update transaction type');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update transaction type');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FormControl variant="outlined" size="small" className="min-w-[150px]">
            <InputLabel>Filter Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter Type"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Transactions Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow 
                key={transaction._id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <TableCell>
                  {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="relative">
                  <span>{transaction.name || 'Unnamed Transaction'}</span>
                  <div className="absolute inset-0 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity bg-gray-50 bg-opacity-50">
                    <IconButton
                      onClick={() => handleEdit(transaction)}
                      size="small"
                      className="mr-2"
                    >
                      <EditIcon fontSize="small" className="text-blue-500" />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit Transaction">
                    <IconButton
                      onClick={() => handleEdit(transaction)}
                      size="small"
                      className="text-blue-500 hover:text-blue-700 mr-1"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end">
                    <Tooltip title="Toggle Income/Expense">
                      <IconButton 
                        onClick={() => handleToggleType(transaction)} 
                        size="small"
                        className="mr-1"
                      >
                        
                        <SwapIcon className={
                          transaction.type === 'income' 
                            ? 'text-green-500 hover:text-green-700' 
                            : 'text-red-500 hover:text-red-700'
                        } />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        onClick={() => handleDelete(transaction)} 
                        size="small"
                      >
                        <DeleteIcon className="text-red-500" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog 
        open={!!editingTransaction} 
        onClose={() => setEditingTransaction(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-4">
            <TextField
              fullWidth
              label="Name"
              value={editingTransaction?.name || ''}
              onChange={(e) => setEditingTransaction({
                ...editingTransaction, 
                name: e.target.value
              })}
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={Math.abs(editingTransaction?.amount || 0)}
              onChange={(e) => setEditingTransaction({
                ...editingTransaction, 
                amount: editingTransaction?.type === 'expense' 
                  ? -Math.abs(parseFloat(e.target.value))
                  : Math.abs(parseFloat(e.target.value))
              })}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={editingTransaction?.category || ''}
                label="Category"
                onChange={(e) => setEditingTransaction({
                  ...editingTransaction, 
                  category: e.target.value
                })}
              >
                {getCategories(editingTransaction?.type).map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setEditingTransaction(null)}
            color="error"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdateTransaction}
            variant="contained" 
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmation} onClose={() => setDeleteConfirmation(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this transaction?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(null)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* No Results Message */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No transactions found
        </div>
      )}
    </div>
  );
}; 