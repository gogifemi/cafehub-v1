import {
  Cat,
  Dog,
  Rabbit,
  Bird,
  Turtle,
  Rat,
  Squirrel,
  type LucideIcon
} from 'lucide-react';

/* Placeholder: Fox, Bear, Pig, Frog are not in lucide-react 0.575; using Bird for those entries until available. */
const PlaceholderAnimalIcon = Bird;

export interface AnimalAvatar {
  id: string;
  icon: LucideIcon;
  name: string;
  nameEn: string;
  color: string; // brand primary or secondary
  bgColor: string; // lighter version of brand colors
  description: string;
  descriptionEn: string;
}

export const animalAvatars: AnimalAvatar[] = [
  {
    id: 'cat',
    icon: Cat,
    name: 'Kedi',
    nameEn: 'Cat',
    color: '#ff6b35', // brand primary
    bgColor: '#fff0e6',
    description: 'Sıcakkanlı ve samimi',
    descriptionEn: 'Warm and friendly'
  },
  {
    id: 'dog',
    icon: Dog,
    name: 'Köpek',
    nameEn: 'Dog',
    color: '#4ecdc4', // brand secondary
    bgColor: '#e6f9f7',
    description: 'Sadık ve enerjik',
    descriptionEn: 'Loyal and energetic'
  },
  {
    id: 'fox',
    icon: PlaceholderAnimalIcon,
    name: 'Tilki',
    nameEn: 'Fox',
    color: '#ff6b35',
    bgColor: '#fff0e6',
    description: 'Zeki ve kurnaz',
    descriptionEn: 'Smart and clever'
  },
  {
    id: 'rabbit',
    icon: Rabbit,
    name: 'Tavşan',
    nameEn: 'Rabbit',
    color: '#4ecdc4',
    bgColor: '#e6f9f7',
    description: 'Hızlı ve sevimli',
    descriptionEn: 'Fast and cute'
  },
  {
    id: 'bird',
    icon: Bird,
    name: 'Kuş',
    nameEn: 'Bird',
    color: '#ff6b35',
    bgColor: '#fff0e6',
    description: 'Özgür ve neşeli',
    descriptionEn: 'Free and joyful'
  },
  {
    id: 'owl',
    icon: Bird, // Using Bird as placeholder for Owl (no Owl in lucide-react)
    name: 'Baykuş',
    nameEn: 'Owl',
    color: '#4ecdc4',
    bgColor: '#e6f9f7',
    description: 'Bilge ve sakin',
    descriptionEn: 'Wise and calm'
  },
  {
    id: 'squirrel',
    icon: Squirrel,
    name: 'Sincap',
    nameEn: 'Squirrel',
    color: '#ff6b35',
    bgColor: '#fff0e6',
    description: 'Çalışkan ve çevik',
    descriptionEn: 'Hardworking and agile'
  },
  {
    id: 'bear',
    icon: PlaceholderAnimalIcon,
    name: 'Ayı',
    nameEn: 'Bear',
    color: '#4ecdc4',
    bgColor: '#e6f9f7',
    description: 'Güçlü ve koruyucu',
    descriptionEn: 'Strong and protective'
  },
  {
    id: 'pig',
    icon: PlaceholderAnimalIcon,
    name: 'Domuz',
    nameEn: 'Pig',
    color: '#ff6b35',
    bgColor: '#fff0e6',
    description: 'Neşeli ve doygun',
    descriptionEn: 'Joyful and content'
  },
  {
    id: 'frog',
    icon: PlaceholderAnimalIcon,
    name: 'Kurbağa',
    nameEn: 'Frog',
    color: '#4ecdc4',
    bgColor: '#e6f9f7',
    description: 'Eğlenceli ve zıpır',
    descriptionEn: 'Fun and bouncy'
  },
  {
    id: 'turtle',
    icon: Turtle,
    name: 'Kaplumbağa',
    nameEn: 'Turtle',
    color: '#ff6b35',
    bgColor: '#fff0e6',
    description: 'Sakin ve sabırlı',
    descriptionEn: 'Calm and patient'
  },
  {
    id: 'rat',
    icon: Rat,
    name: 'Sıçan',
    nameEn: 'Rat',
    color: '#4ecdc4',
    bgColor: '#e6f9f7',
    description: 'Zeki ve uyumlu',
    descriptionEn: 'Smart and adaptable'
  }
];

export type AnimalAvatarId = (typeof animalAvatars)[number]['id'];

export const ANIMAL_AVATAR_IDS: AnimalAvatarId[] = animalAvatars.map((a) => a.id);

export function getAnimalAvatarById(id: string): AnimalAvatar | undefined {
  return animalAvatars.find((avatar) => avatar.id === id);
}
