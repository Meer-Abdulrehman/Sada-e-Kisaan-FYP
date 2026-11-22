import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';
import { Colors } from '../theme/theme';
import {
  APP_LOGO,
  INNER_RING_CIRCUMFERENCE,
  LEAF_MIDRIB_PATH,
  LEAF_OUTLINE_LENGTH,
  LEAF_SECONDARY_VEIN_PATHS,
  LEAF_SILHOUETTE_PATH,
  LOGO_BOX_SIZE,
  MAX_WAVE_BAR_LENGTH,
  MIDRIB_LENGTH,
  OUTER_RING_CIRCUMFERENCE,
  SCANNER_TICKS,
  SQUIRCLE_PERIMETER,
  VEINS_LENGTH,
  WAVE_BARS,
  WAVE_BASE_LINE_LENGTH,
} from './SplashScreen.constants';
import { splashStyles as styles } from './SplashScreen.styles';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);

export interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // JS-driven Animated.Values (SVG strokeDashoffset + background color interpolation)
  const squircleProgress = useRef<Animated.Value>(new Animated.Value(0)).current;
  const ringProgress = useRef<Animated.Value>(new Animated.Value(0)).current;
  const leafProgress = useRef<Animated.Value>(new Animated.Value(0)).current;
  const veinsProgress = useRef<Animated.Value>(new Animated.Value(0)).current;
  const waveProgress = useRef<Animated.Value>(new Animated.Value(0)).current;
  const bgProgress = useRef<Animated.Value>(new Animated.Value(0)).current;

  // Native-driven Animated.Values (opacity & transforms only)
  const blueprintOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const dotsOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const vectorFillOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const sketchOpacity = useRef<Animated.Value>(new Animated.Value(1)).current;
  const logoColorOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const logoScale = useRef<Animated.Value>(new Animated.Value(0.96)).current;
  const haloScale = useRef<Animated.Value>(new Animated.Value(0.88)).current;
  const haloOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const shimmerTranslateX = useRef<Animated.Value>(new Animated.Value(-260)).current;
  const titleOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const titleTranslateY = useRef<Animated.Value>(new Animated.Value(18)).current;

  const onFinishRef = useRef<() => void>(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    let isCancelled = false;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;

    // Phase 1: Sequential artist pencil-sketch on pure white drafting sheet
    const phase1Sketch = Animated.sequence([
      Animated.delay(240),
      Animated.timing(blueprintOpacity, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(squircleProgress, {
        toValue: 1,
        duration: 580,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(ringProgress, {
          toValue: 1,
          duration: 620,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.delay(320),
          Animated.timing(dotsOpacity, {
            toValue: 1,
            duration: 280,
            useNativeDriver: true,
          }),
        ]),
      ]),
      Animated.timing(leafProgress, {
        toValue: 1,
        duration: 880,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(veinsProgress, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(waveProgress, {
        toValue: 1,
        duration: 740,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.delay(280),
    ]);

    // Phase 2 & 3: Vector color wash -> 3D glass bloom + shimmer -> Warm Ivory & brand reveal
    const phase2ColorAndGlass = Animated.parallel([
      Animated.timing(vectorFillOpacity, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(bgProgress, {
        toValue: 1,
        duration: 900,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(blueprintOpacity, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(240),
        Animated.parallel([
          Animated.timing(logoColorOpacity, {
            toValue: 1,
            duration: 520,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(sketchOpacity, {
            toValue: 0,
            duration: 460,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(logoScale, {
              toValue: 1.05,
              duration: 300,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(logoScale, {
              toValue: 1,
              duration: 280,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(haloScale, {
              toValue: 1.26,
              duration: 720,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(haloOpacity, {
                toValue: 0.38,
                duration: 240,
                useNativeDriver: true,
              }),
              Animated.timing(haloOpacity, {
                toValue: 0,
                duration: 480,
                useNativeDriver: true,
              }),
            ]),
          ]),
        ]),
      ]),
      Animated.sequence([
        Animated.delay(540),
        Animated.timing(shimmerTranslateX, {
          toValue: 260,
          duration: 520,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(560),
        Animated.parallel([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 450,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(titleTranslateY, {
            toValue: 0,
            duration: 450,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]);

    const masterTimeline = Animated.sequence([phase1Sketch, phase2ColorAndGlass]);

    masterTimeline.start(({ finished }) => {
      if (finished && !isCancelled) {
        holdTimer = setTimeout(() => {
          if (!isCancelled) {
            onFinishRef.current();
          }
        }, 850);
      }
    });

    return () => {
      isCancelled = true;
      masterTimeline.stop();
      if (holdTimer) {
        clearTimeout(holdTimer);
      }
    };
  }, [
    bgProgress,
    blueprintOpacity,
    dotsOpacity,
    haloOpacity,
    haloScale,
    leafProgress,
    logoColorOpacity,
    logoScale,
    ringProgress,
    shimmerTranslateX,
    sketchOpacity,
    squircleProgress,
    titleOpacity,
    titleTranslateY,
    vectorFillOpacity,
    veinsProgress,
    waveProgress,
  ]);

  const squircleOffset = squircleProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [SQUIRCLE_PERIMETER, 0],
  });
  const outerRingOffset = ringProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [OUTER_RING_CIRCUMFERENCE, 0],
  });
  const innerRingOffset = ringProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [INNER_RING_CIRCUMFERENCE, 0],
  });
  const leafOutlineOffset = leafProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [LEAF_OUTLINE_LENGTH, 0],
  });
  const midribOffset = veinsProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [MIDRIB_LENGTH, 0],
  });
  const secondaryVeinOffset = veinsProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [VEINS_LENGTH, 0],
  });
  const waveBaseLineOffset = waveProgress.interpolate({
    inputRange: [0, 0.35],
    outputRange: [WAVE_BASE_LINE_LENGTH, 0],
    extrapolate: 'clamp',
  });

  const waveBarOffsets = WAVE_BARS.map((_, index) => {
    const start = 0.12 + (index / (WAVE_BARS.length - 1)) * 0.52;
    const end = Math.min(1, start + 0.36);
    return waveProgress.interpolate({
      inputRange: [start, end],
      outputRange: [MAX_WAVE_BAR_LENGTH, 0],
      extrapolate: 'clamp',
    });
  });

  const backgroundColor = bgProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', Colors.canvas],
  });

  return (
    <Animated.View style={[styles.root, { backgroundColor }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerStage}>
          <View style={styles.logoStageWrapper}>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.haloRing,
                { opacity: haloOpacity, transform: [{ scale: haloScale }] },
              ]}
            />

            <Animated.View style={[styles.logoBox, { transform: [{ scale: logoScale }] }]}>
              {/* Stage 2a: Flat vector color wash inside the sketch */}
              <Animated.View
                pointerEvents="none"
                style={[StyleSheet.absoluteFill, { opacity: vectorFillOpacity }]}
              >
                <Svg width={LOGO_BOX_SIZE} height={LOGO_BOX_SIZE} viewBox="0 0 200 200">
                  <Rect x={0} y={0} width={200} height={200} rx={38} ry={38} fill={Colors.primary} />
                  <Circle
                    cx={100}
                    cy={100}
                    r={68}
                    fill="none"
                    stroke="rgba(224, 159, 62, 0.45)"
                    strokeWidth={1.5}
                  />
                  <Path d={LEAF_SILHOUETTE_PATH} fill={Colors.healthy} />
                  <Line
                    x1={46}
                    y1={100}
                    x2={154}
                    y2={100}
                    stroke="#E09F3E"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                  {WAVE_BARS.map((bar) => (
                    <Line
                      key={bar.x}
                      x1={bar.x}
                      y1={100 - bar.halfHeight}
                      x2={bar.x}
                      y2={100 + bar.halfHeight}
                      stroke="#F4C467"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                    />
                  ))}
                </Svg>
              </Animated.View>

              {/* Stage 2b: Full 3D glass logo image */}
              <Animated.View style={[styles.colorFillLayer, { opacity: logoColorOpacity }]}>
                <Image source={APP_LOGO} style={styles.croppedLogoImage} resizeMode="cover" />
              </Animated.View>

              {/* Drafting construction grid */}
              <Animated.View
                pointerEvents="none"
                style={[StyleSheet.absoluteFill, { opacity: blueprintOpacity }]}
              >
                <Svg width={LOGO_BOX_SIZE} height={LOGO_BOX_SIZE} viewBox="0 0 200 200">
                  <Line x1={100} y1={8} x2={100} y2={192} stroke="#D6D3CD" strokeWidth={0.8} strokeDasharray={[4, 4]} />
                  <Line x1={8} y1={100} x2={192} y2={100} stroke="#D6D3CD" strokeWidth={0.8} strokeDasharray={[4, 4]} />
                  <Line x1={32} y1={168} x2={168} y2={32} stroke="#E5E2DC" strokeWidth={0.7} strokeDasharray={[3, 5]} />
                </Svg>
              </Animated.View>

              {/* Stage 1: Black pencil-sketch SVG outline layer */}
              <Animated.View
                pointerEvents="none"
                style={[styles.sketchLayer, { opacity: sketchOpacity }]}
              >
                <Svg width={LOGO_BOX_SIZE} height={LOGO_BOX_SIZE} viewBox="0 0 200 200">
                  <AnimatedRect
                    x={2}
                    y={2}
                    width={196}
                    height={196}
                    rx={38}
                    ry={38}
                    fill="none"
                    stroke="#111111"
                    strokeWidth={2.8}
                    strokeDasharray={[SQUIRCLE_PERIMETER, SQUIRCLE_PERIMETER]}
                    strokeDashoffset={squircleOffset}
                  />

                  <G transform="rotate(-90 100 100)">
                    <AnimatedCircle
                      cx={100}
                      cy={100}
                      r={71}
                      fill="none"
                      stroke="#1F1F1F"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeDasharray={[OUTER_RING_CIRCUMFERENCE, OUTER_RING_CIRCUMFERENCE]}
                      strokeDashoffset={outerRingOffset}
                    />
                    <AnimatedCircle
                      cx={100}
                      cy={100}
                      r={65}
                      fill="none"
                      stroke="#4A4A4A"
                      strokeWidth={1.0}
                      strokeLinecap="round"
                      strokeDasharray={[INNER_RING_CIRCUMFERENCE, INNER_RING_CIRCUMFERENCE]}
                      strokeDashoffset={innerRingOffset}
                    />
                  </G>

                  {/* Leaf silhouette (soft graphite under-stroke + crisp ink) */}
                  <AnimatedPath
                    d={LEAF_SILHOUETTE_PATH}
                    fill="none"
                    stroke="rgba(17, 17, 17, 0.2)"
                    strokeWidth={4.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={[LEAF_OUTLINE_LENGTH, LEAF_OUTLINE_LENGTH]}
                    strokeDashoffset={leafOutlineOffset}
                  />
                  <AnimatedPath
                    d={LEAF_SILHOUETTE_PATH}
                    fill="none"
                    stroke="#111111"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={[LEAF_OUTLINE_LENGTH, LEAF_OUTLINE_LENGTH]}
                    strokeDashoffset={leafOutlineOffset}
                  />

                  <AnimatedPath
                    d={LEAF_MIDRIB_PATH}
                    fill="none"
                    stroke="#1E1E1E"
                    strokeWidth={2.0}
                    strokeLinecap="round"
                    strokeDasharray={[MIDRIB_LENGTH, MIDRIB_LENGTH]}
                    strokeDashoffset={midribOffset}
                  />
                  {LEAF_SECONDARY_VEIN_PATHS.map((veinPath) => (
                    <AnimatedPath
                      key={veinPath}
                      d={veinPath}
                      fill="none"
                      stroke="#2B2B2B"
                      strokeWidth={1.4}
                      strokeLinecap="round"
                      strokeDasharray={[VEINS_LENGTH, VEINS_LENGTH]}
                      strokeDashoffset={secondaryVeinOffset}
                    />
                  ))}

                  <AnimatedLine
                    x1={46}
                    y1={100}
                    x2={154}
                    y2={100}
                    stroke="#111111"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeDasharray={[WAVE_BASE_LINE_LENGTH, WAVE_BASE_LINE_LENGTH]}
                    strokeDashoffset={waveBaseLineOffset}
                  />
                  {WAVE_BARS.map((bar, index) => (
                    <AnimatedLine
                      key={bar.x}
                      x1={bar.x}
                      y1={100 - bar.halfHeight}
                      x2={bar.x}
                      y2={100 + bar.halfHeight}
                      stroke="#111111"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeDasharray={[MAX_WAVE_BAR_LENGTH, MAX_WAVE_BAR_LENGTH]}
                      strokeDashoffset={waveBarOffsets[index]}
                    />
                  ))}
                </Svg>

                <Animated.View
                  pointerEvents="none"
                  style={[StyleSheet.absoluteFill, { opacity: dotsOpacity }]}
                >
                  <Svg width={LOGO_BOX_SIZE} height={LOGO_BOX_SIZE} viewBox="0 0 200 200">
                    {SCANNER_TICKS.map((tick) => (
                      <Line
                        key={tick.id}
                        x1={tick.x1}
                        y1={tick.y1}
                        x2={tick.x2}
                        y2={tick.y2}
                        stroke="#444444"
                        strokeWidth={1.0}
                        strokeLinecap="round"
                      />
                    ))}
                    <Circle cx={100} cy={29} r={2.8} fill="#FFFFFF" stroke="#111111" strokeWidth={1.5} />
                    <Circle cx={171} cy={100} r={2.8} fill="#FFFFFF" stroke="#111111" strokeWidth={1.5} />
                    <Circle cx={100} cy={171} r={2.8} fill="#FFFFFF" stroke="#111111" strokeWidth={1.5} />
                    <Circle cx={29} cy={100} r={2.8} fill="#FFFFFF" stroke="#111111" strokeWidth={1.5} />
                    <Line x1={100} y1={22} x2={100} y2={25.5} stroke="#111111" strokeWidth={1.3} strokeLinecap="round" />
                    <Line x1={174.5} y1={100} x2={178} y2={100} stroke="#111111" strokeWidth={1.3} strokeLinecap="round" />
                    <Line x1={100} y1={174.5} x2={100} y2={178} stroke="#111111" strokeWidth={1.3} strokeLinecap="round" />
                    <Line x1={22} y1={100} x2={25.5} y2={100} stroke="#111111" strokeWidth={1.3} strokeLinecap="round" />
                  </Svg>
                </Animated.View>
              </Animated.View>

              {/* Diagonal specular light sheen */}
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.shimmerBeam,
                  { transform: [{ translateX: shimmerTranslateX }, { rotate: '-25deg' }] },
                ]}
              />
            </Animated.View>
          </View>

          <Animated.View
            style={[
              styles.brandReveal,
              { opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] },
            ]}
          >
            <Text style={styles.brandTitle}>Sada-e-Kisan</Text>
            <Text style={styles.brandTitleUrdu}>صدائے کسان</Text>
            <View style={styles.subtitlePill}>
              <Text style={styles.subtitleText}>AI Crop Diagnostics • Urdu Voice Advisory</Text>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default SplashScreen;
