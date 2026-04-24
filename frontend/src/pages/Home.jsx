import React from 'react'
import Headers from '../components/Header'
import SpecializationMenu from '../components/SpecializationMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Headers />
      <SpecializationMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home