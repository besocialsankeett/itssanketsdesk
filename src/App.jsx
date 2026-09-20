import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { useLenis } from './hooks/useLenis'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import DeskHero from './components/DeskHero'
import SketchbookSection from './components/SketchbookSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import ProcessSection from './components/ProcessSection'
import WorkSection from './components/WorkSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CaseStudy from './components/CaseStudy'

export default function App() {
  const lenisRef = useLenis()
  const [ready, setReady] = useState(false)
  const [openProject, setOpenProject] = useState(null)

  const handleDone = useCallback(() => setReady(true), [])
  const handleOpen = useCallback((project) => setOpenProject(project), [])
  const handleClose = useCallback(() => setOpenProject(null), [])
  const handleNavigate = useCallback((project) => setOpenProject(project), [])

  /* Images arriving late change the page height, which invalidates every
     ScrollTrigger start/end. One refresh once everything has settled is
     cheaper and more reliable than refreshing per image. */
  /* Dev only: ?at=work jumps straight to a section with every reveal
     finished, so a headless screenshot can check below-the-fold layout.
     Vite drops this whole block from production builds. */
  useEffect(() => {
    if (!import.meta.env.DEV || !ready) return undefined
    const id = new URLSearchParams(window.location.search).get('at')
    if (!id) return undefined
    const t = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      lenisRef.current?.destroy?.()
      ScrollTrigger.getAll().forEach((st) => {
        st.animation?.progress(1)
        st.kill(false)
      })
      // shift rather than scroll: headless screenshots only ever capture
      // the top of the document
      document.body.style.marginTop = `-${Math.round(el.getBoundingClientRect().top + window.scrollY - 24)}px`
    }, 600)
    return () => window.clearTimeout(t)
  }, [ready, lenisRef])

  useEffect(() => {
    if (!ready) return undefined
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 260)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('load', onLoad)
    }
  }, [ready])

  return (
    <>
      <Preloader onDone={handleDone} />
      <CustomCursor />

      <a className="skip-link" href="#work">
        Skip to the work
      </a>

      {/* One continuous desk surface behind every section. Fixed, so it does
          not repaint on scroll — the sections are the things that move. */}
      <div className="desk-bg mat-surface" aria-hidden="true">
        <span className="desk-bg__vignette" />
        <span className="desk-bg__grain" />
      </div>

      <Navbar lenisRef={lenisRef} />

      <main id="main">
        <DeskHero ready={ready} />
        <SketchbookSection />
        <ExperienceSection />
        <SkillsSection />
        <ProcessSection />
        <WorkSection onOpen={handleOpen} />
        <ContactSection />
      </main>

      <Footer />

      <CaseStudy
        project={openProject}
        onClose={handleClose}
        onNavigate={handleNavigate}
        lenisRef={lenisRef}
      />
    </>
  )
}
