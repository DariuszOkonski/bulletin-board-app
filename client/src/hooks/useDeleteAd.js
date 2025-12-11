import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOCALHOST } from '../utils/constants';

const API_URL = process.env.REACT_APP_API_URL || LOCALHOST;

const deleteAd = async (id) => {
  const res = await fetch(`${API_URL}/ads/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => null);
    throw new Error(txt || `Failed to delete ad: ${res.status}`);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
};

export const useDeleteAd = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAd(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['ads', id] });
    },
    onError: (err) => {
      console.error('Error deleting ad:', err);
    },
  });
};

export default useDeleteAd;
