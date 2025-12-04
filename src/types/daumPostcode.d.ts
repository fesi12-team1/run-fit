declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: daum.PostcodeData) => void;
        onclose?: (state: 'FORCE_CLOSE' | 'COMPLETE_CLOSE') => void;
      }) => {
        open: () => void;
      };
    };
  }
}
