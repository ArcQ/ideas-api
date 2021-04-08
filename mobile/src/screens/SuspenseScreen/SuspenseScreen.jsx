import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
const Title = styled.Text`
  color: #000;
  text-align: center;
  font-size: 16px;
`;
export default function SuspenseScreen() {
  return (
    <Container>
      <Title>Loading</Title>
    </Container>
  );
}
