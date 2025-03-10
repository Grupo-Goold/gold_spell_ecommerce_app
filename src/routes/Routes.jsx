import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductsInCart } from '../pages/cart/productsInCart/ProductsInCart';
import { Step1Info } from '../pages/cart/step1Info/Step1Info';
import { Step2Delivery } from '../pages/cart/step2Delivery/Step2Delivery';
import { Step3Payment } from '../pages/cart/step3Payment/Step3Payment';
import { Favorites } from '../pages/favorites/Favorites';
import { FavoritesSearch } from '../pages/favorites/components/favoritesSearch/FavoritesSearch';
import { InitialScreen } from '../pages/home/initialScreen/InitialScreen';
import { Reviews } from '../pages/home/reviews/Reviews';
import { OrderTracking } from '../pages/order_tracking/OrderTracking';
import { ProductView } from '../pages/productView/ProductView';
import { Return } from '../pages/return/Return';
import { Step1 } from '../pages/return/components/modal/Step1';
import { Step2 } from '../pages/return/components/modal/Step2';
import { Step3 } from '../pages/return/components/modal/Step3';
import { Step4 } from '../pages/return/components/modal/Step4';
import { Step5 } from '../pages/return/components/modal/Step5';
import { Step6 } from '../pages/return/components/modal/Step6';
import { Step7 } from '../pages/return/components/modal/Step7';
import { Step8 } from '../pages/return/components/modal/Step8';
import { Step9 } from '../pages/return/components/modal/Step9';

const Stack = createNativeStackNavigator();
const ReturnModalStack = createNativeStackNavigator();

function ReturnCreateModalNavigator() {
	return (
	  <ReturnModalStack.Navigator
		screenOptions={{
			headerShown: false,
			animation: 'none',
			presentation: 'modal',
			cardStyle: { backgroundColor: 'transparent' },
			cardOverlayEnabled: true,
			contentStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
			detachPreviousScreen: false
		}}
	  >
		<ReturnModalStack.Screen name="Step1" component={Step1} />
		<ReturnModalStack.Screen name="Step2" component={Step2} />
		<ReturnModalStack.Screen name="Step3" component={Step3} />
		<ReturnModalStack.Screen name="Step4" component={Step4} />
		<ReturnModalStack.Screen name="Step5" component={Step5} />
		<ReturnModalStack.Screen name="Step6" component={Step6} />
		<ReturnModalStack.Screen name="Step7" component={Step7} />
		<ReturnModalStack.Screen name="Step8" component={Step8} />
		<ReturnModalStack.Screen name="Step9" component={Step9} />
	  </ReturnModalStack.Navigator>
	);
  }

export const Routes = () => {
	return (
		<Stack.Navigator
			initialRouteName="InitialScreen"
			screenOptions={{
				headerShown: false,
				animation: 'none',
			}}
		>
			<Stack.Screen name="InitialScreen" component={InitialScreen} />
			<Stack.Screen name="ShoppingCart" component={ProductsInCart} />
			<Stack.Screen name="Step1Info" component={Step1Info} />
			<Stack.Screen name="Step2Delivery" component={Step2Delivery} />
			<Stack.Screen name="Step3Payment" component={Step3Payment} />
			<Stack.Screen name="Favorites" component={Favorites} />
			<Stack.Screen name="OrderTracking" component={OrderTracking} />
			<Stack.Screen name="Return" component={Return} />
			<Stack.Screen 
				name="ReturnCreateModal" 
				component={ReturnCreateModalNavigator}
				options={{ 
					headerShown: false, 
					presentation: 'transparentModal',
					contentStyle: { backgroundColor: 'transparent' },
				}}
			/>
			<Stack.Screen name="ProductView" component={ProductView} />
			<Stack.Screen name="Reviews" component={Reviews} />
			<Stack.Screen name="FavoritesSearch" component={FavoritesSearch} />
		</Stack.Navigator>
	);
};
