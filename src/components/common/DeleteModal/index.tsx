import axios from 'axios';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { deleteLink } from '@/apis/Media';
import DeleteModal from '@/components/Common/DeleteModal/DeleteModal';
import useRecord from '@/hooks/useRecord';
import { MainContext } from '@/store';
import { recordListType } from '@/types/recordList.interface';

type DeleteModalPropsType = {
  id: number;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};
const baseUrl = import.meta.env.VITE_BASE_URL as string;

export default function DeleteModalContainer({
  id,
  setDeleteModalOpen,
}: DeleteModalPropsType) {
  const { pathname } = useLocation();

  const { loginToken } = useContext(MainContext);
  const { recordListData, mutate } = useRecord();
  const [state, setState] = useState('');

  useEffect(() => {
    if (pathname === '/record') {
      setState('기록');
    } else if (pathname === '/media') {
      setState('미디어');
    }
  }, [pathname]);

  const handleDeleteClick = async () => {
    const headers = {
      Authorization: `Bearer ${loginToken}`,
      'Content-Type': 'application/json',
    };

    if (pathname === '/record' && recordListData) {
      const newRecordList: recordListType = recordListData.filter(
        (item: { id: number }) => item.id !== id
      );

      await mutate(
        axios.delete(`${baseUrl}/record-templates/${id}`, { headers }),
        {
          optimisticData: newRecordList,
          populateCache: false,
        }
      );
    }

    if (pathname === '/media') {
      deleteLink(id, loginToken);
    }

    setDeleteModalOpen(false);
  };

  return (
    <DeleteModal
      setDeleteModalOpen={setDeleteModalOpen}
      title={state}
      text={'템플릿을 삭제하시겠습니까?'}
      handleDeleteClick={handleDeleteClick}
    />
  );
}
