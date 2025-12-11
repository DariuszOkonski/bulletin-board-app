export const LOCALHOST = 'http://localhost:3001/api/v1';
export const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';
export const IMGS_URL =
  process.env.NODE_ENV === 'production'
    ? '/uploads/'
    : 'http://localhost:3001/uploads/';
