'use client'
import React from 'react'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import NewColumn from '@/components/newColumn'
import Column from '@/components/column'
import EmptyBoard from '@/components/emptyBoard'
import { Board, Column as ColumnType } from '@/types'

function Section({ boardSelected }: { boardSelected: Board }) {
  return (
    <ScrollArea className="sm:section-custom-dvh w-full">
      <section className="h-custom-dvh relative mx-auto flex gap-6 px-[16px] pb-[24px] pt-[27px] sm:px-[24px] sm:pt-[24px]">
        <h2 className="sr-only">Board section</h2>
        {boardSelected ? (
          <>
            {boardSelected.columns.map((column: ColumnType) => (
              <Column key={column.id} column={column} />
            ))}
            <NewColumn boardId={boardSelected.id} />
          </>
        ) : (
          <EmptyBoard />
        )}
      </section>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default Section
