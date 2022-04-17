import { sendEvent } from '@webiny/telemetry/react'
import { useEffect } from 'react'

export const Telemetry = () => {
  useEffect(() => {
    sendEvent('app-start')
  }, [])

  return null
}
