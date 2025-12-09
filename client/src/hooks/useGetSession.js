import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const fetchSession = async () => {
  const response = await fetch(`${API_URL}/auth/user`, {
    credentials: 'include', // important for session cookies
  });

  if (!response.ok) {
    throw new Error('Failed to fetch session');
  }

  return response.json();
};

export const useGetSession = () => {
  return useQuery({
    queryKey: ['auth', 'session'],
    queryFn: fetchSession,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: false, // don't retry on auth failures
    refetchOnWindowFocus: false, // optional: avoid refetch on focus
  });
};

export default useGetSession;
