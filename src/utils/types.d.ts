// NAVIGATION
type ScreenProps = {
  Example: undefined;

  Auth: undefined;
  LoginScreen: undefined;

  Notes: undefined;
  NotesScreen: undefined;
  NoteDetailsScreen: { mode: 'create' | 'edit', note?: Note };
}

type NavigatorProps = {
}
type AppStackProps = {
  authed?: boolean;
  themeMode: ThemeMode;
}

// BASIC
type PureFunc = () => void;
type PureFuncArg<T> = (arg: T) => void;
type AuthMethod = 'login' | 'signup'

// HELP METHODS
type GenerateShadowProps = {
  shadowColor?: string;
  shadowRadius?: number;
  shadowOpacity?: number;
  shadowOffsetW?: number;
  shadowOffsetH?: number;
}

interface IService {
  init: () => Promise<void>;
}

// THEME
type ThemeColors = {
  text: string;       // Body foreground color
  background: string; // Body background color
  secondBg: string; // Second body background color
  primary: string;    // Primary brand color for links, buttons, etc.
  secondary: string;  // A secondary brand color for alternative styling
  accent: string;     // A contrast color for emphasizing UI
  muted: string;      // A faint color for backgrounds, borders, and accents that do not require high contrast with the background color
}
type ThemePresets = { [key: string]: ThemeColors }
type ThemeMode = 'light' | 'dark'

// API
// Auth Service
type AuthParams = {
  email: string;
  password: string;
}

// Parse
type ApiBaseType = {
  objectId: string;
  updatedAt: Date;
  createdAt: Date;
}

type NoteInput = {
  title: string;
  content?: string;
}

type Note = NoteInput & ApiBaseType;