import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../global/styles/theme';

const InputField = ({
  name,
  control,
  label,
  error,
  disabled,
  rules,
  styleInput,
  onChangeText,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...rest}
            value={value}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text); // Update form state
              if (onChangeText) onChangeText(text); // Call custom handler if provided
            }}
            style={[
              styles.input,
              styleInput,
              error && styles.errorInput,
              disabled && styles.disabledInput
            ]}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginBottom: '8@s',
  },
  label: {
    fontSize: '14@s',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: '10@s',
    padding: '8@s',
    fontSize: '14@s',
  },
  errorInput: {
    borderColor: theme.colors.red0,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  errorText: {
    color: theme.colors.red0,
    fontSize: '12@s',
  },
});

export default InputField;
