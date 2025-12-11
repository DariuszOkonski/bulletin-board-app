import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOCALHOST } from '../utils/constants';

const API_URL = process.env.REACT_APP_API_URL || LOCALHOST;

const updateAd = async ({ id, formData }) => {
  const response = await fetch(`${API_URL}/ads/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Failed to update ad: ${response.status}`);
  }

  return response.json();
};

export const useEditAd = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => updateAd({ id, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads', id] });
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
    onError: (error) => {
      console.error('Error updating ad:', error);
    },
  });
};

export default useEditAd;
