export const registerUser = async (name, email, password) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
  
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
  export const loginUser = async (email, password) => {
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
    } catch (error) {
      throw new Error(error.message);
    }
  };
  