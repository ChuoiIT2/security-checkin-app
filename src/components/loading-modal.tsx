import { Modal, Spin } from 'antd';

type LoadingModalProps = {
  isModalVisible: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingModal = (props: LoadingModalProps) => {
  return (
    <Modal
      open={props.isModalVisible}
      footer={null}
      style={{}}
      closeIcon={null}
    >
      <Spin />
    </Modal>
  );
};

export default LoadingModal;
