'use client'
import React from 'react'
import { ScrollArea, ScrollBar } from './ui'
import { Column, NewColumn } from '@/components/index'

function Section({ boardSelected }: { boardSelected: any }) {
  return (
    <ScrollArea className="w-full">
      <section className="h-custom-dvh px-[16px] sm:px-[24px] pt-[27px] sm:pt-[24px] pb-[24px] flex gap-6 mx-auto">
        {boardSelected ? (
          <>
            {boardSelected.columns.map((column: any) => (
              <Column key={column.id} column={column} />
            ))}
            <NewColumn boardId={boardSelected.id} />
          </>
        ) : (
          <div className="self-center mt-[-30px] w-full flex items-center flex-col gap-[1.5625rem] text-center">
            <p className="text-center text-[1.125rem] text-gray-300 font-bold">
              Start by creating a new board 😊
            </p>
          </div>
        )}
      </section>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default Section
