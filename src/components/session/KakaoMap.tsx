'use client';

import { cx } from 'class-variance-authority';
import { useEffect, useRef } from 'react';
import { createKakaoMapLink } from '@/lib/utils';
import { useKakaoMap } from '@/provider/KakaoMapProvider';

interface KakaoMapProps {
  address: string;
  coords: { lat: number; lng: number };
  className?: string;
}

export default function KakaoMap({
  address,
  coords,
  className,
}: KakaoMapProps) {
  const { loaded, createMap, createMarker } = useKakaoMap();
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    const map = createMap(mapRef.current, {
      center: coords,
    });

    if (!map) return;
    createMarker(map, coords);
  }, [loaded, createMap, createMarker, coords]);

  const handleMapClick = () => {
    window.open(
      createKakaoMapLink(address, coords),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      id="map"
      ref={mapRef}
      onClick={handleMapClick}
      className={cx('h-100 w-125 cursor-pointer rounded-xl', className)}
      aria-label="지도 보기"
      role="link"
    />
  );
}
