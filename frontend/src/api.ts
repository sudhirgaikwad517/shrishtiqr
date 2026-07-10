// Leave empty for dev — Vite proxies /api to Laravel on localhost:8000.
// For production, set to your live API URL (e.g. https://api.yourdomain.com).
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

export function getPublicUrl(): string {
  return import.meta.env.VITE_PUBLIC_URL ?? window.location.origin
}

function authHeaders(token?: string | null): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export async function fetchManufacturingUnits() {
  try {
    const res = await fetch(`${API_BASE}/api/manufacturing-units`, {
      headers: authHeaders(),
    })

    if (!res.ok) {
      let message = `Server error (${res.status}). Check backend database connection.`
      try {
        const json = await res.json()
        if (json?.message) message = json.message
      } catch {
        // ignore non-JSON error bodies
      }
      throw new Error(message)
    }

    return res.json()
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error(
        'Cannot reach API. Ensure backend is running: php artisan serve --host=0.0.0.0 --port=8000',
      )
    }
    throw err
  }
}

export async function adminLogin(password: string) {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ password }),
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.message ?? 'Login failed.')
  }

  return json as { token: string }
}

export async function fetchAdminConfig(token: string) {
  const res = await fetch(`${API_BASE}/api/admin/config`, {
    headers: authHeaders(token),
  })

  if (!res.ok) {
    throw new Error('Unable to load admin config.')
  }

  return res.json() as Promise<{ public_url: string }>
}

export async function fetchAdminUnits(token: string) {
  const res = await fetch(`${API_BASE}/api/admin/manufacturing-units`, {
    headers: authHeaders(token),
  })

  if (!res.ok) {
    throw new Error('Unable to load units.')
  }

  return res.json()
}

export async function createUnit(token: string, data: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/api/admin/manufacturing-units`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.message ?? 'Unable to create unit.')
  }

  return json
}

export async function updateUnit(
  token: string,
  id: number,
  data: Record<string, unknown>,
) {
  const res = await fetch(`${API_BASE}/api/admin/manufacturing-units/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.message ?? 'Unable to update unit.')
  }

  return json
}

export async function deleteUnit(token: string, id: number) {
  const res = await fetch(`${API_BASE}/api/admin/manufacturing-units/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })

  if (!res.ok) {
    const json = await res.json()
    throw new Error(json?.message ?? 'Unable to delete unit.')
  }
}
