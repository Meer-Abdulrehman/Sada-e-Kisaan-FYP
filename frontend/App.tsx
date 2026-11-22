import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RotateCcw, ShieldCheck } from 'lucide-react-native';
import SplashScreen from './shared/splash/SplashScreen';
import OnboardingScreen from './shared/splash/OnboardingScreen';
import {
  ONBOARDING_SEEN_KEY,
  USER_REGISTERED_KEY,
} from './shared/splash/OnboardingScreen.constants';
import { Accessibility, BorderRadius, Colors, Spacing } from './shared/theme/theme';

type AppLaunchStage = 'SPLASH' | 'ONBOARDING' | 'AUTH_READY';

export default function App(): React.JSX.Element {
  const [stage, setStage] = useState<AppLaunchStage>('SPLASH');
  const shouldSkipOnboardingRef = useRef<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const loadLaunchFlags = async (): Promise<void> => {
      try {
        const entries = await AsyncStorage.multiGet([
          ONBOARDING_SEEN_KEY,
          USER_REGISTERED_KEY,
        ]);
        if (!mounted) return;
        const hasSeenOnboarding = entries[0]?.[1] === 'true';
        const isRegistered = entries[1]?.[1] === 'true';
        shouldSkipOnboardingRef.current = hasSeenOnboarding || isRegistered;
      } catch {
        shouldSkipOnboardingRef.current = false;
      }
    };
    void loadLaunchFlags();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSplashFinish = (): void => {
    if (shouldSkipOnboardingRef.current) {
      setStage('AUTH_READY');
    } else {
      setStage('ONBOARDING');
    }
  };

  const handleOnboardingComplete = (): void => {
    shouldSkipOnboardingRef.current = true;
    void AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
    setStage('AUTH_READY');
  };

  const handleResetFirstTimeFlow = async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([ONBOARDING_SEEN_KEY, USER_REGISTERED_KEY]);
    } catch {
      // Ignore storage clear errors
    }
    shouldSkipOnboardingRef.current = false;
    setStage('SPLASH');
  };

  const handleReplayReturningFlow = (): void => {
    shouldSkipOnboardingRef.current = true;
    setStage('SPLASH');
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {stage === 'SPLASH' && <SplashScreen onFinish={handleSplashFinish} />}

      {stage === 'ONBOARDING' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}

      {stage === 'AUTH_READY' && (
        <SafeAreaView style={styles.readyRoot}>
          <View style={styles.readyCard}>
            <ShieldCheck size={40} color={Colors.healthy} />
            <Text style={styles.readyTitleEn}>Sada-e-Kisan Ready</Text>
            <Text style={styles.readyTitleUr}>صدائے کسان — اگلا مرحلہ لاگ ان / رجسٹریشن</Text>
            <Text style={styles.readyHint}>
              Onboarding is now saved as completed. Closing and reopening the app will
              show ONLY the Logo Splash Screen and come straight here.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.primaryBtn}
              onPress={handleReplayReturningFlow}
            >
              <RotateCcw size={18} color={Colors.textInverse} />
              <Text style={styles.primaryBtnText}>Test Returning User (Logo Splash Only)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.outlineBtn}
              onPress={() => {
                void handleResetFirstTimeFlow();
              }}
            >
              <RotateCcw size={18} color={Colors.primary} />
              <Text style={styles.outlineBtnText}>Test New User (Logo + 3 Guidance Screens)</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  readyRoot: {
    flex: 1,
    backgroundColor: Colors.canvas,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  readyCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  readyTitleEn: {
    marginTop: Spacing.md,
    fontSize: 22,
    fontWeight: '900',
    color: Colors.primary,
  },
  readyTitleUr: {
    marginTop: Spacing.xs,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.accent,
    textAlign: 'center',
  },
  readyHint: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  primaryBtn: {
    width: '100%',
    minHeight: Accessibility.touchTargetMin,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: Spacing.md,
  },
  primaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  outlineBtn: {
    marginTop: Spacing.sm,
    width: '100%',
    minHeight: Accessibility.touchTargetMin,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: Spacing.md,
  },
  outlineBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
});
