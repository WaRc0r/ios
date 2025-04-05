import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.sgcourtois.app",
  appName: "SG",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#E30513",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
    },
  },
}

export default config

