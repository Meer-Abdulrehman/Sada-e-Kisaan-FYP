import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import {
  CheckCircle2,
  ScanLine,
  Sprout,
  Stethoscope,
  Store,
  Volume2,
  VolumeX,
} from 'lucide-react-native';
import { ONBOARDING_SLIDES, OnboardingIconKey, OnboardingSlide } from './OnboardingScreen.constants';
import { onboardingStyles as styles } from './OnboardingScreen.styles';

export interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  useEffect(() => {
    return () => {
      void Speech.stop();
    };
  }, []);

  const stopAudio = async (): Promise<void> => {
    try {
      await Speech.stop();
    } catch {
      // Ignore speech cleanup errors
    }
    setIsSpeaking(false);
  };

  const handleToggleSpeech = async (urduText: string): Promise<void> => {
    try {
      const speaking = await Speech.isSpeakingAsync();
      if (speaking || isSpeaking) {
        await stopAudio();
        return;
      }

      setIsSpeaking(true);
      Speech.speak(urduText, {
        language: 'ur-PK',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch {
      setIsSpeaking(false);
    }
  };

  const handleFinish = (): void => {
    void stopAudio();
    onComplete();
  };

  const onViewableItemsChanged = useRef<
    NonNullable<FlatListProps<OnboardingSlide>['onViewableItemsChanged']>
  >(({ viewableItems }) => {
    const firstVisible = viewableItems[0];
    if (firstVisible?.index !== null && firstVisible?.index !== undefined) {
      setActiveIndex(firstVisible.index);
      void Speech.stop();
      setIsSpeaking(false);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderSlideIcon = (iconKey: OnboardingIconKey): React.JSX.Element => {
    switch (iconKey) {
      case 'ai_voice':
        return <ScanLine size={40} color="#FFFFFF" />;
      case 'doctor':
        return <Stethoscope size={40} color="#FFFFFF" />;
      case 'vendor':
        return <Store size={40} color="#FFFFFF" />;
    }
  };

  const renderSlide = ({ item }: ListRenderItemInfo<OnboardingSlide>): React.JSX.Element => (
    <View style={[styles.slideContainer, { width }]}>
      <View style={styles.illustrationCard}>
        <View style={[styles.stepPill, { backgroundColor: item.accentColor }]}>
          <Text style={styles.stepPillText}>{item.stepTag}</Text>
        </View>

        <View
          style={[
            styles.iconCircleOuter,
            { backgroundColor: `${item.accentColor}22` },
          ]}
        >
          <View style={[styles.iconCircleInner, { backgroundColor: item.accentColor }]}>
            {renderSlideIcon(item.iconKey)}
          </View>
        </View>
      </View>

      <View style={styles.contentBlock}>
        <Text style={styles.titleEn}>{item.titleEn}</Text>
        <Text style={styles.titleUr}>{item.titleUr}</Text>
        <Text style={styles.descEn}>{item.descriptionEn}</Text>
        <Text style={styles.descUr}>{item.descriptionUr}</Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.audioButton, isSpeaking && styles.audioButtonActive]}
          onPress={() => {
            void handleToggleSpeech(item.speechUr);
          }}
          accessibilityRole="button"
          accessibilityLabel="Listen in Urdu"
        >
          {isSpeaking ? (
            <VolumeX size={18} color="#FFFFFF" />
          ) : (
            <Volume2 size={18} color={item.accentColor} />
          )}
          <Text
            style={[
              styles.audioButtonText,
              !isSpeaking && { color: item.accentColor },
              isSpeaking && styles.audioButtonTextActive,
            ]}
          >
            {isSpeaking ? 'آواز بند کریں (Stop)' : 'اردو میں سنیں (Listen)'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar with Mini Brand & Skip Button */}
      <View style={styles.topBar}>
        <View style={styles.brandMiniWrap}>
          <Sprout size={20} color="#1B4332" />
          <Text style={styles.brandMiniText}>Sada-e-Kisan</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.skipButton}
          onPress={handleFinish}
          accessibilityRole="button"
          accessibilityLabel="Skip Onboarding"
        >
          <Text style={styles.skipText}>Skip • چھوڑیں</Text>
        </TouchableOpacity>
      </View>

      {/* 3 Swipeable Guidance Slides */}
      <FlatList
        ref={listRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Footer: Pagination Dots + Swipe Hint (Slides 1-2) OR Get Started CTA (Last Slide Only) */}
      <View style={styles.footer}>
        <View style={styles.dotsRow}>
          {ONBOARDING_SLIDES.map((slide, idx) => (
            <View
              key={slide.id}
              style={[
                styles.dot,
                idx === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {isLastSlide ? (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryCta}
            onPress={handleFinish}
            accessibilityRole="button"
            accessibilityLabel="Get Started"
          >
            <Text style={styles.primaryCtaText}>Get Started • شروع کریں</Text>
            <CheckCircle2 size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <View style={styles.swipeHintBox}>
            <Text style={styles.swipeHintEn}>Swipe left to continue →</Text>
            <Text style={styles.swipeHintUr}>آگے بڑھنے کے لیے سوائپ کریں</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
