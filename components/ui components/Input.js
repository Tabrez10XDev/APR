import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../../contants';
import { useTheme } from '@react-navigation/native';
function Input({
  title,
  placeholder,
  titleStyle,
  inputStyle,
  onChangeText,
  value,
  maxLength,
  textprops,
  numberOfLines,
  inputprops,
  onBlur,
  onFocus,
  inputType,
  autoFocus,
  Descriptioninput,
  SearchHomeTab,
  editable = true
}) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { width: '100%' },
        title_style: {
          width: '100%',
          fontSize: 14,
          color: colors.tundora,
          fontWeight: '400',
          marginBottom: 6,
          borderWidth:0,
          ...titleStyle,
        },
        input_style: {
          paddingHorizontal: 12,
          width: '90%',
          paddingTop: 12,
          paddingBottom: 7,
          height: 47,
          alignSelf:'center',
          color: COLORS.gray_text_color,
          fontSize: 16,
          fontFamily: FONTS.medium,
          borderRadius: 7,
          borderWidth:0,
          borderColor:'white',
          backgroundColor: 'white',
          shadowColor: "grey",
          shadowOffset: {
            width: 0 ,
            height: Platform.OS === 'ios' ? 2 : 25,
          },
          shadowOpacity: 0.3,
          shadowRadius: Platform.OS === 'ios' ? 2 : 25,
          elevation: Platform.OS === 'ios' ? 1 : 2,
          ...Descriptioninput,
          ...SearchHomeTab,
          ...inputStyle,

        },
       
      }),
    [title, titleStyle, inputStyle, colors],
  );
  return (
    <View style={styles.container}>

      <TextInput
        editable={editable}
        placeholderTextColor={COLORS.gray_text_color}
        style={styles.input_style}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        keyboardType={!inputType ? 'default' : inputType}
        selectionColor={colors.red}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        autoFocus={autoFocus}
        {...inputprops}
      />
    </View>
  );
}

Input.defaultProps = {
  title: '',
  placeholder: '',
  titleStyle: {},
  inputStyle: {},
  onChangeText: () => { },
  onFocus: () => { },
  onBlur: () => { },
  value: '',
  textprops: {},
  inputprops: {},
  inputType: null,
};

Input.propTypes = {
  title: propTypes.string,
  placeholder: propTypes.string,
  titleStyle: propTypes.shape({}),
  inputStyle: propTypes.shape({}),
  onChangeText: propTypes.func,
  value: propTypes.string,
  textprops: propTypes.object,
  inputprops: propTypes.object,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  inputType: propTypes.any,
};

export default Input;
