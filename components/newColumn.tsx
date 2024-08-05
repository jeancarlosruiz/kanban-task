import { Button } from './ui'

function NewColumn() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="before:content-[''] before:w-[0.9375rem] before:h-[0.9375rem] before:rounded-full before:bg-[#49C4E5] before:block inline-flex items-center gap-3 uppercase text-left text-[0.75rem] tracking-[.2em] text-gray-300 font-bold invisible">
        New column
      </h2>
      <div className="min-w-[17.5rem] h-full bg-gradient-to-r from-black-600 to-black-600/25 flex items-center justify-center rounded-md">
        <button className="hover:text-purple-500 font-bold text-[0.9375rem]">
          + New Column
        </button>
      </div>
    </div>
  )
}

export default NewColumn
