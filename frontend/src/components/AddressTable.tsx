import type { ManufacturingUnit } from '../types'

type Props = {
  units: ManufacturingUnit[]
  loading?: boolean
}

export default function AddressTable({ units, loading }: Props) {
  return (
    <div className="mt-5 w-full overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full table-fixed border-collapse text-left">
        <thead>
          <tr className="bg-slate-100 text-slate-700">
            <th className="w-[12%] border border-slate-200 px-1.5 py-3.5 text-center text-xs font-semibold sm:w-[8%] sm:px-3 sm:text-sm">
              Sr.
            </th>
            <th className="w-[18%] border border-slate-200 px-1.5 py-3.5 text-center text-xs font-semibold sm:w-[14%] sm:px-3 sm:text-sm">
              Batch
            </th>
            <th className="border border-slate-200 px-2 py-3.5 text-xs font-semibold sm:px-3 sm:text-sm">
              Manufactured Address
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={3}
                className="border border-slate-200 px-3 py-10 text-center text-base text-slate-500 sm:py-8 sm:text-sm"
              >
                Loading…
              </td>
            </tr>
          ) : units.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="border border-slate-200 px-3 py-10 text-center text-base text-slate-500 sm:py-8 sm:text-sm"
              >
                No manufacturing units found.
              </td>
            </tr>
          ) : (
            units.map((unit, index) => (
              <tr key={unit.id} className="align-top">
                <td className="border border-slate-200 px-1.5 py-5 text-center text-base text-slate-700 sm:px-3 sm:py-4 sm:text-sm">
                  {index + 1}
                </td>
                <td className="border border-slate-200 px-1.5 py-5 text-center text-base font-semibold text-slate-900 sm:px-3 sm:py-4 sm:text-sm">
                  {unit.batch_code}
                </td>
                <td className="border border-slate-200 px-2.5 py-5 text-[15px] leading-7 break-words text-slate-800 [overflow-wrap:anywhere] sm:px-3 sm:py-4 sm:text-sm sm:leading-6">
                  <div className="font-medium text-slate-900">{unit.company_name}</div>
                  <div className="mt-2">{unit.address}</div>
                  <div className="mt-3">
                    <span className="text-slate-700">FSSAI Lic. No. </span>
                    <span className="font-semibold break-all text-blue-700">
                      {unit.fssai_licence_number}
                    </span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
