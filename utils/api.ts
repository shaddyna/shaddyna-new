/*export const registerUser = async (
  name: string, 
  email: string, 
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');

    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};*/
export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');

    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const loginUser = async (
  email: string, 
  password: string
): Promise<any> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// utils/api.ts
/*export const fetchWithAuth = async (
  url: string, 
  options: RequestInit = {}
): Promise<any> => {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as HeadersInit),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
};

// Example usage for fetching user-specific data
export const fetchUserProducts = async (): Promise<any> => {
  return fetchWithAuth('/api/products/my-products');
};*/

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle 404 specifically
    if (response.status === 404) {
      return { message: data.message || 'Not found' };
    }
    throw new Error(data.message || 'Request failed');
  }

  return data;
};
