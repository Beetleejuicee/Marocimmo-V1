import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

interface Props {
  size?: number;
  onDark?: boolean;
}

/** MarocImmo wordmark: green arch icon + MAROC (bold) IMMO (muted). */
export default function Logo({ size = 20, onDark = true }: Props) {
  return (
    <View style={styles.row}>
      <View style={[styles.icon, { width: size * 1.1, height: size * 1.1 }]}>
        <View style={[styles.arch, { backgroundColor: onDark ? colors.dark : '#fff' }]} />
      </View>
      <Text style={[styles.word, { fontSize: size, color: onDark ? '#fff' : colors.text }]}>
        MAROC
        <Text style={{ color: onDark ? colors.textOnDarkMuted : colors.textMuted }}>IMMO</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    backgroundColor: colors.lime,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  arch: {
    width: '55%',
    height: '58%',
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
  },
  word: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
