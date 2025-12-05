import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOCALHOST } from '../utils/constants';

const API_URL = process.env.REACT_APP_API_URL || LOCALHOST;

const registerUser = async ({ login, password, phone, location, avatar }) => {
  const formData = new FormData();
  formData.append('login', login);
  formData.append('password', password);
  formData.append('phone', phone);
  formData.append('location', location);
  if (avatar) formData.append('avatar', avatar);

  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    // try to parse json error body, fallback to text/status
    let message = `Failed to register (status ${res.status})`;
    try {
      const json = await res.json();
      message = json?.message || json?.error || message;
    } catch (e) {
      try {
        const txt = await res.text();
        if (txt) message = txt;
      } catch {}
    }
    throw new Error(message);
  }

  return res.json();
};

export const useRegisterUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Invalidate or refetch any queries that depend on users/auth state
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
  });
};

export default useRegisterUser;
