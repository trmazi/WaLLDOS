export const gradientBgBase = "bg-gradient-to-tr";
export const gradientBgPurplePink = `${gradientBgBase} from-purple-400 via-pink-500 to-red-500`;
export const gradientBgDark = `${gradientBgBase} from-slate-700 via-slate-900 to-slate-800`;
export const gradientBgPinkRed = `${gradientBgBase} from-pink-400 via-red-500 to-yellow-500`;

export const colorsBgLight = {
  white: "bg-white text-black",
  light: "bg-white text-black dark:bg-slate-900/70 dark:text-white",
  contrast: "bg-gray-800 text-white dark:bg-white dark:text-black",
  success: "bg-emerald-500 border-emerald-500 text-white",
  danger: "bg-red-500 border-red-500 text-white",
  warning: "bg-yellow-500 border-yellow-500 text-white",
  info: "bg-blue-500 border-blue-500 text-white",
};

export const colorsText = {
  white: "text-black dark:text-slate-100",
  light: "text-gray-700 dark:text-slate-400",
  contrast: "dark:text-white",
  success: "text-emerald-500",
  danger: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
};

export const colorsOutline = {
  white: [colorsText.white, "border-gray-100"],
  light: [colorsText.light, "border-gray-100"],
  contrast: [colorsText.contrast, "border-gray-900 dark:border-slate-100"],
  success: [colorsText.success, "border-emerald-500"],
  danger: [colorsText.danger, "border-red-500"],
  warning: [colorsText.warning, "border-yellow-500"],
  info: [colorsText.info, "border-blue-500"],
};

export const getButtonColor = (
  color,
  isOutlined,
  hasHover,
  isActive = false
) => {
  const colors = {
    ring: {
      white: "ring-gray-200 dark:ring-gray-500",
      whiteDark: "ring-gray-200 dark:ring-gray-500",
      lightDark: "ring-gray-200 dark:ring-gray-500",
      contrast: "ring-gray-300 dark:ring-gray-400",
      success: "ring-emerald-300 dark:ring-emerald-700",
      danger: "ring-red-300 dark:ring-red-900",
      warning: "ring-yellow-300 dark:ring-yellow-700",
      info: "ring-blue-300 dark:ring-blue-800",
      portalOrange: "ring-[#fd6d14] dark:ring-[#fd6d14]",
      portalBlue: "ring-[#04a6e7] dark:ring-[#04a6e7]",
      aperture: "ring-gray-300 dark:ring-gray-800",
    },
    active: {
      white: "bg-gray-100",
      whiteDark: "bg-gray-100 dark:bg-slate-800",
      lightDark: "bg-gray-200 dark:bg-slate-700",
      contrast: "bg-gray-700 dark:bg-slate-100",
      success: "bg-emerald-700 dark:bg-emerald-600",
      danger: "bg-red-700 dark:bg-red-600",
      warning: "bg-yellow-700 dark:bg-yellow-600",
      info: "bg-blue-700 dark:bg-blue-600",
      portalOrange: "bg-[#fd6d14] dark:bg-[#fd6d14]",
      portalBlue: "bg-[#04a6e7] dark:bg-[#04a6e7]",
      aperture: "bg-gray-300 dark:bg-gray-900",
    },
    bg: {
      white: "bg-white text-black",
      whiteDark: "bg-white text-black dark:bg-slate-900 dark:text-white",
      lightDark: "bg-gray-100 text-black dark:bg-slate-800 dark:text-white",
      contrast: "bg-gray-800 text-white dark:bg-white dark:text-black",
      success: "bg-emerald-600 dark:bg-emerald-700 text-white",
      danger: "bg-red-600 dark:bg-red-800 text-white",
      warning: "bg-yellow-600 dark:bg-yellow-700 text-white",
      info: "bg-blue-600 dark:bg-blue-600 text-white",
      portalOrange: "bg-[#fd6d14] text-white dark:bg-[#fd6d14]",
      portalBlue: "bg-[#04a6e7] text-white dark:bg-[#04a6e7]",
      aperture: "bg-gray-300 text-black dark:bg-gray-900 dark:text-white",
    },
    bgHover: {
      white: "hover:bg-gray-100",
      whiteDark: "hover:bg-gray-100 hover:dark:bg-slate-800",
      lightDark: "hover:bg-gray-200 hover:dark:bg-slate-700",
      contrast: "hover:bg-gray-700 hover:dark:bg-slate-100",
      success:
        "hover:bg-emerald-700 hover:border-emerald-700 hover:dark:bg-emerald-600 hover:dark:border-emerald-600",
      danger:
        "hover:bg-red-700 hover:border-red-700 hover:dark:bg-red-600 hover:dark:border-red-600",
      warning:
        "hover:bg-yellow-700 hover:border-yellow-700 hover:dark:bg-yellow-600 hover:dark:border-yellow-600",
      info: "hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600",
      portalOrange:
        "hover:bg-[#fd6d14] hover:border-[#fd6d14] hover:dark:bg-[#fd6d14] hover:dark:border-[#fd6d14]",
      portalBlue:
        "hover:bg-[#04a6e7] hover:border-[#04a6e7] hover:dark:bg-[#04a6e7] hover:dark:border-[#04a6e7]",
      aperture:
        "hover:bg-gray-300 hover:border-gray-300 hover:dark:bg-gray-900 hover:dark:border-gray-900",
    },
    borders: {
      white: "border-white",
      whiteDark: "border-white dark:border-slate-900",
      lightDark: "border-gray-100 dark:border-slate-800",
      contrast: "border-gray-800 dark:border-white",
      success: "border-emerald-600 dark:border-emerald-800",
      danger: "border-red-600 dark:border-ruby-950",
      warning: "border-yellow-600 dark:border-yellow-950",
      info: "border-blue-600 dark:border-blue-950",
      portalOrange: "border-[#fd6d14] dark:border-[#fd6d14]",
      portalBlue: "border-[#04a6e7] dark:border-[#04a6e7]",
      aperture: "border-gray-300 dark:border-gray-900",
    },
    text: {
      contrast: "dark:text-slate-100",
      success: "text-emerald-600 dark:text-emerald-500",
      danger: "text-red-600 dark:text-red-500",
      warning: "text-yellow-600 dark:text-yellow-500",
      info: "text-blue-600 dark:text-blue-500",
      portalOrange: "text-[#fd6d14] dark:text-orange-400",
      portalBlue: "text-[#04a6e7] dark:text-blue-300",
      aperture: "text-gray-500 dark:text-gray-300",
    },
    outlineHover: {
      contrast:
        "hover:bg-gray-800 hover:text-gray-100 hover:dark:bg-slate-100 hover:dark:text-black",
      success:
        "hover:bg-emerald-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-emerald-600",
      danger:
        "hover:bg-red-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-red-600",
      warning:
        "hover:bg-yellow-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-yellow-600",
      info: "hover:bg-blue-600 hover:text-white hover:dark:text-white hover:dark:border-blue-600",
      portalOrange:
        "hover:bg-[#fd6d14] hover:text-white hover:dark:text-white hover:dark:border-[#fd6d14]",
      portalBlue:
        "hover:bg-[#04a6e7] hover:text-white hover:dark:text-white hover:dark:border-[#04a6e7]",
      aperture:
        "hover:bg-gray-300 hover:text-black hover:dark:text-white hover:dark:border-gray-900",
    },
  };

  if (!colors.bg[color]) {
    return color;
  }

  const isOutlinedProcessed =
    isOutlined && ["white", "whiteDark", "lightDark"].indexOf(color) < 0;

  const base = [colors.borders[color], colors.ring[color]];

  if (isActive) {
    base.push(colors.active[color]);
  } else {
    base.push(isOutlinedProcessed ? colors.text[color] : colors.bg[color]);
  }

  if (hasHover) {
    base.push(
      isOutlinedProcessed ? colors.outlineHover[color] : colors.bgHover[color]
    );
  }

  return base;
};