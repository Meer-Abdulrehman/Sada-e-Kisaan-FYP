import { ImageSourcePropType } from 'react-native';

export const APP_LOGO: ImageSourcePropType = require('../assets/logo.png');

// Logo frame dimensions aligned directly to the 630/1024 squircle crop in logo.png
export const LOGO_BOX_SIZE = 216;
export const LOGO_CORNER_RADIUS = 41;
export const FULL_IMAGE_SIZE = 354;

// SVG path lengths (padded slightly for clean start-to-end concealment)
export const SQUIRCLE_PERIMETER = 740;
export const OUTER_RING_CIRCUMFERENCE = 450;
export const INNER_RING_CIRCUMFERENCE = 412;
export const LEAF_OUTLINE_LENGTH = 430;
export const MIDRIB_LENGTH = 165;
export const VEINS_LENGTH = 60;
export const WAVE_BASE_LINE_LENGTH = 112;
export const MAX_WAVE_BAR_LENGTH = 56;

// Leaf & vein SVG path geometry
export const LEAF_SILHOUETTE_PATH =
  'M 45 160 C 48 148 53 136 53 114 C 52 84 68 58 151 39 C 154 78 148 110 126 132 C 110 144 82 145 58 146 C 55 152 52 158 48 161 Z';
export const LEAF_MIDRIB_PATH = 'M 47 160 Q 86 112 146 44';
export const LEAF_SECONDARY_VEIN_PATHS: readonly string[] = [
  'M 72 132 Q 66 112 72 95',
  'M 94 106 Q 82 88 86 73',
  'M 82 121 Q 106 124 123 116',
  'M 106 95 Q 124 96 138 86',
];

export interface WaveBarSpec {
  x: number;
  halfHeight: number;
}

export const WAVE_BARS: readonly WaveBarSpec[] = [
  { x: 52, halfHeight: 2 },
  { x: 58, halfHeight: 5 },
  { x: 64, halfHeight: 9 },
  { x: 70, halfHeight: 14 },
  { x: 76, halfHeight: 11 },
  { x: 82, halfHeight: 18 },
  { x: 88, halfHeight: 13 },
  { x: 94, halfHeight: 21 },
  { x: 100, halfHeight: 27 },
  { x: 106, halfHeight: 21 },
  { x: 112, halfHeight: 13 },
  { x: 118, halfHeight: 18 },
  { x: 124, halfHeight: 11 },
  { x: 130, halfHeight: 14 },
  { x: 136, halfHeight: 9 },
  { x: 142, halfHeight: 5 },
  { x: 148, halfHeight: 2 },
];

export interface TickSpec {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// 20 precision optical scanner ticks around the 360-degree ring (excluding 4 cardinal dots)
export const SCANNER_TICKS: readonly TickSpec[] = Array.from({ length: 24 }, (_, idx) => idx)
  .filter((idx) => idx % 6 !== 0)
  .map((idx) => {
    const rad = (idx * 15 * Math.PI) / 180;
    const innerR = idx % 2 === 0 ? 66.0 : 67.2;
    const outerR = 69.5;
    return {
      id: idx,
      x1: Number((100 + innerR * Math.cos(rad)).toFixed(2)),
      y1: Number((100 + innerR * Math.sin(rad)).toFixed(2)),
      x2: Number((100 + outerR * Math.cos(rad)).toFixed(2)),
      y2: Number((100 + outerR * Math.sin(rad)).toFixed(2)),
    };
  });
