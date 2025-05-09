import { createSlice } from "@reduxjs/toolkit";

interface Book {
  title?: string;
  author?: string;
  id?: number;
  quantity?: number;
  availability?: boolean;
  book_img?: string;
}

interface BooksInitialState {
  data: Book[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BooksInitialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state) => {
      state.data = [
        {
          id: 1,
          title: "New Book",
          author: "Author",
        },
      ];
    },
  },
});
