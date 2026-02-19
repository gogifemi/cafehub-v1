export type AnimalAvatarId =
  | 'cat'
  | 'dog'
  | 'rabbit'
  | 'bird'
  | 'fox'
  | 'owl';

export interface AnimalAvatar {
  id: AnimalAvatarId;
  /** Translation‑ready display labels */
  label: {
    tr: string;
    en: string;
  };
  /** Tailwind text color utility (e.g. text-amber-600) */
  textColorClass: string;
  /** Tailwind background color utility (e.g. bg-amber-100) */
  bgColorClass: string;
  /**
   * Name of the Lucide icon component to use for this avatar.
   * Example usage in UI:
   *   import { Cat, Dog } from 'lucide-react';
   *   const ICONS = { Cat, Dog, ... };
   */
  iconName: 'Cat' | 'Dog' | 'Rabbit' | 'Bird' | 'Fox' | 'Owl';
}

export const ANIMAL_AVATAR_IDS: AnimalAvatarId[] = [
  'cat',
  'dog',
  'rabbit',
  'bird',
  'fox',
  'owl'
];

export const animalAvatars: AnimalAvatar[] = [
  {
    id: 'cat',
    label: {
      tr: 'Kedi',
      en: 'Cat'
    },
    textColorClass: 'text-amber-700',
    bgColorClass: 'bg-amber-100',
    iconName: 'Cat'
  },
  {
    id: 'dog',
    label: {
      tr: 'Köpek',
      en: 'Dog'
    },
    textColorClass: 'text-sky-700',
    bgColorClass: 'bg-sky-100',
    iconName: 'Dog'
  },
  {
    id: 'rabbit',
    label: {
      tr: 'Tavşan',
      en: 'Rabbit'
    },
    textColorClass: 'text-rose-700',
    bgColorClass: 'bg-rose-100',
    iconName: 'Rabbit'
  },
  {
    id: 'bird',
    label: {
      tr: 'Kuş',
      en: 'Bird'
    },
    textColorClass: 'text-emerald-700',
    bgColorClass: 'bg-emerald-100',
    iconName: 'Bird'
  },
  {
    id: 'fox',
    label: {
      tr: 'Tilki',
      en: 'Fox'
    },
    textColorClass: 'text-orange-700',
    bgColorClass: 'bg-orange-100',
    iconName: 'Fox'
  },
  {
    id: 'owl',
    label: {
      tr: 'Baykuş',
      en: 'Owl'
    },
    textColorClass: 'text-violet-700',
    bgColorClass: 'bg-violet-100',
    iconName: 'Owl'
  }
];

export function getAnimalAvatarById(id: AnimalAvatarId): AnimalAvatar | undefined {
  return animalAvatars.find((avatar) => avatar.id === id);
}

