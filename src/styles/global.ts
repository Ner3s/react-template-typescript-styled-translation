import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root{
    --primary: #222;
    --secondary: #444;
    --text-primary: #888;
    --text-input: #454545;
  }

  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }


  html {
    font-size: 62.5%; /* 1rem = 10px */
    height: 100%;

    @media (min-width: 1981px) {
      font-size: 80%;
    };
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: ${({ theme }) => theme.font.sizes.medium};
  }

  a {
    text-decoration: none;
    transition: opacity 300ms ease-in-out;

    &:hover {
      opacity: .6;
    }
  }
`;
