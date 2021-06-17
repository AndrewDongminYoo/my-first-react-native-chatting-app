import React from 'react';
import { useState, forwardRef } from 'react';
import styled from 'styled-components/native';
import propTypes from 'prop-types';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0px;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme, isFocused }) => (isFocused ? theme.text : theme.label)};
`;

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholerTextColor: theme.inputPlaceholder,
}))`
    background-color: ${({ theme, editable }) =>
      editable ? theme.background : theme.inputDisableBackground};
    color: ${({ theme }) => theme.text};
    padding: 20px 10px;
    font-size: 16px;
    border: 1px solid
      ${({ theme, isFocused }) => (isFocused ? theme.text : theme.label)};
    border-radius: 4px;
  `

const Input = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      plcaeholder,
      isPassword,
      returnKeyType,
      maxLength,
      disabled,
    },
    ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Container>
        <Label isFocused={isFocused}>{label}</Label>
        <StyledTextInput
          ref={ref}
          isFocused={isFocused}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onFocus={()=> setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          plcaeholder={plcaeholder}
          secureTextEntry={isPassword}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          underlineColorAndroid="transparent"
          editable={!disabled}
        />
      </Container>
    );
  }
);

Input.defaultProps = {
  onBlur: () => {},
  onChangeText: () => {},
  onSubmitEditing: () => {},
};

Input.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChangeText: propTypes.func.isRequired,
  onSubmitEditing: propTypes.func.isRequired,
  onBlur: propTypes.func,
  onChangeText: propTypes.func,
  onSubmitEditing: propTypes.func,
  plcaeholder: propTypes.string,
  isPassword: propTypes.bool,
  disabled: propTypes.bool,
  returnKeyType: propTypes.oneOf(['done', 'next']),
  maxLength: propTypes.number,
};

export default Input;