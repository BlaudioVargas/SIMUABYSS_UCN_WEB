const BASE_URL = "http://localhost:3000/auth"; //hay que cambiarlo a un .env

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

async function post<TPayload, TResponse>(endpoint: string, payload: TPayload): Promise<TResponse> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en la conexión al backend: ${response.status} - ${errorText}`);
  }

  return response.json() as Promise<TResponse>;
}

export async function loginUsuario(email: string, password: string): Promise<LoginResponse> {
  const payload: LoginPayload = { email, password };
  return post<LoginPayload, LoginResponse>(`${BASE_URL}/login`, payload);
}
