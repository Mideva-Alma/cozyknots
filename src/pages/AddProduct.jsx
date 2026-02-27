import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !category || !price || !description) {
      alert("Please fill in all fields");
      return;
    }

    const newProduct = {
      name,
      category,
      price: Number(price),
      description,
    };

    try {
      await axios.post("http://localhost:3001/products", newProduct);
      alert("Product added successfully!");
      navigate("/products"); // redirect to products page
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div style={{
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "70vh"
    }}>
      <h1>Add New Crochet Product</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px", gap: "15px", width: "100%" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Category (Shirt, Dress, etc.)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: "80px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#ff7a00",
            color: "white",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

export default AddProduct;