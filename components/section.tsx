'use client'
import React from 'react'
import { ScrollArea, ScrollBar } from './ui'
import { Column, EmptyBoard, NewColumn } from '@/components/index'

function Section({ boardSelected }: { boardSelected: any }) {
  return (
    <ScrollArea className="w-full sm:section-custom-dvh">
      <section className="h-custom-dvh px-[16px] sm:px-[24px] pt-[27px] sm:pt-[24px] pb-[24px] flex gap-6 mx-auto relative">
        {boardSelected ? (
          <>
            {boardSelected.columns.map((column: any) => (
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
