import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

function CurrentStatus({ status }: { status: string }) {
  return (
    <div>
      <h3 className="mb-[8px] text-[0.75rem] font-bold">Current Status</h3>
      <Label htmlFor="status" className="sr-only text-[0.75rem] font-bold">
        Current status
      </Label>
      <Select name="status" defaultValue={status} disabled>
        <SelectTrigger id="status">
          <SelectValue title={status}>{status}</SelectValue>
        </SelectTrigger>
      </Select>
    </div>
  )
}

export default CurrentStatus
