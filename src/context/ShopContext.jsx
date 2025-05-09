import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = `$`;
  const deliveryFee = 10;
  const backendUrl = "https://jedida-backend.onrender.com";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, measurements, groupSize) => {
    console.log("typeof measurements:", typeof measurements);
    console.log("Array.isArray(measurements):", Array.isArray(measurements));
    console.log("measurements:", measurements);

    // Ensure measurements is always an array
    if (measurements && !Array.isArray(measurements)) {
      measurements = [measurements]; // Wrap measurements in an array if it's an object
    }

    if (!measurements || measurements.length === 0) {
      toast.error("Enter all product measurements");
      return;
    }

    // Generate size key: join all individual measurement values
    const sizeKey = measurements
      .map((m) => Object.values(m).join("_")) // join values from each measurement object
      .join("-"); // join all measurement objects in the array

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Update cart quantity or add new entry
    if (cartData[itemId][sizeKey]) {
      cartData[itemId][sizeKey].quantity += 1;
    } else {
      cartData[itemId][sizeKey] = {
        quantity: groupSize || 1,
        measurements,
      };
    }

    setCartItems(cartData);
    // toast.success("Added to cart");

    // Send cart data to the backend if a token is available
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          {
            itemId,
            measurements,
            groupSize,
            sizeKey,
          },
          {
            headers: { token },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item].quantity > 0) {
            totalCount += cartItems[items][item].quantity;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, sizeKey, quantity) => {
    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) return;

    if (quantity === 0) {
      delete cartData[itemId][sizeKey];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][sizeKey].quantity = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, sizeKey, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item].quantity > 0) {
            totalAmount += itemInfo.price * cartItems[items][item].quantity;
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      toString.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken); // use directly here instead of waiting for setToken
    }
  }, []);
  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
