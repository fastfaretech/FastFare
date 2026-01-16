import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function Index() {
  useFocusEffect(
    useCallback(() => {
      router.replace('./(splash)'); // Redirect to splash on load
    }, [])
  );
  return null;
}
