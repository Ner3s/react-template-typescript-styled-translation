import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  cursor: pointer;

  span {
    pointer-events: none;
    width: 160px;
    background: #c53030;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;

    text-align: center;

    position: absolute;
    bottom: calc(100% + 12px);
    left: -40%;
    transform: translateX(-50%);

    color: #ffffff;
    cursor: text;

    @media (min-width: 768px) {
      left: 50%;
    }

    /* Fazer a FLEXA */
    &::before {
      pointer-events: visible;
      content: '';
      border-style: solid;
      border-color: #c53030 transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      top: 100%;
      position: absolute;
      left: 62%;
      transform: translateX(-50%);

      @media (min-width: 768px) {
        left: 50%;
      }
    }
  }

  &:hover span {
    opacity: 1;
    pointer-events: visible;
  }
`;
