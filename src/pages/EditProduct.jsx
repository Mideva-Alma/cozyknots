import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Product</h1>
      <p>Editing product with ID: {id}</p>
    </div>
  );
}

export default EditProduct;