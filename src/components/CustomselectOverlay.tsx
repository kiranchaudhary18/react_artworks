import { useRef, useState } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'

interface Props {
  totalRows: number
  onSelectCount: (count: number) => void
}

export default function CustomOverlay({ totalRows, onSelectCount }: Props) {
  const op = useRef<OverlayPanel>(null)
  const [count, setCount] = useState<number | null>(null)

  const handleApply = () => {
    if (!count || count <= 0 || count > totalRows) {
      alert(`Please enter a valid number (1–${totalRows})`)
      return
    }
    onSelectCount(count)
    op.current?.hide()
  }

  return (
    <>
      <Button label="Custom Select" icon="pi pi-check" onClick={(e) => op.current?.toggle(e)} />
      <OverlayPanel ref={op}>
        <div className="flex flex-column gap-2 p-2">
          <span>Select how many rows:</span>
          <InputNumber value={count} onValueChange={(e) => setCount(e.value ?? null)} />
          <Button label="Apply" onClick={handleApply} />
        </div>
      </OverlayPanel>
    </>
  )
}
