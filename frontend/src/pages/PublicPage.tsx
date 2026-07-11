import { useEffect, useState } from 'react'
import { fetchManufacturingUnits } from '../api'
import AddressTable from '../components/AddressTable'
import PageLayout from '../components/PageLayout'
import type { ManufacturingUnit } from '../types'

export default function PublicPage() {
  const [units, setUnits] = useState<ManufacturingUnit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchManufacturingUnits()
      .then(setUnits)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageLayout>
      <div className="overflow-x-hidden px-3 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-5xl">
          <h1 className="text-balance text-center text-xl font-bold text-[#1a4f8f] sm:text-3xl">
            Manufacturing Unit Addresses
          </h1>

          <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-3 text-sm leading-6 text-amber-900 sm:mt-5 sm:px-4">
            To identify manufacturing unit address in India, read the first two characters of the
            batch number and see below:
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <AddressTable units={units} loading={loading} />
        </div>
      </div>
    </PageLayout>
  )
}
