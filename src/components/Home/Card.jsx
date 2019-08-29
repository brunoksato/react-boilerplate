import React from "react";
import styled from "styled-components";

const Card = props => {
  return (
    <Cards title={props.title}>
      <FlexContent>
        <Box>
          <Title>{props.title}</Title>
          <Value>{props.value}</Value>
        </Box>
        <BoxIcon color={props.color}>
          <Icon src={props.icon} />
        </BoxIcon>
      </FlexContent>
    </Cards>
  );
};

export default Card;

const Cards = styled.div`
  background: #fff;
  height: 120px;
  border-radius: 0.6em;
  padding: 1rem 1.5rem;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
`;

const FlexContent = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
    margin-top: 0em;
    align-items: center;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    text-align: center;
  }
`;

const Title = styled.div`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Value = styled.div`
  font-size: 22px;
  @media (max-width: 600px) {
    font-size: 19px;
  }
`;

const BoxIcon = styled.div`
  width: 65px;
  height: 65px;
  background: ${props => props.color};
  border-radius: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    margin-top: 0.5em;
    width: 50px;
    height: 50px;
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;
