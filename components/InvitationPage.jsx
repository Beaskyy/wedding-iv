'use client'

import { useState } from 'react'
import {
  couple,
  dressCode,
  gifts,
  programme,
  sideEvents,
  travel,
  venue,
  weddingDate,
  welcome,
} from '../data/invitation'
import CountdownSection from './sections/CountdownSection'
import DecorativeBreak from './ui/DecorativeBreak'
import DressSection from './sections/DressSection'
import FooterSection from './sections/FooterSection'
import HeroSection from './sections/HeroSection'
import RSVPSection from './sections/RSVPSection'
import StaySection from './sections/StaySection'
import TravelSection from './sections/TravelSection'
import VenueSection from './sections/VenueSection'
import WelcomeSection from './sections/WelcomeSection'
import OpeningOverlay from './sections/OpeningOverlay'

export default function InvitationPage() {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpen = () => {
    setIsOpened(true)
  }

  return (
    <main className="invitation-shell">
      {!isOpened && <OpeningOverlay couple={couple} onOpen={handleOpen} />}
      
      <div className={`main-content ${isOpened ? 'is-visible' : 'is-hidden'}`}>
        <HeroSection couple={couple} venue={venue} isOpened={isOpened} />
        <CountdownSection dateLabel={couple.dateLabel} weddingDate={weddingDate} />
        <WelcomeSection welcome={welcome} />
        <DecorativeBreak image="/assets/floral-vase-6x28LN74.png" size="large" />
        <VenueSection couple={couple} programme={programme} venue={venue} />
        <DecorativeBreak line />
        <DressSection dressCode={dressCode} venue={venue} />
        <DecorativeBreak image="/assets/bow-illustration-DWFdIPv5.png" size="small" />
        <StaySection sideEvents={sideEvents} />
        <DecorativeBreak image="/assets/cupid-illustration-BO3_EWaD.png" size="medium" />
        <TravelSection gifts={gifts} travel={travel} />
        <RSVPSection couple={couple} />
        <FooterSection couple={couple} />
      </div>
    </main>
  )
}

