'use client'

import { Button } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { AppHeader } from '@/components/AppHeader'
import { ChatTimeline } from '@/components/ChatTimeline'
import { ParameterControls } from '@/components/ParameterControls'
import { APP_TITLE } from '@/constants'
import { useDrawerState } from '@/contexts/drawerContext'

const Home: NextPage = () => {
  const { isDrawerOpen, toggleDrawer } = useDrawerState()

  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>
      <AppHeader />
      <main className="pt-[64px] relative h-[100svh] md:h-screen flex z-10 bg-gray-100">
        {/* Main content */}
        <div className="flex-1 overflow-auto relative">
          <ChatTimeline />
        </div>

        {/* Right sidebar */}
        <div
          className={`overflow-auto absolute inset-y-0 right-0 top-[64px] md:top-0 transform md:relative md:translate-x-0 w-80 bg-white transition duration-200 ease-in-out md:border-l md:border-gray-200 ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4">
            <ParameterControls />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
