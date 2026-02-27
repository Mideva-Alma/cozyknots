import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import Products from "../../pages/Products";

test("Products shows loading message when loading is true", () => {
  render(
    <ProductContext.Provider
      value={{ products: [], setProducts: () => {}, loading: true }}
    >
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    </ProductContext.Provider>
  );

  expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
});

test("Search filters products by name", async () => {
  const user = userEvent.setup();

  const mockProducts = [
    {
      id: 1,
      name: "Boho Crochet Dress",
      category: "Dress",
      price: 4500,
      description: "Elegant",
    },
    {
      id: 2,
      name: "Crochet Summer Top",
      category: "Shirt",
      price: 2500,
      description: "Lightweight",
    },
  ];

  render(
    <ProductContext.Provider
      value={{ products: mockProducts, setProducts: () => {}, loading: false }}
    >
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    </ProductContext.Provider>
  );

  const searchBox = screen.getByPlaceholderText(
    /Search by name, category, or description/i
  );

  await user.type(searchBox, "dress");

  expect(screen.getByText(/Boho Crochet Dress/i)).toBeInTheDocument();
  expect(screen.queryByText(/Crochet Summer Top/i)).not.toBeInTheDocument();
});