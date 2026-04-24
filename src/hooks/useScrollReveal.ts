import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-8')
          }
        })
      },
      { threshold: 0.15 }
    )

    const el = ref.current
    if (el) {
      const children = el.querySelectorAll('.reveal')
      children.forEach(child => observer.observe(child))
    }

    return () => observer.disconnect()
  }, [])

  return ref
}