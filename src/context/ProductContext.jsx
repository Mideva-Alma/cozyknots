import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext(null);

const API_URL = "http://localhost:3001/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, loading, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}