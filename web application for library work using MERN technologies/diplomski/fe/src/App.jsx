import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import SingleBook from "./components/SingleBook";
import AddClient from "./components/AddClient";
import ClientList from "./components/ClientList";
import SingleClient from "./components/SingleClient";
import Login from "./components/Login";
import RentBook from "./components/RentBook";
import ReturnBook from "./components/ReturnBook";
import Profile from "./components/Profile";
import About from "./components/About";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<PrivateRoute component={Profile} />}
          />
          <Route path="/about" element={<PrivateRoute component={About} />} />
          <Route
            path="/books"
            element={<PrivateRoute component={BookList} />}
          />
          <Route
            path="/books/add"
            element={<AdminRoute component={AddBook} />}
          />
          <Route
            path="/rent-book"
            element={<AdminRoute component={RentBook} />}
          />
          <Route
            path="/return-book"
            element={<AdminRoute component={ReturnBook} />}
          />
          <Route
            path="/books/:bookId"
            element={<PrivateRoute component={SingleBook} />}
          />
          <Route
            path="/clients"
            element={<AdminRoute component={ClientList} />}
          />

          <Route
            path="/clients/add"
            element={<AdminRoute component={AddClient} />}
          />
          <Route
            path="/clients/:clientId"
            element={<AdminRoute component={SingleClient} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
