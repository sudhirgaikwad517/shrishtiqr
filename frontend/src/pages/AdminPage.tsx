import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  adminLogin,
  createUnit,
  deleteUnit,
  fetchAdminConfig,
  fetchAdminUnits,
  getPublicUrl,
  updateUnit,
} from '../api'
import QrGenerator from '../components/QrGenerator'
import type { ManufacturingUnit, UnitFormData } from '../types'

const emptyForm: UnitFormData = {
  batch_code: '',
  company_name: '',
  address: '',
  fssai_licence_number: '',
  sort_order: 0,
}

const TOKEN_KEY = 'shrishti_admin_token'

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [units, setUnits] = useState<ManufacturingUnit[]>([])
  const [publicUrl, setPublicUrl] = useState(getPublicUrl())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<UnitFormData>(emptyForm)
  const [saving, setSaving] = useState(false)

  async function loadAdminData(authToken: string) {
    setLoading(true)
    setError(null)
    try {
      const [config, data] = await Promise.all([
        fetchAdminConfig(authToken),
        fetchAdminUnits(authToken),
      ])
      setPublicUrl(config.public_url || getPublicUrl())
      setUnits(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load admin data.')
      localStorage.removeItem(TOKEN_KEY)
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      void loadAdminData(token)
    }
  }, [token])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError(null)
    try {
      const result = await adminLogin(password)
      localStorage.setItem(TOKEN_KEY, result.token)
      setToken(result.token)
      setPassword('')
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed.')
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUnits([])
  }

  function startCreate() {
    setEditingId(null)
    setForm({
      ...emptyForm,
      sort_order: units.length + 1,
    })
  }

  function startEdit(unit: ManufacturingUnit) {
    setEditingId(unit.id)
    setForm({
      batch_code: unit.batch_code,
      company_name: unit.company_name,
      address: unit.address,
      fssai_licence_number: unit.fssai_licence_number,
      sort_order: unit.sort_order,
    })
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return

    setSaving(true)
    setError(null)
    try {
      if (editingId) {
        await updateUnit(token, editingId, form)
      } else {
        await createUnit(token, form)
      }

      await loadAdminData(token)
      setEditingId(null)
      setForm(emptyForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save unit.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!token) return
    if (!window.confirm('Delete this manufacturing unit?')) return

    setError(null)
    try {
      await deleteUnit(token, id)
      await loadAdminData(token)
      if (editingId === id) {
        setEditingId(null)
        setForm(emptyForm)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete unit.')
    }
  }

  if (!token) {
    return (
      <main className="min-h-dvh bg-slate-50 px-4 py-10">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-600">Manage manufacturing unit details.</p>

          <form onSubmit={(e) => void handleLogin(e)} className="mt-5 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
            />
            {loginError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {loginError}
              </div>
            ) : null}
            <button
              type="submit"
              className="h-11 w-full rounded-xl bg-blue-700 text-sm font-medium text-white"
            >
              Login
            </button>
          </form>

          <Link to="/" className="mt-4 inline-block text-sm text-blue-700 hover:underline">
            ← Back to public page
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-dvh bg-slate-50 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Admin Panel</h1>
            <p className="mt-1 text-sm text-slate-600">
              Update table data anytime. The QR code URL stays the same.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/"
              className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700"
            >
              View Public Page
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-10 items-center rounded-xl bg-slate-900 px-4 text-sm text-white"
            >
              Logout
            </button>
          </div>
        </div>

        <QrGenerator publicUrl={publicUrl} />

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Manufacturing Units</h2>
            <button
              type="button"
              onClick={startCreate}
              className="h-10 rounded-xl bg-blue-700 px-4 text-sm font-medium text-white"
            >
              + Add Unit
            </button>
          </div>

          <form onSubmit={(e) => void handleSave(e)} className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              value={form.batch_code}
              onChange={(e) => setForm({ ...form, batch_code: e.target.value.toUpperCase() })}
              placeholder="Batch code (e.g. RU)"
              maxLength={10}
              className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
              required
            />
            <input
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              placeholder="Company name"
              className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
              required
            />
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Manufactured address"
              rows={3}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 sm:col-span-2"
              required
            />
            <input
              value={form.fssai_licence_number}
              onChange={(e) => setForm({ ...form, fssai_licence_number: e.target.value })}
              placeholder="FSSAI licence number"
              className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
              required
            />
            <input
              type="number"
              min={0}
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              placeholder="Sort order"
              className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
            />
            <div className="flex gap-2 sm:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="h-11 rounded-xl bg-blue-700 px-5 text-sm font-medium text-white disabled:opacity-60"
              >
                {saving ? 'Saving…' : editingId ? 'Update Unit' : 'Create Unit'}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setForm(emptyForm)
                  }}
                  className="h-11 rounded-xl border border-slate-200 px-5 text-sm text-slate-700"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="border border-slate-200 px-3 py-2">Batch</th>
                  <th className="border border-slate-200 px-3 py-2">Company</th>
                  <th className="border border-slate-200 px-3 py-2">FSSAI</th>
                  <th className="border border-slate-200 px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="border border-slate-200 px-3 py-6 text-center text-slate-500">
                      Loading…
                    </td>
                  </tr>
                ) : (
                  units.map((unit) => (
                    <tr key={unit.id}>
                      <td className="border border-slate-200 px-3 py-3 font-semibold">{unit.batch_code}</td>
                      <td className="border border-slate-200 px-3 py-3">{unit.company_name}</td>
                      <td className="border border-slate-200 px-3 py-3 text-blue-700">{unit.fssai_licence_number}</td>
                      <td className="border border-slate-200 px-3 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(unit)}
                            className="rounded-lg border border-slate-200 px-3 py-1 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDelete(unit.id)}
                            className="rounded-lg border border-red-200 px-3 py-1 text-xs text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
