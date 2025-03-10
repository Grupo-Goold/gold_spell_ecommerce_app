import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../global/styles/theme';

const SelectField = ({
  name,
  control,
  label,
  error,
  disabled,
  rules,
  options = [],
  placeholder = 'Selecione',
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View style={[
            styles.selectContainer,
            error && styles.errorSelect,
            disabled && styles.disabledSelect
          ]}>
            <Picker
              {...rest}
              selectedValue={value}
              onValueChange={onChange}
              enabled={!disabled}
              style={styles.select}
            >
              <Picker.Item label={placeholder} value="" />
              {options.map((option) => (
                <Picker.Item 
                  key={option.value} 
                  label={option.label} 
                  value={option.value} 
                />
              ))}
            </Picker>
          </View>
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
  selectContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: '10@s',
    overflow: 'hidden',
  },
  select: {
    fontSize: '14@s',
    height: '44@s',
    width: '100%',
  },
  errorSelect: {
    borderColor: theme.colors.red0,
  },
  disabledSelect: {
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: theme.colors.red0,
    fontSize: '12@s',
  },
});

export default SelectField;