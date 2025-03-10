import { InstagramProvider } from "../contexts/InstagramContext/InstagramContext";
import { FavoriteProductsProvider } from "../contexts/favoritesProductsContext/FavoritesProductsContext";
import { ProductProvider } from "../contexts/productsContext/ProductsContext";

export const Providers = ({ children }) => {
  return (
    <ProductProvider>
      <FavoriteProductsProvider>
        <InstagramProvider>{children}</InstagramProvider>
      </FavoriteProductsProvider>
    </ProductProvider>
  );
};
