"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import Story from "@/components/Story";
import SaveTheDate from "@/components/SaveTheDate";
import Countdown from "@/components/Countdown";
import Gallery from "@/components/Gallery";
import Wishes from "@/components/Wishes";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative bg-ivory">
      <Preloader isLoading={isLoading} />
      <Navbar />
      
      <SequenceScroll onLoad={() => setIsLoading(false)} />
      
      <div id="story">
        <Story />
      </div>
      
      <div id="save-the-date">
        <SaveTheDate />
      </div>
      
      <Countdown />
      
      <div id="gallery">
        <Gallery />
      </div>
      
      <Wishes />
      
      <div id="rsvp">
        <RSVP />
      </div>
      
      <Footer />
    </main>
  );
}
