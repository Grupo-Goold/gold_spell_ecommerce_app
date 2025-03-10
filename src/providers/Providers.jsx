import { CategoriesProvider } from "../contexts/CategoriesContext/CategoriesContext";
import { InstagramProvider } from "../contexts/InstagramContext/InstagramContext";
import { FavoriteProductsProvider } from "../contexts/favoritesProductsContext/FavoritesProductsContext";
import { OrderTrackingProvider } from "../contexts/orderTrackingContext/OrderTrackingContext";
import { ProductProvider } from "../contexts/productsContext/ProductsContext";

export const Providers = ({ children }) => {
  return (
    <ProductProvider>
      <OrderTrackingProvider>
        <FavoriteProductsProvider>
          <CategoriesProvider>
            <InstagramProvider>{children}</InstagramProvider>
          </CategoriesProvider>
        </FavoriteProductsProvider>
      </OrderTrackingProvider>
    </ProductProvider>
  );
};
