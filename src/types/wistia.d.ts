declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': {
        'media-id': string;
        seo?: string;
        aspect?: string;
        children?: React.ReactNode;
      };
    }
  }

  interface Window {
    Wistia?: {
      api: (mediaId: string) => {
        bind: (event: string, callback: (time: number) => void) => void;
      };
    };
  }
}

export {};