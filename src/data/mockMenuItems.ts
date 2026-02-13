export interface MenuItem {
  name: string;
  description: string;
  price: number;
  popular?: boolean;
}

export type MenuCategoryKey = 'coffees' | 'brews' | 'breakfast' | 'desserts' | 'coldDrinks' | 'food';

export const menuItems: Record<MenuCategoryKey, MenuItem[]> = {
  coffees: [
    { name: 'Türk Kahvesi', description: 'Geleneksel, köpüklü', price: 45, popular: true },
    { name: 'Espresso', description: 'Tek shot', price: 40 },
    { name: 'Americano', description: 'Sıcak su ile espresso', price: 50 },
    { name: 'Latte', description: 'Süt köpüğü ile espresso', price: 55, popular: true },
    { name: 'Cappuccino', description: 'Eşit oranda espresso, süt, köpük', price: 55 },
    { name: 'Mocha', description: 'Çikolata soslu latte', price: 60 },
    { name: 'Soğuk Brew', description: '12 saat demlenmiş soğuk kahve', price: 65 },
    { name: 'Filtre Kahve', description: 'Günlük taze demleme', price: 45 }
  ],
  brews: [
    { name: 'Filtre Kahve', description: 'Günlük taze demleme', price: 45 },
    { name: 'V60', description: 'El ile demleme', price: 55 },
    { name: 'Chemex', description: 'Büyük porsiyon', price: 65 },
    { name: 'Aeropress', description: 'Yoğun ve pürüzsüz', price: 50 },
    { name: 'Soğuk Brew', description: '12 saat demlenmiş', price: 65, popular: true }
  ],
  breakfast: [
    { name: 'Serpme Kahvaltı', description: '2 kişilik, zeytin, peynir, reçel', price: 180, popular: true },
    { name: 'Menemen', description: 'Sucuklu veya sade', price: 95 },
    { name: 'Simit Tabağı', description: 'Simit, krem peynir, domates', price: 65 },
    { name: 'Yumurta Benedikt', description: 'Hollandaise sos ile', price: 120 },
    { name: 'Pankek', description: 'Akçaağaç şurubu, meyve', price: 85 }
  ],
  desserts: [
    { name: 'Baklava', description: 'Antep fıstıklı', price: 75, popular: true },
    { name: 'Cheesecake', description: 'Çilekli / Frambuazlı', price: 85 },
    { name: 'Islak Kek', description: 'Sütlü, çikolatalı', price: 55 },
    { name: 'Brownie', description: 'Sıcak, cevizli', price: 65 },
    { name: 'Tiramisu', description: 'Klasik İtalyan', price: 80 }
  ],
  coldDrinks: [
    { name: 'Soğuk Brew', description: 'Buzlu', price: 65 },
    { name: 'Ice Latte', description: 'Buzlu latte', price: 60 },
    { name: 'Limonata', description: 'Taze sıkılmış', price: 45 },
    { name: 'Ayran', description: 'Geleneksel', price: 25 },
    { name: 'Taze Sıkılmış Portakal Suyu', description: 'Günlük', price: 55 },
    { name: 'Smoothie', description: 'Meyve karışımı', price: 65 }
  ],
  food: [
    { name: 'Tost', description: 'Kaşarlı klasik', price: 55 },
    { name: 'Sandviç', description: 'Taze malzemeler', price: 75 },
    { name: 'Salata', description: 'Mevsim yeşillikleri', price: 85 },
    { name: 'Mantı', description: 'Yoğurtlu, 6 adet', price: 95 },
    { name: 'Lahmacun', description: '2 adet, limon', price: 70 }
  ]
};
