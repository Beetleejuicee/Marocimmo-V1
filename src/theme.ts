import { Platform } from 'react-native';

export const colors = {
  // Brand
  dark: '#17181C',
  darkSoft: '#22242A',
  lime: '#A8E92A',
  limeDark: '#7CBF13',
  // Surfaces
  background: '#F5F5F3',
  card: '#FFFFFF',
  // Text
  text: '#17181C',
  textMuted: '#6B7280',
  textOnDark: '#FFFFFF',
  textOnDarkMuted: '#9CA3AF',
  // Misc
  border: '#E7E7E4',
  success: '#1E8449',
  danger: '#E0245E',
};

export const fonts = {
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' }),
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  s: 8,
  m: 12,
  l: 16,
  pill: 999,
};
