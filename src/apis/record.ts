import axios from 'axios';

import { recordListResponseType } from '@/types/recordList.interface';

const baseUrl = import.meta.env.VITE_BASE_URL as string;

export function recordListFetcher([url, tokenData]: string[]) {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  return axios
    .get<recordListResponseType>(`${baseUrl}/${url}`, {
      headers,
    })
    .then(res => res.data.templates);
}