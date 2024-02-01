import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'new-york-app-01',
  appName: 'newyork-sports-app',
  webDir: 'www',
  server: {
    androidScheme: 'http',
  },
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000',
    },
  },
};

export default config;
