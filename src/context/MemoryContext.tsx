'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredUnlockedMemories,
  saveStoredUnlockedMemories,
  getStoredMuteStatus,
  saveStoredMuteStatus,
  getStoredBootStatus,
  saveStoredBootStatus,
  clearStoredProgress,
} from '@/utils/storage';
import { soundFx } from '@/utils/audio';

interface MemoryContextType {
  unlockedIds: number[];
  activeMemoryId: number | null;
  isBooted: boolean;
  isMuted: boolean;
  isHandbookOpen: boolean;
  activeHintLevel: number;
  isFinaleReady: boolean;
  showMapView: boolean;
  konamiActivated: boolean;
  unlockMemory: (id: number) => void;
  unlockAllMemories: () => void;
  setActiveMemoryId: (id: number | null) => void;
  setShowMapView: (show: boolean) => void;
  completeBootSequence: () => void;
  toggleMute: () => void;
  toggleHandbook: () => void;
  setHintLevel: (level: number) => void;
  triggerKonamiMode: () => void;
  resetProgress: () => void;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);
  const [activeMemoryId, setActiveMemoryIdState] = useState<number | null>(null);
  const [isBooted, setIsBooted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState<boolean>(false);
  const [activeHintLevel, setActiveHintLevel] = useState<number>(0);
  const [showMapView, setShowMapView] = useState<boolean>(false);
  const [konamiActivated, setKonamiActivated] = useState<boolean>(false);

  // Inicialización cliente con LocalStorage
  useEffect(() => {
    const storedUnlocked = getStoredUnlockedMemories();
    const storedMute = getStoredMuteStatus();
    const storedBoot = getStoredBootStatus();

    setUnlockedIds(storedUnlocked);
    setIsMuted(storedMute);
    setIsBooted(storedBoot);
    soundFx.setMuted(storedMute);
  }, []);

  const isFinaleReady = unlockedIds.length >= 12;

  const setActiveMemoryId = (id: number | null) => {
    setActiveMemoryIdState(id);
    setActiveHintLevel(0); // Reiniciar nivel de pista al cambiar de reto
    if (id !== null) {
      soundFx.playClick();
    }
  };

  const unlockMemory = (id: number) => {
    if (!unlockedIds.includes(id)) {
      const updated = [...unlockedIds, id].sort((a, b) => a - b);
      setUnlockedIds(updated);
      saveStoredUnlockedMemories(updated);
      soundFx.playUnlock();

      // Si se desbloqueó la 12, reproducir celebración
      if (updated.length >= 12) {
        soundFx.playCelebration();
      }
    }
  };

  const unlockAllMemories = () => {
    const allIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    setUnlockedIds(allIds);
    saveStoredUnlockedMemories(allIds);
    soundFx.playCelebration();
  };

  const completeBootSequence = () => {
    setIsBooted(true);
    saveStoredBootStatus(true);
    soundFx.playClick();
  };

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    saveStoredMuteStatus(nextState);
    soundFx.setMuted(nextState);
  };

  const toggleHandbook = () => {
    setIsHandbookOpen((prev) => !prev);
    soundFx.playClick();
  };

  const setHintLevel = (level: number) => {
    setActiveHintLevel(level);
    soundFx.playClick();
  };

  const triggerKonamiMode = () => {
    setKonamiActivated(true);
    soundFx.playCelebration();
  };

  const resetProgress = () => {
    clearStoredProgress();
    setUnlockedIds([]);
    setActiveMemoryIdState(null);
    setIsBooted(false);
    setActiveHintLevel(0);
    setShowMapView(false);
    setKonamiActivated(false);
    soundFx.playClick();
  };

  return (
    <MemoryContext.Provider
      value={{
        unlockedIds,
        activeMemoryId,
        isBooted,
        isMuted,
        isHandbookOpen,
        activeHintLevel,
        isFinaleReady,
        showMapView,
        konamiActivated,
        unlockMemory,
        unlockAllMemories,
        setActiveMemoryId,
        setShowMapView,
        completeBootSequence,
        toggleMute,
        toggleHandbook,
        setHintLevel,
        triggerKonamiMode,
        resetProgress,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory debe ser usado dentro de un MemoryProvider');
  }
  return context;
};
