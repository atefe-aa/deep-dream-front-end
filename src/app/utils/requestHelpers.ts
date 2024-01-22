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
