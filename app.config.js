import 'dotenv/config';

export default {
  name: "FastFare Driver App",
  slug: "fastfare_frontend",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/fastfare-logo.png",
  scheme: "fastfarefrontend",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  
  ios: {
    supportsTablet: true,
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,  // ✅ FIXED: Correct iOS field name
    },
  },
  
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,  // ✅ FIXED: Correct Android field name (was GOOGLE_MAPS_API_KEY)
      },
    },
    permissions: [
      "android.permission.CAMERA",
      "android.permission.ACCESS_FINE_LOCATION",     // ✅ Added for maps
      "android.permission.ACCESS_COARSE_LOCATION",   // ✅ Added for maps
      "android.permission.FOREGROUND_SERVICE",       // ✅ Added for background location
    ],
    package: "com.nishant_jain.fastfare_frontend",
  },
  
  web: {
    output: "static",
    favicon: "./assets/images/fastfare-logo.png",
    bundler: "metro",
  },
  
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#3B82F6",
        dark: {
          backgroundColor: "#1E3A8A",
        },
      },
    ],
    "expo-secure-store",
    // "expo-barcode-scanner",
  ],
  
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  
  // ✅ CRITICAL: Add this for MapViewDirections component
  extra: {
    eas: {
      projectId: "5168d1ff-4fa5-43c6-8849-882a4fa70b31",
    },
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,  // ✅ This makes Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY work
  },
};
