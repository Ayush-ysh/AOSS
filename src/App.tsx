import PageLoader from './components/PageLoader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatWeBuild from './components/WhatWeBuild'
import Ventures from './components/Ventures'
import Principles from './components/Principles'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <PageLoader />
      <main className="overflow-x-hidden">
        <Navbar />
        <Hero />
        <WhatWeBuild />
        <Ventures />
        <Principles />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
