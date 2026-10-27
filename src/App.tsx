import React, { useState, useEffect } from 'react';
import { TabType, Artwork } from './types';
import { ARTWORKS_DATA } from './data/artworks';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Lightbox } from './components/Lightbox';
import { HomeView } from './views/HomeView';
import { ObrasView } from './views/ObrasView';
import { SobreMiView } from './views/SobreMiView';
import { ContactoView } from './views/ContactoView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number>(0);
  const [inquiryArtworkTitle, setInquiryArtworkTitle] = useState<string>('');

  // Synchronize hash with active tab for clean URL state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabType;
      if (['home', 'sobre-mi', 'obras', 'contacto'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArtworkModalById = (artworkId: string) => {
    const index = ARTWORKS_DATA.findIndex((a) => a.id === artworkId);
    if (index !== -1) {
      setSelectedArtworkIndex(index);
      setLightboxOpen(true);
    }
  };

  const handleOpenArtworkModalByIndex = (index: number) => {
    setSelectedArtworkIndex(index);
    setLightboxOpen(true);
  };

  const handleInquireFromArtwork = (artwork: Artwork) => {
    setInquiryArtworkTitle(artwork.title);
    handleNavigate('contacto');
  };

  const handleInquireByTitle = (title: string) => {
    setInquiryArtworkTitle(title);
    handleNavigate('contacto');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fef8f4] text-[#1d1b19] font-sans-clean selection:bg-[#4c0c20] selection:text-white">
      {/* Fixed Archival Header */}
      <Header activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Exhibition Reading Canvas */}
      <main className="w-full pt-20 flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenArtworkModal={handleOpenArtworkModalById}
            onInquireArtwork={handleInquireByTitle}
          />
        )}

        {activeTab === 'obras' && (
          <ObrasView
            artworks={ARTWORKS_DATA}
            onOpenLightbox={handleOpenArtworkModalByIndex}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'sobre-mi' && (
          <SobreMiView onNavigate={handleNavigate} />
        )}

        {activeTab === 'contacto' && (
          <ContactoView
            artworks={ARTWORKS_DATA}
            selectedArtworkTitle={inquiryArtworkTitle}
            onClearSelectedArtwork={() => setInquiryArtworkTitle('')}
          />
        )}
      </main>

      {/* Museum Lightbox Modal */}
      <Lightbox
        artworks={ARTWORKS_DATA}
        currentIndex={selectedArtworkIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={setSelectedArtworkIndex}
        onInquire={handleInquireFromArtwork}
      />

      {/* Archival Footer */}
      <Footer />
    </div>
  );
}
