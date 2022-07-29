import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../../theme/theme'

const THUMB_RADIUS = 12;

const Thumb = () => {
  return (
    <View style={styles.root}/>
  );
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: theme.colors.threePalet.primary,
    backgroundColor: theme.colors.threePalet.primary,
  },
});

export default memo(Thumb);