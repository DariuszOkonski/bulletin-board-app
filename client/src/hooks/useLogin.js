import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOCALHOST } from '../utils/constants';

const API_URL = process.env.REACT_APP_API_URL || LOCALHOST;

const loginUser = async ({ login, password }) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });

  if (!res.ok) {
    let message = `Login failed (status ${res.status})`;
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

export const useLogin = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Invalidate auth-related queries
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
  });
};

export default useLogin;
