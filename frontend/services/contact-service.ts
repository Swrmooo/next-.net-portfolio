export type ContactMessagePayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactMessage(data: ContactMessagePayload) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL is not configured.");
  }

  const response = await fetch(`${apiUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to send contact message.");
  }

  return response.json();
}
