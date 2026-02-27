import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>CozyKnots Admin</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/add-product" style={styles.link}>Add Product</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#ff7a00",
    color: "white"
  },
  logo: {
    margin: 0
  },
  link: {
    color: "white",
    marginLeft: "20px",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Navbar;