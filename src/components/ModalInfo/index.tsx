/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
  useRef,
  CSSProperties,
  ReactElement,
  ReactNode,
} from 'react';

import { Container, BackdropContainer, BtnClose } from './styles';

type TAlignModal = 'flex-start' | 'center' | 'flex-end';
type TScrollView = boolean;

interface IModalProps {
  btnClose?: boolean;
  modalVisible: boolean;
  setModalVisible(param: boolean): void;
  alignModal?: TAlignModal;
  scrollView?: TScrollView;
  containerStyle?: CSSProperties;
  children?: ReactNode;
}

function ModalInfo({
  btnClose = false,
  modalVisible = false,
  alignModal = 'center',
  scrollView = false,
  setModalVisible,
  children,
  containerStyle,
}: IModalProps): ReactElement {
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setModalVisible(modalVisible);
  }, [modalVisible, setModalVisible]);

  const handleModalVisible = useCallback(
    e => {
      if (e.target === backdrop.current) {
        setModalVisible(!modalVisible);
      }
    },
    [modalVisible, setModalVisible],
  );

  return (
    <>
      <BackdropContainer
        ref={backdrop}
        visible={modalVisible}
        alignModal={alignModal}
        onClick={handleModalVisible}
      >
        <Container
          alignModal={alignModal}
          scrollView={scrollView}
          style={containerStyle}
        >
          <BtnClose
            visible={btnClose}
            onClick={() => setModalVisible(!modalVisible)}
          >
            &times;
          </BtnClose>
          {children}
        </Container>
      </BackdropContainer>
    </>
  );
}

export default ModalInfo;
