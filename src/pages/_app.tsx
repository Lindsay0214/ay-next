import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

function AyNextApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default AyNextApp
