import styled from "styled-components";

const Button = styled.button<{ disabled?: boolean }>`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 36px;
  padding: 8px 32px;
  background-color: #64a98c;
  cursor: pointer;
  height: 56px;
  color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;

  ${(props) =>
    props.disabled &&
    `
    background-color: #ccc;
    cursor: not-allowed;
    color: #666;
  `}
`;

export const ButtonSmall = styled.button<{
  bgcolor?: string;
  color?: string;
}>`
  font-size: 14px;
  font-weight: 600;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 10px 24px;
  background-color: ${(props) => props.bgcolor ?? "none"};
  color: ${(props) => props.color ?? "#000"};
  cursor: pointer;
`;

export default Button;
