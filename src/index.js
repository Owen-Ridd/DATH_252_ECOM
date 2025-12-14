import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import store from "./store";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./routes/AppRoutes"; // <--- Chỉ cần import cái này

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <AppRoutes /> {/* Gọi Router đã tách */}
      </Provider>
    </ScrollToTop>
    <Toaster />
  </BrowserRouter>
);