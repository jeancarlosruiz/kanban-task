import { boardSelected } from '@/actions/boards'
import { Header } from '@/components/index'
import { Button } from '@/components/ui'
const Page = async () => {
  const currentBoard = await boardSelected()

  // console.log({ currentBoard })

  return (
    <main>
      <Header />
      <section className="h-custom-dvh flex justify-center items-center px-[16px] pt-[24px]">
        <div className="mt-[-30px] w-full flex items-center flex-col gap-[1.5625rem]">
          <p className="text-center text-[1.125rem] text-gray-300 font-bold">
            This board is empty. Create a new column to get started.
          </p>
          <Button className="min-w-[10.875rem] text-[0.9375rem]">
            + Add New Column
          </Button>
        </div>
      </section>
    </main>
  )
}

export default Page
