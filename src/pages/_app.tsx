import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DEFAULT_CHAT_COMPLETION_OPTION } from '@/constants'
import { DrawerProvider } from '@/contexts/drawerContext'
import { ParameterControlsProvider } from '@/contexts/parameterControlsContext'
import { ChatCompletionOptionType } from '@/types/custom'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ParameterControlsProvider initialOption={DEFAULT_CHAT_COMPLETION_OPTION as ChatCompletionOptionType}>
          <DrawerProvider>
            <Component {...pageProps} />
          </DrawerProvider>
        </ParameterControlsProvider>
      </MantineProvider>
    </>
  )
}
