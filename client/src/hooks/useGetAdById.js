import { useQuery } from '@tanstack/react-query';
import { LOCALHOST } from '../utils/constants';

const API_URL = process.env.REACT_APP_API_URL || LOCALHOST;

const fetchAdById = async (id) => {
  const response = await fetch(`${API_URL}/ads/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch ad');
  }
  return response.json();
};

export const useGetAdById = (id) => {
  return useQuery({
    queryKey: ['ads', id],
    queryFn: () => fetchAdById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 2,
  });
};

export default useGetAdById;
