import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../theme/theme';
import { FULL_IMAGE_SIZE, LOGO_BOX_SIZE, LOGO_CORNER_RADIUS } from './SplashScreen.constants';

export const splashStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  centerStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  logoStageWrapper: {
    width: LOGO_BOX_SIZE,
    height: LOGO_BOX_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloRing: {
    position: 'absolute',
    width: LOGO_BOX_SIZE,
    height: LOGO_BOX_SIZE,
    borderRadius: LOGO_CORNER_RADIUS + 8,
    borderWidth: 3,
    borderColor: Colors.healthy,
    backgroundColor: 'rgba(45, 106, 79, 0.14)',
  },
  logoBox: {
    width: LOGO_BOX_SIZE,
    height: LOGO_BOX_SIZE,
    borderRadius: LOGO_CORNER_RADIUS,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorFillLayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: LOGO_CORNER_RADIUS,
    overflow: 'hidden',
  },
  croppedLogoImage: {
    width: FULL_IMAGE_SIZE,
    height: FULL_IMAGE_SIZE,
  },
  sketchLayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shimmerBeam: {
    position: 'absolute',
    width: 48,
    height: 320,
    backgroundColor: 'rgba(255, 250, 235, 0.30)',
  },
  brandReveal: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 0.6,
  },
  brandTitleUrdu: {
    marginTop: Spacing.xs,
    fontSize: 22,
    fontWeight: '700',
    color: Colors.accent,
  },
  subtitlePill: {
    marginTop: Spacing.md,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
});

export default splashStyles;
