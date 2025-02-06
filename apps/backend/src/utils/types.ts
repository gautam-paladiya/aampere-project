export class SuccessResponse<T> {
  success: true;
  message?: string;
  data: T; // Generic type for the data payload
}

export class ErrorResponse {
  success: false;
  message: string;
  errors?: {
    // Optional, but recommended
    code?: string;
    message?: string;
    details?: any; // Can be an object for more complex errors
  };
}

// Example of a specific success data DTO (e.g., login response)
export class LoginResponseData {
  accessToken: string;
  refreshToken?: string; // Optional
  user: {
    id: number;
    username: string;
    email: string;
    // ... other user details
  };
}
