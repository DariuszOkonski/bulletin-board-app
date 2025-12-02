import { useQuery } from '@tanstack/react-query';

const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v11';

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
  const { data, isPending, isError } = useQuery({
    queryKey: ['ads', searchParams],
    queryFn: () => fetchAllAds(searchParams),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  });

  return { data, isPending, isError };
};

export default useGetAllAds;
