import { Select, SelectTrigger, SelectValue, Label } from '@/components/ui'

function CurrentStatus({ status }: { status: string }) {
  return (
    <div>
      <h3 className="font-bold text-[0.75rem] mb-[8px]">Current Status</h3>
      <Label htmlFor="status" className="text-[0.75rem] font-bold sr-only">
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
