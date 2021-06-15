import React from 'react';
import styled from 'styled-components/native';
import propTypes from 'prop-types';

const TRANSPARENT = 'transparent';

const Container = styled.TouchableOpacity`
  background-color: ${({ theme, isFilled }) =>
    isFilled ? theme.buttonBackground : TRANSPARENT};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  align-items: center;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
`;

const Title = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ theme, isFilled }) =>
    isFilled ? theme.buttonTitle : theme.buttonUnfilledTitle};
`;

const Button = ({ containerStyle, title, onPress, isFilled, disabled }) => {
  return (
    <Container
      style={containerStyle}
      onPress={onPress}
      isFilled={isFilled}
      disabled={disabled}
    >
      <Title isFilled={isFilled}>{title}</Title>
    </Container>
  );
};

Button.defaultProps = {
  isFilled: true,
};

Button.propTypes = {
  containerStyle: propTypes.object,
  title: propTypes.string,
  onPress: propTypes.func.isRequired,
  isFilled: propTypes.bool,
  disabled: propTypes.bool,
};

export default Button;