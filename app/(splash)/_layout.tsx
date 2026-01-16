import { useEffect } from 'react';
import { Animated, Image, View, Easing } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

SplashScreen.preventAutoHideAsync();

export default function SplashLayout() {
  const truckX = new Animated.Value(-200);

  useEffect(() => {
    // Start truck animation
    const animation = Animated.loop(
      Animated.timing(truckX, {
        toValue: 250,
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );

    animation.start();

    // Wait for one full animation cycle + delay, then check auth & navigate
    const timer = setTimeout(async () => {
      try {
        await SplashScreen.hideAsync();
        
        // Check for VALID auth token (not empty/undefined)
        const token = await SecureStore.getItemAsync('authToken');
        const isValidToken = token && token.length > 10 && token !== 'undefined';
        
        console.log('Splash Screen - Token check:', {
          tokenExists: !!token,
          tokenLength: token?.length,
          isValid: isValidToken,
          tokenPreview: token?.substring(0, 20) + '...'
        });
        
        if (isValidToken) {
          // Valid token - go to MyShipments with token as param
          router.replace({
            pathname: '/(tabs)/MyShipments',
            params: { token }
          });
        } else {
          // No valid token - clear storage and go to login
          console.log('No valid token found, clearing storage and redirecting to login');
          await SecureStore.deleteItemAsync('authToken');
          router.replace('/(auth)/user-login');
        }
      } catch (error) {
        console.error('Splash navigation error:', error);
        // Fallback: clear storage and go to login
        await SecureStore.deleteItemAsync('authToken');
        router.replace('/(auth)/user-login');
      }
    }, 4000); // 4s total (2.5s animation + 1.5s delay)

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <View className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 items-center justify-center p-8">
      <Image 
        source={require('../../assets/images/fastfare-logo.png')} 
        className="w-48 h-48 mb-12" 
        resizeMode="contain" 
      />
      <Animated.View 
        className="absolute bottom-24 left-0 right-0"
        style={{ transform: [{ translateX: truckX }] }}
      >
        <Image 
          source={require('../../assets/images/delivery-truck.png')} 
          className="w-20 h-16" 
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}
