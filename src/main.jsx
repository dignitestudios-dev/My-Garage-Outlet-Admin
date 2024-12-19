import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContext.jsx";
import { store } from "./features/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </GlobalContextProvider>
    </BrowserRouter>
  </StrictMode>
);
