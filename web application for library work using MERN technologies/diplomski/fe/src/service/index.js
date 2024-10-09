import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api";

// DOHVATI SVE KNJIGE IZ BAZE
export const getAllBooks = async () => {
  try {
    const response = await axios.get("/books");

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

//BRISANJE KNJIGE
export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`/books/${bookId}`);
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error deleting book:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// DOHVATI JEDNU KNJIGU
export const getBook = async (bookId) => {
  try {
    const response = await axios.get(`/books/${bookId}`);

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// DODAJ NOVU KNJIGU
export const addBook = async (book) => {
  try {
    const response = await axios.post("/books", book, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error adding book:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
// IZMENI KNJIGU
export const updateBook = async (bookId, updatedBook) => {
  try {
    const response = await axios.put(`/books/${bookId}`, updatedBook);
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error updating book:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const rentBook = async (bookId, clientId, rentedAt) => {
  try {
    const response = await axios.post(`/rent-book/${bookId}`, {
      userId: clientId,
      rentedAt,
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || error.message,
    };
  }
};

export const returnBook = async (bookId, userId, returnedAt) => {
  try {
    const response = await axios.post(`/return-book/${bookId}`, {
      userId,
      returnedAt,
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.messages || error.message,
    };
  }
};

// DOHVATI SVE KLIJENTE IZ BAZE
export const getAllClients = async () => {
  try {
    const response = await axios.get("/clients");
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching clients:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// BRISANJE KLIJENTA
export const deleteClient = async (clientId) => {
  try {
    const response = await axios.delete(`/clients/${clientId}`);
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error deleting client:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// DOHVATI JEDNOG KLIJENTA
export const getClient = async (clientId) => {
  try {
    const response = await axios.get(`/clients/${clientId}`);
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching client:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// DODAJ NOVOG KLIJENTA
export const addClient = async (client) => {
  try {
    const response = await axios.post("/clients", client);
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error adding client:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// IZMENI KLIJENTA
export const updateClient = async (clientId, updatedClient) => {
  try {
    const response = await axios.put(`/clients/${clientId}`, updatedClient);
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error updating client:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
//Login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/login", { email, password });
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      status: "error",
      message: error.response?.data?.message || "Nešto je pošlo po zlu.",
    };
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("user");

    return {
      status: "success",
      data: true,
    };
  } catch (error) {
    console.error("Error logging out:", error);
    return {
      status: "error",
      message: error.response?.data?.message || "Nešto je pošlo po zlu.",
    };
  }
};
