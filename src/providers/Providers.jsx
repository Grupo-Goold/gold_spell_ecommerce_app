import { FavoriteProductsProvider } from "../contexts/favoritesProductsContext/FavoritesProductsContext";
import { ProductProvider } from "../contexts/productsContext/ProductsContext";

export const Providers = ({ children }) => {
  return (
    <ProductProvider>
      <FavoriteProductsProvider>
        {children}
      </FavoriteProductsProvider>
    </ProductProvider>
  );
};
