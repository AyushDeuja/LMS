import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/themeContext.tsx";
import { BookProvider } from "./context/booksContext";
import { MemberProvider } from "./context/membersContext.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <BookProvider>
          <MemberProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </MemberProvider>
        </BookProvider>
      </ThemeProvider>
      <ToastContainer
        autoClose={500}
        pauseOnHover={true}
        position="top-right"
      />
    </BrowserRouter>
  </StrictMode>
);
