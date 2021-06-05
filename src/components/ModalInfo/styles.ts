import styled, { css } from 'styled-components';

interface IBackdropContainer {
  visible?: boolean;
  alignModal?: 'flex-start' | 'center' | 'flex-end';
}

interface IAlignModal {
  alignModal?: 'flex-start' | 'center' | 'flex-end';
  scrollView?: boolean;
}
interface IBtnClose {
  visible?: boolean;
}

export const BackdropContainer = styled.div<IBackdropContainer>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 3;
  background: #1e1e1e45;

  align-items: ${(props) => (props.alignModal ? props.alignModal : 'center')};

  ${(props) =>
    props.visible === false &&
    css`
      display: none;
    `};
`;

export const Container = styled.div<IAlignModal>`
  position: relative;
  max-width: 50rem;
  width: 100%;
  min-height: 25%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0rem 0.3rem 0.6rem #0000000f;
  background: #fff;
  padding: 1.5rem 3rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 5;

  ${(props) =>
    props.alignModal === 'flex-end' &&
    css`
      margin-bottom: -0.7rem;
    `}

  ${(props) =>
    props.scrollView === true &&
    css`
      display: block;
      overflow-y: auto;
      max-height: 75%;
    `}
`;

export const BtnClose = styled.div<IBtnClose>`
  position: absolute;
  top: 1.5rem;
  right: 3rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
  border-radius: 50%;

  ${(props) =>
    props.visible === false &&
    css`
      display: none;
    `}
`;
