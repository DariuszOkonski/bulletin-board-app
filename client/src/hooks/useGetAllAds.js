import { useQuery } from '@tanstack/react-query';
import { LOCALHOST } from '../utils/constants';

const API_URL = process.env.REACT_APP_API_URL || LOCALHOST;

const fetchAllAds = async (searchParams = {}) => {
  const queryString = new URLSearchParams(searchParams).toString();
  const url = `${API_URL}/ads${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch ads');
  }
  return response.json();
};

export const useGetAllAds = (searchParams = {}) => {
  const {
    data: ads,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['ads', searchParams],
    queryFn: () => fetchAllAds(searchParams),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  });

  return { ads, isPending, isError };
};

export default useGetAllAds;
