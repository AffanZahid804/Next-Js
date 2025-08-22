const API_BASE_URL = 'https://api-yeshtery.dev.meetusvr.com/v1';

interface LoginResponse {
  token: string;
  refresh: string;
  // ... other properties
}

interface UserInfoResponse {
  id: string;
  name: string;
  // ... other properties
}

export const authServices = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/yeshtery/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        isEmployee: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  getUserInfo: async (token: string): Promise<UserInfoResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return response.json();
  },
};