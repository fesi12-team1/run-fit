'use client';

import Script from 'next/script';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Coords, Document } from '@/types/kakaoMap';

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const KAKAO_MAP_URL = process.env.NEXT_PUBLIC_KAKAO_MAP_URL;

const KAKAO_MAP_SCRIPT_SRC =
  KAKAO_JS_KEY && KAKAO_MAP_URL
    ? `${KAKAO_MAP_URL}?appkey=${KAKAO_JS_KEY}&autoload=false`
    : null;

type CreateMapFn = (
  container: HTMLElement,
  options: Omit<kakao.maps.MapOptions, 'center'> & {
    center: Coords;
  }
) => kakao.maps.Map | undefined;

type CreateMarkerFn = (
  map: kakao.maps.Map,
  position: Coords
) => kakao.maps.Marker | undefined;

type ConvertAddressToCoordsFn = (
  address: string,
  onComplete: (coords: Coords | null) => void
) => void;

interface KakaoMapContextValue {
  createMap: CreateMapFn;
  createMarker: CreateMarkerFn;
  convertAddressToCoords: ConvertAddressToCoordsFn;
}

const KakaoMapContext = createContext<KakaoMapContextValue | null>(null);

export function KakaoMapProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createMap: CreateMapFn = useCallback((container, options) => {
    if (!window.kakao?.maps) {
      console.warn('Kakao Map is not loaded yet.');
      return;
    }

    const center = new window.kakao.maps.LatLng(
      options.center.lat,
      options.center.lng
    );

    const mapOptions = {
      draggable: false,
      scrollwheel: false,
      ...options,
      center: center,
    };

    return new window.kakao.maps.Map(container, mapOptions);
  }, []);

  const createMarker: CreateMarkerFn = useCallback((map, position) => {
    if (!window.kakao?.maps) {
      console.warn('Kakao Map is not loaded yet.');
      return;
    }
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(position.lat, position.lng),
    });

    marker.setMap(map);
    return marker;
  }, []);

  const convertAddressToCoords: ConvertAddressToCoordsFn = useCallback(
    (address, onComplete) => {
      if (!window.kakao?.maps) {
        onComplete(null);
        return;
      }

      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(
        address,
        (result: Document[], status: kakao.maps.services.Status) => {
          if (status === kakao.maps.services.Status.OK && result[0]) {
            onComplete({
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x),
            });
          } else {
            onComplete(null);
          }
        }
      );
    },
    []
  );

  const handleLoad = () => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        setLoaded(true);
      });
    } else {
      setError(
        new Error(
          'Kakao Map script loaded, but window.kakao.maps is not available.'
        )
      );
    }
  };

  const handleError = () => {
    setError(new Error('Failed to load Kakao Map script'));
  };

  useEffect(() => {
    if (window.kakao?.maps && !loaded) {
      window.kakao.maps.load(() => setLoaded(true));
    }
  }, [loaded]);

  useEffect(() => {
    if (error) {
      console.error('Kakao Map Provider Error:', error);
    }
  }, [error]);

  return (
    <>
      {KAKAO_MAP_SCRIPT_SRC && (
        <Script
          src={KAKAO_MAP_SCRIPT_SRC}
          strategy="afterInteractive"
          onLoad={() => handleLoad()}
          onError={() => handleError()}
        />
      )}
      <KakaoMapContext.Provider
        value={{ createMap, createMarker, convertAddressToCoords }}
      >
        {children}
      </KakaoMapContext.Provider>
    </>
  );
}

export function useKakaoMap() {
  const ctx = useContext(KakaoMapContext);
  if (!ctx) {
    throw new Error('useKakaoMap must be used within KakaoMapProvider');
  }
  return ctx;
}
