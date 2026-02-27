import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useProducts from "../hooks/useProducts";

const API_URL = "http://localhost:3001/products";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProducts } = useProducts();

  const nameInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        if (!isMounted) return;
        const product = res.data;

        setForm({
          name: product.name ?? "",
          category: product.category ?? "",
          price: product.price ?? "",
          description: product.description ?? "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
        alert("Could not load product. Make sure json-server is running.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!loading && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.category.trim() || !String(form.price).trim()) {
      alert("Name, Category, and Price are required.");
      return;
    }

    const patchData = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      description: form.description.trim(),
    };

    setSaving(true);
    try {
      await axios.patch(`${API_URL}/${id}`, patchData);
      await fetchProducts();
      alert("Product updated successfully!");
      navigate("/products");
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p style={{ padding: "30px" }}>Loading product...</p>;
  }

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Edit Product</h1>

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label style={labelStyle}>
          Product Name
          <input
            ref={nameInputRef}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g. Crochet Summer Top"
          />
        </label>

        <label style={labelStyle}>
          Category
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g. Dress, Shirt, Hat"
          />
        </label>

        <label style={labelStyle}>
          Price (KSh)
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g. 2500"
          />
        </label>

        <label style={labelStyle}>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ ...inputStyle, height: "90px", resize: "vertical" }}
            placeholder="Short description..."
          />
        </label>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              ...btnStyle,
              backgroundColor: saving ? "#ffb347" : "#ff7a00",
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/products")}
            style={{ ...btnStyle, backgroundColor: "#e66900" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontWeight: 600,
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const btnStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold",
  flex: 1,
};

export default EditProduct;