import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOCALHOST } from '../utils/constants';

const API_URL = process.env.REACT_APP_API_URL || LOCALHOST;

const createAd = async (formData) => {
  const response = await fetch(`${API_URL}/ads`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Failed to create ad: ${response.status}`);
  }

  return response.json();
};

export const useCreateAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAd,
    onSuccess: (data) => {
      // Invalidate and refetch ads list
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
    onError: (error) => {
      console.error('Error creating ad:', error);
    },
  });
};

export default useCreateAd;
