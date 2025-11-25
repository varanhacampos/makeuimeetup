// ===============
// CORE PROVIDERS
// ===============

export { ThemeProvider, useTheme } from './theme-context-provider';
export { OverscrollColorProvider, useOverscrollColor } from './overscroll-color-context';

// =====================
// CORE FORM FOUNDATION
// =====================

export { FormProvider, useForm } from './form-context';
export { default as TextFieldBase } from './text-field-base';
export { default as TextField } from './text-field';
export { default as EmailField } from './email-field';

// ===============
// UI COMPONENTS
// ===============

// Basic structure components
export { default as Box } from './box';
export { default as Inline } from './inline';
export { default as Stack } from './stack';
export { default as Divider } from './divider';

// Typography
export { default as Text } from './text';
export { default as Title } from './title';

// Layout components
export { default as Grid } from './grid';
export { default as ResponsiveLayout } from './responsive-layout';
export { default as FixedFooterLayout } from './fixed-footer-layout';
export { default as ButtonLayout } from './button-layout';

// Buttons / Inputs / Forms
export { default as Button } from './button';
export { default as Checkbox } from './checkbox';
export { default as RadioButton } from './radio-button';
export { default as Switch } from './switch-component';
export { default as Select } from './select';
export { default as TextLink } from './text-link';

// Navigation
export { default as NavigationBar } from './navigation-bar';
export { default as NavigationBreadcrumbs } from './navigation-breadcrumbs';

// Feedback
export { default as Snackbar } from './snackbar';
export { default as ProgressBar } from './progress-bar';
export { default as Spinner } from './spinner';

// Cards
export { default as Card } from './card-internal';
export { default as CardMedia } from './card-media';
export { default as CardData } from './card-data';
export { default as CardNaked } from './card-naked';
export { default as CardCover } from './card-cover';

// Images & Media
export { default as Image } from './image';
export { default as Video } from './video';

// Interactive elements
export { default as Accordion } from './accordion';
export { default as Tooltip } from './tooltip';
export { default as Popover } from './popover';
export { default as Menu } from './menu';

// Hero / Section components
export { default as Hero } from './hero';
export { default as CoverHero } from './cover-hero';

// Utility Containers
export { default as Overlay } from './overlay';
export { default as Portal } from './portal';

// Icons (optional: depends if you want to export)
export { default as LogoVivo } from './logo-vivo';
export { default as LogoTelefonica } from './logo-telefonica';
export { default as LogoO2 } from './logo-o2';
export { default as LogoMovistar } from './logo-movistar';

// ====================
// REMOVED / NOT EXPORTED
// ====================
//
// ❌ decimal-field.tsx
// ❌ phone-number-field.tsx
// ❌ phone-number-field-lite.tsx
// ❌ date-time-picker.tsx
//
// **Esses não aparecem aqui para evitar erros.
// ====================
