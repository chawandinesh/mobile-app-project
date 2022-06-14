import { T } from '../../translation';

const ModalContentHttp400 = (modalMessage) => {
  return (
    <>
      <svg className="svg-http-error">
        <use href="#svg-modal-error" />
      </svg>
      <h2 id="dialog1_label" className="heading-main">
        <T strProp="error" />
      </h2>
      <p className="modal__text">
        <T strProp="modalErrorHttp400" /> {modalMessage}
      </p>
    </>
  );
};

export { ModalContentHttp400 };
