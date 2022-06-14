import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../contexts/globalContext';
import { globalActionsTypes } from './globalReducer';

/**
 * currently only used for http errors
 * @param statuses
 */
const UseHttpModalHook = () => {
  const { dispatch } = useContext(GlobalContext);

  const [statuses, setStatuses] = useState(false);

  useEffect(() => {
    if (!statuses) {
      return;
    }

    const { status, statusText } = statuses;
    let isModalOpen;
    let modalMessage;

    if (status === 400) {
      isModalOpen = 'ModalContentHttp400';
      modalMessage = statusText;
    } else {
      isModalOpen = 'ModalContentHttpOther';
    }
    dispatch({
      type: globalActionsTypes.setModal,
      data: { isModalOpen, modalMessage }
    });
  }, [statuses, dispatch]);

  return setStatuses;
};

export { UseHttpModalHook };
