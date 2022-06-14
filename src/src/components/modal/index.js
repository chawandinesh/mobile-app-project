import { T } from "../translation/index";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../contexts/globalContext";
import { globalActionsTypes } from "../../hooks/globalReducer";
import * as modalContent from "./modalContent";

/**
 * all modal content components must have an h2 with an id
 * of dialog1_label
 *
 * note tabIndex="-1" to make element focusable.  Required as we
 * need to prevent users from tabbing through the page behind
 * the modal
 */
const Modal = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const contentRef = useRef(null);
  const { isModalOpen, modalMessage } = state;

  useEffect(() => {
    function keyListener(evt) {
      const { keyCode } = evt;
      evt.stopPropagation();
      // allows users to close using escape key
      if (keyCode && keyCode === 27) {
        dispatch({
          type: globalActionsTypes.closeModal
        });
        return;
      }

      if (keyCode === 9) {
        // else get all the focusable elements within the content
        const focusableModalElements = contentRef.current.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );

        const firstElement = focusableModalElements[0];
        const lastElement =
          focusableModalElements[focusableModalElements.length - 1];

        // if we only have one focusable element don't do anything
        if (focusableModalElements.length === 1) {
          firstElement.focus();
          evt.preventDefault();
          return;
        }

        if (!evt.shiftKey && document.activeElement !== firstElement) {
          firstElement.focus();
          evt.preventDefault();
          return;
        }

        if (evt.shiftKey && document.activeElement !== lastElement) {
          lastElement.focus();
          evt.preventDefault();
          return;
        }
      }
    }

    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  });

  /**
   * allows users to close the modal
   * either by clicking the close button or using escape or enter keys
   * @param evt
   */
  const onClose = (evt) => {
    // stop the propagation otherwise multiple events will fire
    evt.stopPropagation();
    dispatch({
      type: globalActionsTypes.closeModal
    });
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus();
    }
  }, [contentRef]);

  return state.isModalOpen ? (
    <div className="modal-background">
      <div
        role="dialog"
        id="dialog1"
        aria-labelledby="dialog1_label"
        aria-modal="true"
        className="modal"
      >
        <div className="modal__content" tabIndex="-1" ref={contentRef}>
          {modalContent[isModalOpen] ? (
            modalContent[isModalOpen](modalMessage)
          ) : (
            <p>Something went wrong</p>
          )}
          <button className="btn" onClick={onClose}>
            <span className="visually-hidden">
              <T strProp="modalClose" />
            </span>
            <T strProp="modalCloseButtonText" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};

export { Modal };
