import { getAuth } from "../modules/auth";

type HeadersType = {
  [key: string]: string;
  Accept: string;
  "Content-Type": string;
};
const defaultHeaders: HeadersType = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

interface FetchOptions {
  method?: string;
  headers?: HeadersType;
  body?: string;
  // Add other properties as needed
}

// Helper function to get the auth token
export const getAuthToken = () => {
  const auth = getAuth(); // Replace this with your auth retrieval logic
  return auth && auth.api_token ? `Bearer ${auth.api_token}` : null;
};
// Fetch wrapper function
export async function customFetch(url: string, options: FetchOptions = {}) {
  // Add the Authorization header if the token exists
  const authToken = getAuthToken();
  if (authToken) {
    defaultHeaders["Authorization"] = authToken;
  }
  // Merge custom options with defaults
  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // Make the fetch call
  const response = await fetch(url, mergedOptions);

  // Handle response errors if needed
  if (!response.ok) {
    // Handle errors
    throw new Error("Network response was not ok");
  }

  return response;
}

export async function handleRequestErrors(res: Response): Promise<void> {
  let errorText = "Error making request.";

  try {
    const { message, errors } = await res.json();
    if (message) {
      console.error(message);
    }
    if (errors) {
      const errorMessages = Object.entries(errors)
        .map(([_, value]: [string, unknown]) => (value as string[]).join(", "))
        .join(". ");
      errorText += ` Details: ${errorMessages}`;
    }
  } catch (jsonError) {
    errorText += ` Non-JSON error: ${res.statusText}`;
  }

  throw new Error(errorText);
}

export async function getMethodRequest(
  query = "",
  title = "Data",
  BASE_URL: string
) {
  const queryString = query ? `?${query}` : "";
  const res = await customFetch(`${BASE_URL}${queryString}`);
  const { data, meta, errors } = await res.json();

  if (errors) {
    console.error(errors);
    throw new Error(`${title} could not be found.`);
  }

  return { data, meta };
}
