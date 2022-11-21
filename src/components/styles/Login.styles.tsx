import styled from "styled-components";

export const StyledLogin = styled.div`
  background: url("https://upload.wikimedia.org/wikipedia/commons/5/5c/G%C3%A4vle%2C_Sweden_%28Unsplash%29.jpg");
  background-size: cover;
  width: 100%;
  display: flex;
  justify-content: space-between;

  form {
    min-width: 400px;
    max-width: 400px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    form {
      max-width: initial;
      min-width: initial;
    }
  }
`;
