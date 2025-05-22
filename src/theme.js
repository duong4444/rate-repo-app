import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: "#24292e", // đen
    textSecondary: "#586069", // xám
    primary: "#0366d6", // blue
    backgroundColor_AppBar: Platform.select({
        android: "#24292e",
        ios: "blue",
        default: "green"
      }), 
    mainBackground: "black"  // 
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
