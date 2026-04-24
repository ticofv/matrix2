import { useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

interface Props {
  children: React.ReactNode
}

export default function PageTransition({ children }: Props) {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(true)
  const prevPath = useRef(pathname)

  const esPresentacion = pathname === '/presentacion'

  useEffect(() => {
    if (prevPath.current === pathname) return
    if (esPresentacion) {
      prevPath.current = pathname
      setVisible(true)
      return
    }

    setVisible(false)

    const timer = setTimeout(() => {
      prevPath.current = pathname
      setVisible(true)
      window.scrollTo(0, 0)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  if (esPresentacion) return <>{children}</>

  return (
    <div
      className="transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      {children}
    </div>
  )
}