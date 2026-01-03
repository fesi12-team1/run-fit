'use client';

import Script from 'next/script';
import React, { createContext, useContext, useState } from 'react';

const DAUM_POSTCODE_SCRIPT_SRC = `${process.env.NEXT_PUBLIC_DAUM_POSTCODE_URL || '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'}`;

type AddressData = Pick<daum.PostcodeData, 'address' | 'sido' | 'sigungu'>;

interface DaumPostcodeContextValue {
  loaded: boolean;
  openAddressSearch: (onSelectComplete: (data: AddressData) => void) => void;
}

const DaumPostcodeContext = createContext<DaumPostcodeContextValue | null>(
  null
);

export function DaumPostcodeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [, setError] = useState<Error | null>(null);

  const openAddressSearch = (onSelectComplete: (data: AddressData) => void) => {
    if (!window.daum?.Postcode) {
      console.warn('Daum Postcode script가 로드되지 않았습니다.');
      return;
    }

    return new window.daum.Postcode({
      oncomplete: (data) => {
        onSelectComplete({
          address: data.address,
          sido: data.sido,
          sigungu: data.sigungu?.split(' ')[0] ?? data.sido,
        });
      },
    }).open({
      popupTitle: '도로명 주소 검색',
      popupKey: 'postcodePopup',
    });
  };

  const handleLoad = () => {
    if (window.daum?.Postcode) {
      setLoaded(true);
    } else {
      setError(
        new Error(
          'Daum Postcode script loaded, but window.daum.Postcode is not available.'
        )
      );
    }
  };

  const handleError = () => {
    setError(new Error('Failed to load Daum Postcode script'));
  };

  /*
    useEffect(() => {
      if (error) {
        throw error;
      }
    }, [error]);
  */

  return (
    <>
      <Script
        src={DAUM_POSTCODE_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => handleLoad()}
        onError={() => handleError()}
      />
      <DaumPostcodeContext.Provider value={{ loaded, openAddressSearch }}>
        {children}
      </DaumPostcodeContext.Provider>
    </>
  );
}

export function useDaumPostcode() {
  const ctx = useContext(DaumPostcodeContext);
  if (!ctx) {
    throw new Error('useDaumPostcode must be used within DaumPostcodeProvider');
  }
  return ctx;
}
