import React, { useEffect, useRef } from 'react';
import { View, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const CustomSwitch = ({ 
  value, 
  onValueChange, 
  activeTrackColor = '#4CD964', 
  inactiveTrackColor = '#d9d9d9',
  thumbColor = '#FFFFFF',
  containerStyle,
  disabled = false
}) => {
  const switchAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(switchAnimation, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, switchAnimation]);

  const translateX = switchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 20], // Ensures thumb stays within container
  });

  const trackBackgroundColor = switchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveTrackColor, activeTrackColor],
  });

  const toggleSwitch = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <View style={[styles.container, containerStyle, { opacity: disabled ? 0.5 : 1 }]}>
        <Animated.View 
          style={[
            styles.track, 
            { backgroundColor: trackBackgroundColor }
          ]}
        />
        <Animated.View 
          style={[
            styles.thumb,
            { transform: [{ translateX }], backgroundColor: thumbColor }
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: '32@s',
    height: '16@s',
    position: 'relative',
  },
  track: {
    width: '100%',
    height: '100%',
    borderRadius: '50@s',
  },
  thumb: {
    position: 'absolute',
    width: '12@s',
    height: '12@s',
    borderRadius: '12@s',
    top: '2@s',
    elevation: '2@s',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export default CustomSwitch;