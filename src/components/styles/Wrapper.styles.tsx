import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .mainContent {
    flex-grow: 1;
  }

  @media screen and (max-width: 768px) {
    .bigScreenOnly {
      display: none;
    }
  }

  @media screen and (min-width: 769px) {
    .smallScreenOnly {
      display: none;
    }
  }
`;
