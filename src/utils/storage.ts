// Helper seguro para interacción con LocalStorage (Exportación Estática SSG)

const STORAGE_KEYS = {
  UNLOCKED_MEMORIES: 'leris_memories_unlocked',
  AUDIO_MUTED: 'leris_memories_muted',
  BOOT_COMPLETED: 'leris_memories_booted',
  LETTER_READ: 'leris_memories_letter_read',
  SECRET_NOTE: 'secret_note_cartagena',
};

export const getStoredUnlockedMemories = (): number[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.UNLOCKED_MEMORIES);
    if (!data) return []; // Inicialmente ningún reto está resuelto
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveStoredUnlockedMemories = (unlocked: number[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_MEMORIES, JSON.stringify(unlocked));
  } catch {
    // Silencioso
  }
};

export const getStoredMuteStatus = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEYS.AUDIO_MUTED) === 'true';
  } catch {
    return false;
  }
};

export const saveStoredMuteStatus = (muted: boolean): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.AUDIO_MUTED, String(muted));
  } catch {
    // Silencioso
  }
};

export const getStoredBootStatus = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEYS.BOOT_COMPLETED) === 'true';
  } catch {
    return false;
  }
};

export const saveStoredBootStatus = (booted: boolean): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.BOOT_COMPLETED, String(booted));
    // Guardar también un mensaje oculto en LocalStorage como Easter Egg
    localStorage.setItem(
      STORAGE_KEYS.SECRET_NOTE,
      "Recuerdo cifrado #000: 'Cartagena no fue solo un viaje, fue el origen de una hermosa historia. Feliz cumpleaños Leris ✨'"
    );
  } catch {
    // Silencioso
  }
};

export const getStoredLetterRead = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEYS.LETTER_READ) === 'true';
  } catch {
    return false;
  }
};

export const saveStoredLetterRead = (read: boolean): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.LETTER_READ, String(read));
  } catch {
    // Silencioso
  }
};

export const clearStoredProgress = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.UNLOCKED_MEMORIES);
    localStorage.removeItem(STORAGE_KEYS.BOOT_COMPLETED);
    localStorage.removeItem(STORAGE_KEYS.LETTER_READ);
  } catch {
    // Silencioso
  }
};
