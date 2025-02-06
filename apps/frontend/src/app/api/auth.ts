export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorData: any = { message: "Unknown error occurred" };

    try {
      errorData = await response.json(); // Parse JSON response if available
    } catch (error) {
      console.error("Failed to parse error response:", error);
    }

    // Throw a custom error with the parsed error data
    throw new Error(errorData.message);
  }

  return response.json();
}

export async function register({
  firstName,
  lastName,
  username,
  password,
}: {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
    {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorData: any = { message: "Unknown error occurred" };

    try {
      errorData = await response.json(); // Parse JSON response if available
    } catch (error) {
      console.error("Failed to parse error response:", error);
    }

    // Throw a custom error with the parsed error data
    throw new Error(JSON.stringify(errorData));
  }

  return response.json();
}
