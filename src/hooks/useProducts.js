import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function useProducts() {
  const ctx = useContext(ProductContext);

  if (!ctx) {
    throw new Error("useProducts must be used inside a ProductProvider");
  }

  return ctx;
}