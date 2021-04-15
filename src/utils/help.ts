import { Platform, ViewStyle } from 'react-native';
import Parse from 'parse/react-native';

// BASIC
export const generateShadow = (p?: GenerateShadowProps): ViewStyle =>
  Platform.OS === 'android'
    ? { elevation: p?.shadowRadius || 4 }
    : {
      shadowColor: p?.shadowColor || '#123',
      shadowRadius: p?.shadowRadius || 4,
      shadowOpacity: p?.shadowOpacity || 0.2,
      shadowOffset: {
        width: p?.shadowOffsetW || 0,
        height: p?.shadowOffsetH || 0,
      },
    };

// NAVIGATION
export const navBarStyle = () => ({
  headerLargeTitle: true,
  headerTranslucent: Platform.OS === 'ios',
  // headerStyle: {
  //   backgroundColor: theme.colors.background,
  // },
  // headerTintColor: theme.colors.text,
});

// PARSE HELP METHODS
export const transform = <T>(obj: Parse.Object): T => obj?.toJSON() as T;
export const transformArray = <T>(objs: Parse.Object[]): T[] => objs.map(transform) as T[];