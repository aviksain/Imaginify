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
    icon: "image-restore.svg",
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
    icon: "eraser.svg",
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subtitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "paint-roller.svg",
  },
};

export const creditFee = 1;

export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: "/assets/icons/zap.svg",
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: "20 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/zap.svg",
    price: 50,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/zap.svg",
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];