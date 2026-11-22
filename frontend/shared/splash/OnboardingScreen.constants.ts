export const ONBOARDING_SEEN_KEY = '@sada_e_kisan:has_seen_onboarding';
export const USER_REGISTERED_KEY = '@sada_e_kisan:is_registered';

export type OnboardingIconKey = 'ai_voice' | 'doctor' | 'vendor';

export interface OnboardingSlide {
  id: string;
  stepTag: string;
  iconKey: OnboardingIconKey;
  accentColor: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  speechUr: string;
}

export const ONBOARDING_SLIDES: readonly OnboardingSlide[] = [
  {
    id: 'slide-1-ai-voice',
    stepTag: '01 • AI LEAF SCAN & URDU VOICE',
    iconKey: 'ai_voice',
    accentColor: '#1B4332',
    titleEn: 'AI Leaf Scan & Urdu Voice',
    titleUr: 'پتے کا معائنہ اور اردو آواز',
    descriptionEn:
      'Snap a crop leaf photo for instant AI disease detection, or speak naturally in Urdu to describe symptoms and hear voice advice.',
    descriptionUr:
      'پتے کی تصویر سے بیماری کی فوری تشخیص کریں، یا اردو میں بول کر فصل کا مسئلہ پوچھیں اور آواز میں حل سنیں۔',
    speechUr:
      'پہلی سہولت: پتے کی تصویر سے بیماری کی فوری تشخیص کریں، یا مائیک دبا کر اردو میں فصل کا مسئلہ پوچھیں۔',
  },
  {
    id: 'slide-2-doctors',
    stepTag: '02 • CERTIFIED PLANT DOCTORS',
    iconKey: 'doctor',
    accentColor: '#8D4925',
    titleEn: 'Contact Certified Crop Doctors',
    titleUr: 'ماہرِ زراعت (ڈاکٹر) سے براہِ راست رابطہ',
    descriptionEn:
      'Book appointments, consult expert plant doctors directly for uncertain scans, and receive verified prescriptions with Urdu voice guidance.',
    descriptionUr:
      'تصدیق شدہ زرعی ڈاکٹروں سے وقت بک کریں، براہِ راست مشورہ لیں اور اردو صوتی ہدایات کے ساتھ مستند نسخہ حاصل کریں۔',
    speechUr:
      'دوسری سہولت: تصدیق شدہ زرعی ڈاکٹروں سے وقت بک کریں، براہِ راست مشورہ لیں اور مستند نسخہ حاصل کریں۔',
  },
  {
    id: 'slide-3-vendors',
    stepTag: '03 • VERIFIED AGRO-VENDORS',
    iconKey: 'vendor',
    accentColor: '#2D6A4F',
    titleEn: 'Verified Vendors & Genuine Inputs',
    titleUr: 'رجسٹرڈ دکاندار اور سو فیصد اصلی ادویات',
    descriptionEn:
      'Order authentic pesticides and fertilizers from verified agro-dealers, or register your own agro-shop to manage stock and live orders.',
    descriptionUr:
      'تصدیق شدہ دکانداروں سے سو فیصد اصلی کھاد اور اسپرے منگوائیں، یا بطور وینڈر اپنی دکان رجسٹر کر کے آرڈرز مینج کریں۔',
    speechUr:
      'تیسری سہولت: تصدیق شدہ دکانداروں سے اصلی کھاد اور اسپرے منگوائیں، یا بطور وینڈر اپنی دکان رجسٹر کریں۔',
  },
];
