import { useEffect, useState } from 'react'
import { DataTable, DataTablePageEvent } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { getArtworks, Artwork } from '../api/artworks'
import { usePersistentSelection } from '../hooks/usePersistentSelection'
import CustomOverlay from '../components/CustomselectOverlay'

export default function ArtworksTable() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0)
  const rows = 10

  const { selectedIds, selectAll, deselectAll, customSelect } = usePersistentSelection()

  // Fetch data from API whenever page changes
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true)
        const data = await getArtworks(page, rows)
        setArtworks(data.data)
        setTotalRecords(data.pagination.total || 1000)
      } catch (error) {
        console.error('Error fetching artworks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArtworks()
  }, [page])

  // Pagination handler
  const onPage = (e: DataTablePageEvent) => {
    if (e.page !== undefined) setPage(e.page + 1)
  }

  // Handle row selection change
  const onSelectionChange = (e: { value: Artwork[] }) => {
    const selected = e.value
    const ids = artworks.map(a => a.id)
    deselectAll(ids)
    selectAll(selected.map(a => a.id))
  }

  // Determine which rows are selected for current page
  const selectedRows = artworks.filter(a => selectedIds.has(a.id))

  return (
    <div className="p-4">
      <div className="flex justify-content-between mb-3">
        <h2>Artworks Table</h2>
        <CustomOverlay
          totalRows={artworks.length}
          onSelectCount={(count) => customSelect(artworks.map(a => a.id), count)}
        />
      </div>

      {/* @ts-expect-error temporary PrimeReact typing issue */}
<DataTable
  value={artworks}
  paginator
  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
  paginatorLeft={null}
  paginatorRight={null}
  rows={rows}
  totalRecords={totalRecords}
  dataKey="id"
  lazy
  onPage={onPage}
  selection={selectedRows}
  onSelectionChange={onSelectionChange}
  loading={loading}
  tableStyle={{ minWidth: '60rem' }}
  paginatorClassName="justify-content-between"
>
  <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
  <Column field="title" header="Title" />
  <Column field="place_of_origin" header="Origin" />
  <Column field="artist_display" header="Artist" />
  <Column field="inscriptions" header="Inscriptions" />
  <Column field="date_start" header="Start" />
  <Column field="date_end" header="End" />
</DataTable>

    </div>
  )
}
