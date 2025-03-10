import { ProductProvider } from "../contexts/productsContext/ProductsContext";

export const Providers = ({ children }) => {
  return (
    <ProductProvider>
      {children}
    </ProductProvider>
  );
};
