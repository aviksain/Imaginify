export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: '/assets/icons/home.svg',
  },
  {
    label: "Image Restore",
    route: "/transformation/add/restore",
    icon: "/assets/icons/image-restore.svg",
  },
  {
    label: "Generative Fill",
    route: "/transformation/add/fill",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Object Remove",
    route: "/transformation/add/remove",
    icon: "/assets/icons/eraser.svg",
  },
  {
    label: "Object Recolor",
    route: "/transformation/add/recolor",
    icon: "/assets/icons/paint-roller.svg",
  },
  {
    label: "Background Remove",
    route: "/transformation/add/removeBackground",
    icon: "/assets/icons/image-minus.svg",
  },
  {
    label: "Profile",
    route: "/profile",
    icon: "/assets/icons/user.svg",
  },
  {
    label: "Buy Credits",
    route: "/credits",
    icon: "/assets/icons/hand-coins.svg",
  },
];

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subtitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: "image.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subtitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: "image-minus.svg",
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subtitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subtitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subtitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
};

export const creditFee = 1;