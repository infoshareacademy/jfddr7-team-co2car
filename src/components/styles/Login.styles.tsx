import styled from "styled-components";

export const StyledLogin = styled.div`
  background: url("https://upload.wikimedia.org/wikipedia/commons/5/5c/G%C3%A4vle%2C_Sweden_%28Unsplash%29.jpg");
  background-size: cover;
  min-height: calc(100vh - (64px + 2em));
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
