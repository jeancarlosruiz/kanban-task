'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Textarea,
} from '@/components/ui'
import { Submit, StatusSelect, EditSubtasks } from '@/components/index'

function EditTask({ taskSaved }: { taskSaved: any }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full text-left">Edit task</DialogTrigger>
      <DialogContent className="w-custom-form rounded-lg p-[16px] ">
        <DialogHeader>
          <DialogTitle className="text-left text-[1.125rem]">
            Edit Task
          </DialogTitle>
          <DialogDescription className="sr-only">
            Edit task form
          </DialogDescription>
        </DialogHeader>

        <form action="" className="flex flex-col gap-[1.5rem]">
          <div>
            <Label htmlFor="title" className="text-[0.75rem] font-bold">
              Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Take coffee break"
              name="title"
              defaultValue={taskSaved.title}
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-[0.75rem] font-bold">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="e.g. It’s always good to take a break. This 
        15 minute break will  recharge the batteries 
        a little."
              name="description"
              defaultValue={taskSaved.description}
            />
          </div>

          <EditSubtasks savedSubtasks={taskSaved.subtasks} />
          <StatusSelect statusLabel={taskSaved.status} />

          <Submit variant="default">Edit Task</Submit>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask
