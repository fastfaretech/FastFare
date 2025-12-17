import 'dotenv/config';

export default {
  name: "fastfare_frontend",
  slug: "fastfare_frontend",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "fastfarefrontend",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
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
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    permissions: [
      "android.permission.CAMERA",
      "android.permission.CAMERA",
    ],
    package: "com.nishant_jain.fastfare_frontend",
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
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
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    "expo-secure-store",
    "expo-barcode-scanner",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};
