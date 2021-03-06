import styled from 'styled-components';

const Card = styled.div`
  box-sizing: border-box;
  max-width: 50%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background: linear-gradient(to bottom, #6371c7, #5563c1);
  border-color: #3f4eae;
  border-radius: 3px;
  padding: 1rem;
  color: white;
  font-weight: 700;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Logo = styled.img`
  width: 80%;
  margin-bottom: 1rem;
`;

const Error = styled.div`
  background-color: crimson;
  padding: 10px;
`;

const LinkHeaderContainer = styled.div`
    max-width: fit-content;
    margin: 10px auto;
    padding: 10px;
    background-color: aliceblue;
`;

const LinkHeaderItem = styled.div`
    padding: 5px;
`;

const BodyText = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: large;
`;

export {Form, Input, Button, Logo, Card, Error, LinkHeaderContainer, LinkHeaderItem, BodyText};