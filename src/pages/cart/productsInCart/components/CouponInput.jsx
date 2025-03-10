import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useCartStore from '../../../../store/cartStore';
import useCartFormStore from '../../../../store/cartFormStore';
import api from '../../../../services/api';
import { Button } from '../../../../components/Button/Button';
import InputField from '../../../../components/InputField';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../../../global/styles/theme';
import Toast from 'react-native-toast-message';

export const CouponInput = () => {
	const { applyCoupon, removeCoupon } = useCartStore();
	const { setFormData } = useCartFormStore();

	const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, watch, setValue, reset } = useForm();
	const couponValue = watch('coupon_name', '');

	const onSubmit = async (data) => {
		setIsLoading(true);
		try {
			const response = await api
				.get(`/coupons/validate/${data.coupon_name}`)
				.then((res) => {
					return res.data;
				});
			applyCoupon({
				coupon_name: response.coupon_name,
				discount: response?.discount,
				products: response?.products,
			});
			setFormData({
				coupon: response.coupon_name,
			});
			Toast.show({
				type: 'sucessoToast',
				text1: 'Cupom aplicado com sucesso',
				visibilityTime: 3000,
			});
		} catch (error) {
			console.log(error);
			setFormData({
				coupon: '',
			});
			setValue('coupon_name', '');
			reset();
			removeCoupon();
			Toast.show({
				type: 'erroToast',
				text1: 'Cupom inválido',
				visibilityTime: 3000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styled.container}>
			<InputField
				control={control}
				name="coupon_name"
				placeholder="Cupom de desconto"
				styleInput={{
					borderWidth: 0,
					padding: 0,
					marginBottom: 12,
				}}
			/>

            <Button
                title='Aplicar'
				height={32}
                loading={isLoading}
                onPress={handleSubmit(onSubmit)}
                disabled={!couponValue}
				aditionalStyle={{
					width: '30%',
					padding: 2,
					fontSize: 12,
			}}
            />
        </View>
	);
};

const styled = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: '11@s',
        gap: '4@s',
		paddingHorizontal: '8@s',
		paddingVertical: '0@s',
		marginTop: '10@s',
		height: '48@s',
    }
});