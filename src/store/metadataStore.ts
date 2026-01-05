import { create } from 'zustand';

interface MetadataState {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    images: string;
  };
  setMetadata: (metadata: Partial<MetadataState>) => void;
}

export const useMetadataStore = create<MetadataState>((set) => ({
  title: '먼데이 타이거즈',
  description: '월요일에 만나는 기아 타이거즈 기록 이야기',
  openGraph: {
    title: '먼데이 타이거즈',
    description: '월요일에 만나는 기아 타이거즈 기록 이야기',
    images: 'web-app-manifest-512x512.png',
  },
  icons: {
    icon: 'favicon/favicon.ico',
  },
  setMetadata: (metadata) =>
    set((state) => ({
      ...state,
      ...metadata,
      openGraph: {
        ...state.openGraph,
        ...metadata.openGraph,
      },
    })),
}));