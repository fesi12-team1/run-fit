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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);

  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    const container = containerRef.current;

    const map = createMap(container, {
      center: coords,
    });

    if (!map) return;
    mapRef.current = map;

    const marker = createMarker(map, coords);
    markerRef.current = marker || null;

    return () => {
      markerRef.current?.setMap(null);
      container.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, createMap, createMarker, coords.lat, coords.lng]);

  const handleMapClick = () => {
    window.open(
      createKakaoMapLink(address, coords),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      ref={containerRef}
      onClick={handleMapClick}
      onKeyDown={(e) => e.key === 'Enter' && handleMapClick()}
      tabIndex={0}
      className={cx('cursor-pointer', className)}
      aria-label="지도 보기"
      role="link"
    />
  );
}
