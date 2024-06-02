// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signedin, setSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, []);

  const login = async (token) => {
    try {
      const response = await fetch(
        "https://posapp1-hg6w-kpues2kdx-samyukthaas-projects.vercel.app/user/profile",
        {
          headers: { authorization: token },
        }
      );
      const data = await response.json();
      const userdet = data.user.rows[0];
      if (userdet.role === "admin") {
        setIsAdmin(true);
      }
      setUser(userdet);
      setSignedIn(true);
      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setSignedIn(false);
    setUser(null);
  };

  const addToCart = async (product, quantity) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...product, quantity }];
        return newCart;
      }
    });
    try {
      const response = await fetch(
        "https://posapp1-hg6w-kpues2kdx-samyukthaas-projects.vercel.app/cart/addtocart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product.id,
            product_name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Product added to cart in backend:", data);
    } catch (error) {
      console.error("Error adding to cart in backend:", error);
    }
  };

  const contextValue = {
    user,
    login,
    logout,
    signedin,
    setUser,
    setSignedIn,
    cart,
    setCart,
    addToCart,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
