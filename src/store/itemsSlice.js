import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filteredItems: [],
  filter: { description: '', orderBy: null, orderDirection: 'asc' }, // orderBy: 'sale_price', 'purchase_price', or 'stock'
  filterDescriptionOptions: [],
};

const applyFiltersAndSorting = (state) => {
  const { description, orderBy, orderDirection } = state.filter;

  state.filteredItems = state.items
    .filter(item => item.description.toLowerCase().includes(description.toLowerCase()))
    .sort((a, b) => a.description.localeCompare(b.description));

  if (orderBy) {
    state.filteredItems.sort((a, b) => {
      if (orderDirection === 'asc') {
        return a[orderBy] - b[orderBy];
      } else {
        return b[orderBy] - a[orderBy];
      }
    });
  }

  state.filterDescriptionOptions = [...new Set(state.filteredItems.map(item => item.description))].sort();
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      applyFiltersAndSorting(state);
    },

    setItemsFilter: (state, action) => {
      const { type, value } = action.payload;
      state.filter[type] = value;
      applyFiltersAndSorting(state);
    },

    addItem: (state, action) => {
      state.items.push(action.payload);
      applyFiltersAndSorting(state);
    },

    updateItem: (state, action) => {
      const { id, updates } = action.payload;
      state.items = state.items.map(item =>
        item._id === id ? { ...item, ...updates } : item
      );
      applyFiltersAndSorting(state);
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
      applyFiltersAndSorting(state);
    },
  },
});

export const { setItems, setItemsFilter, addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;

