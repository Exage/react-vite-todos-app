import { useState, useEffect } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow' 

export const useTimeUpdates = (date) => {
    const [time, setTime] = useState(formatDistanceToNow(date))

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatDistanceToNow(date))
        }, 60000)

        return () => clearInterval(interval)
    }, [date])

    return time
}
