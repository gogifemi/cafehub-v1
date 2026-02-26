export interface AnimalAvatar {
  id: string;
  animalType: string;
  variant?: number;
  name: string;
  nameEn: string;
  style: 'kare' | 'yuvarlak';
  imageUrl: string;
  description: string;
  descriptionEn: string;
}

export const animalAvatars: AnimalAvatar[] = [
  // Kurt
  { id: 'kurt-1', animalType: 'kurt', variant: 1, name: 'Kurt', nameEn: 'Wolf', style: 'kare', imageUrl: '/assets/avatars/kare/kurt-1.svg', description: 'Özgür ve güçlü', descriptionEn: 'Free and strong' },
  { id: 'kurt-2', animalType: 'kurt', variant: 2, name: 'Kurt', nameEn: 'Wolf', style: 'kare', imageUrl: '/assets/avatars/kare/kurt-2.svg', description: 'Özgür ve güçlü', descriptionEn: 'Free and strong' },

  // At
  { id: 'at', animalType: 'at', name: 'At', nameEn: 'Horse', style: 'kare', imageUrl: '/assets/avatars/kare/at.svg', description: 'Hızlı ve asil', descriptionEn: 'Fast and noble' },

  // Baykuş
  { id: 'baykus', animalType: 'baykus', name: 'Baykuş', nameEn: 'Owl', style: 'kare', imageUrl: '/assets/avatars/kare/baykus.svg', description: 'Bilge ve sakin', descriptionEn: 'Wise and calm' },

  // Tavşan
  { id: 'tavsan', animalType: 'tavsan', name: 'Tavşan', nameEn: 'Rabbit', style: 'kare', imageUrl: '/assets/avatars/kare/tavsan.svg', description: 'Hızlı ve sevimli', descriptionEn: 'Fast and cute' },

  // Fare
  { id: 'fare', animalType: 'fare', name: 'Fare', nameEn: 'Mouse', style: 'kare', imageUrl: '/assets/avatars/kare/fare.svg', description: 'Küçük ve çevik', descriptionEn: 'Small and agile' },

  // Tilki
  { id: 'tilki', animalType: 'tilki', name: 'Tilki', nameEn: 'Fox', style: 'kare', imageUrl: '/assets/avatars/kare/tilki.svg', description: 'Zeki ve kurnaz', descriptionEn: 'Smart and clever' },

  // Yılan
  { id: 'yilan', animalType: 'yilan', name: 'Yılan', nameEn: 'Snake', style: 'kare', imageUrl: '/assets/avatars/kare/yilan.svg', description: 'Gizemli ve hızlı', descriptionEn: 'Mysterious and fast' },

  // Örümcek
  { id: 'orumcek', animalType: 'orumcek', name: 'Örümcek', nameEn: 'Spider', style: 'kare', imageUrl: '/assets/avatars/kare/orumcek.svg', description: 'Sabırlı ve üretken', descriptionEn: 'Patient and productive' },

  // Kaplan
  { id: 'kaplan', animalType: 'kaplan', name: 'Kaplan', nameEn: 'Tiger', style: 'kare', imageUrl: '/assets/avatars/kare/kaplan.svg', description: 'Güçlü ve cesur', descriptionEn: 'Strong and brave' },

  // Timsah
  { id: 'timsah', animalType: 'timsah', name: 'Timsah', nameEn: 'Crocodile', style: 'kare', imageUrl: '/assets/avatars/kare/timsah.svg', description: 'Güçlü ve dayanıklı', descriptionEn: 'Strong and resilient' },

  // Ahtapot
  { id: 'ahtopot', animalType: 'ahtopot', name: 'Ahtapot', nameEn: 'Octopus', style: 'kare', imageUrl: '/assets/avatars/kare/ahtopot.svg', description: 'Zeki ve esnek', descriptionEn: 'Smart and flexible' },

  // Hipopotam
  { id: 'hipopotam', animalType: 'hipopotam', name: 'Hipopotam', nameEn: 'Hippo', style: 'kare', imageUrl: '/assets/avatars/kare/hipopotam.svg', description: 'Büyük ve sakin', descriptionEn: 'Large and calm' },

  // Gergedan
  { id: 'gergedan', animalType: 'gergedan', name: 'Gergedan', nameEn: 'Rhino', style: 'kare', imageUrl: '/assets/avatars/kare/gergedan.svg', description: 'Güçlü ve korumacı', descriptionEn: 'Strong and protective' },

  // İnek
  { id: 'inek', animalType: 'inek', name: 'İnek', nameEn: 'Cow', style: 'kare', imageUrl: '/assets/avatars/kare/inek.svg', description: 'Sakin ve üretken', descriptionEn: 'Calm and productive' },

  // Kurbağa
  { id: 'kurbaga', animalType: 'kurbaga', name: 'Kurbağa', nameEn: 'Frog', style: 'kare', imageUrl: '/assets/avatars/kare/kurbaga.svg', description: 'Eğlenceli ve zıpır', descriptionEn: 'Fun and bouncy' },

  // Kuzu
  { id: 'kuzu', animalType: 'kuzu', name: 'Kuzu', nameEn: 'Lamb', style: 'kare', imageUrl: '/assets/avatars/kare/kuzu.svg', description: 'Yumuşak ve sevimli', descriptionEn: 'Soft and cute' },

  // Zebra
  { id: 'zebra', animalType: 'zebra', name: 'Zebra', nameEn: 'Zebra', style: 'kare', imageUrl: '/assets/avatars/kare/zebra.svg', description: 'Çizgili ve hızlı', descriptionEn: 'Striped and fast' },

  // Fındık faresi
  { id: 'findik-faresi', animalType: 'findik-faresi', name: 'Fındık Faresi', nameEn: 'Dormouse', style: 'kare', imageUrl: '/assets/avatars/kare/findik-faresi.svg', description: 'Küçük ve sevimli', descriptionEn: 'Small and cute' },

  // Balık (4 variants)
  { id: 'balik-1', animalType: 'balik', variant: 1, name: 'Balık', nameEn: 'Fish', style: 'kare', imageUrl: '/assets/avatars/kare/balik-1.svg', description: 'Renkli ve özgür', descriptionEn: 'Colorful and free' },
  { id: 'balik-2', animalType: 'balik', variant: 2, name: 'Balık', nameEn: 'Fish', style: 'kare', imageUrl: '/assets/avatars/kare/balik-2.svg', description: 'Renkli ve özgür', descriptionEn: 'Colorful and free' },
  { id: 'balik-3', animalType: 'balik', variant: 3, name: 'Balık', nameEn: 'Fish', style: 'kare', imageUrl: '/assets/avatars/kare/balik-3.svg', description: 'Renkli ve özgür', descriptionEn: 'Colorful and free' },
  { id: 'balik-4', animalType: 'balik', variant: 4, name: 'Balık', nameEn: 'Fish', style: 'kare', imageUrl: '/assets/avatars/kare/balik-4.svg', description: 'Renkli ve özgür', descriptionEn: 'Colorful and free' },

  // Domuz
  { id: 'domuz', animalType: 'domuz', name: 'Domuz', nameEn: 'Pig', style: 'kare', imageUrl: '/assets/avatars/kare/domuz.svg', description: 'Neşeli ve doygun', descriptionEn: 'Joyful and content' },

  // Penguen
  { id: 'penguen', animalType: 'penguen', name: 'Penguen', nameEn: 'Penguin', style: 'kare', imageUrl: '/assets/avatars/kare/penguen.svg', description: 'Şirin ve dayanıklı', descriptionEn: 'Cute and resilient' },

  // Papağan
  { id: 'papagan', animalType: 'papagan', name: 'Papağan', nameEn: 'Parrot', style: 'kare', imageUrl: '/assets/avatars/kare/papagan.svg', description: 'Renkli ve konuşkan', descriptionEn: 'Colorful and talkative' },

  // Kirpi
  { id: 'kirpi', animalType: 'kirpi', name: 'Kirpi', nameEn: 'Hedgehog', style: 'kare', imageUrl: '/assets/avatars/kare/kirpi.svg', description: 'Dikenli ama sevimli', descriptionEn: 'Spiky but cute' },

  // Dinozor (2 variants)
  { id: 'dinazor-1', animalType: 'dinazor', variant: 1, name: 'Dinozor', nameEn: 'Dinosaur', style: 'kare', imageUrl: '/assets/avatars/kare/dinazor-1.svg', description: 'Tarih öncesi dev', descriptionEn: 'Prehistoric giant' },
  { id: 'dinazor-2', animalType: 'dinazor', variant: 2, name: 'Dinozor', nameEn: 'Dinosaur', style: 'kare', imageUrl: '/assets/avatars/kare/dinazor-2.svg', description: 'Tarih öncesi dev', descriptionEn: 'Prehistoric giant' },

  // Fok balığı
  { id: 'fok-baligi', animalType: 'fok', name: 'Fok Balığı', nameEn: 'Seal', style: 'kare', imageUrl: '/assets/avatars/kare/fok-baligi.svg', description: 'Sevimli ve oyuncu', descriptionEn: 'Cute and playful' },

  // Ceylan
  { id: 'ceylan', animalType: 'ceylan', name: 'Ceylan', nameEn: 'Gazelle', style: 'kare', imageUrl: '/assets/avatars/kare/ceylan.svg', description: 'Zarif ve hızlı', descriptionEn: 'Elegant and fast' },

  // Tukan
  { id: 'tukan', animalType: 'tukan', name: 'Tukan', nameEn: 'Toucan', style: 'kare', imageUrl: '/assets/avatars/kare/tukan.svg', description: 'Renkli ve gürültücü', descriptionEn: 'Colorful and noisy' },

  // Deve
  { id: 'deve', animalType: 'deve', name: 'Deve', nameEn: 'Camel', style: 'kare', imageUrl: '/assets/avatars/kare/deve.svg', description: 'Dayanıklı ve sakin', descriptionEn: 'Durable and calm' },

  // Ördek
  { id: 'ordek', animalType: 'ordek', name: 'Ördek', nameEn: 'Duck', style: 'kare', imageUrl: '/assets/avatars/kare/ordek.svg', description: 'Neşeli ve yüzücü', descriptionEn: 'Happy and swimmer' },

  // Köpek (8 variants)
  { id: 'kopek-1', animalType: 'kopek', variant: 1, name: 'Köpek', nameEn: 'Dog', style: 'kare', imageUrl: '/assets/avatars/kare/kopek-1.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-2', animalType: 'kopek', variant: 2, name: 'Köpek', nameEn: 'Dog', style: 'kare', imageUrl: '/assets/avatars/kare/kopek-2.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-3', animalType: 'kopek', variant: 3, name: 'Köpek', nameEn: 'Dog', style: 'kare', imageUrl: '/assets/avatars/kare/kopek-3.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-4', animalType: 'kopek', variant: 4, name: 'Köpek', nameEn: 'Dog', style: 'kare', imageUrl: '/assets/avatars/kare/kopek-4.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-5', animalType: 'kopek', variant: 5, name: 'Köpek', nameEn: 'Dog', style: 'kare', imageUrl: '/assets/avatars/kare/kopek-5.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-6', animalType: 'kopek', variant: 6, name: 'Köpek', nameEn: 'Dog', style: 'kare', imageUrl: '/assets/avatars/kare/kopek-6.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-7', animalType: 'kopek', variant: 7, name: 'Köpek', nameEn: 'Dog', style: 'kare', imageUrl: '/assets/avatars/kare/kopek-7.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-8', animalType: 'kopek', variant: 8, name: 'Köpek', nameEn: 'Dog', style: 'kare', imageUrl: '/assets/avatars/kare/kopek-8.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },

  // Geyik
  { id: 'geyik', animalType: 'geyik', name: 'Geyik', nameEn: 'Deer', style: 'kare', imageUrl: '/assets/avatars/kare/geyik.svg', description: 'Zarif ve hızlı', descriptionEn: 'Elegant and fast' },

  // Tavuk
  { id: 'tavuk', animalType: 'tavuk', name: 'Tavuk', nameEn: 'Chicken', style: 'kare', imageUrl: '/assets/avatars/kare/tavuk.svg', description: 'Gündüzcü ve üretken', descriptionEn: 'Diurnal and productive' },

  // Kartal
  { id: 'kartal', animalType: 'kartal', name: 'Kartal', nameEn: 'Eagle', style: 'kare', imageUrl: '/assets/avatars/kare/kartal.svg', description: 'Görkemli ve özgür', descriptionEn: 'Majestic and free' },

  // Koala
  { id: 'koala', animalType: 'koala', name: 'Koala', nameEn: 'Koala', style: 'kare', imageUrl: '/assets/avatars/kare/koala.svg', description: 'Sakin ve uykucu', descriptionEn: 'Calm and sleepy' },

  // Rakun
  { id: 'rakun', animalType: 'rakun', name: 'Rakun', nameEn: 'Raccoon', style: 'kare', imageUrl: '/assets/avatars/kare/rakun.svg', description: 'Meraklı ve zeki', descriptionEn: 'Curious and smart' },

  // Kanguru
  { id: 'kanguru', animalType: 'kanguru', name: 'Kanguru', nameEn: 'Kangaroo', style: 'kare', imageUrl: '/assets/avatars/kare/kanguru.svg', description: 'Zıpır ve hızlı', descriptionEn: 'Bouncy and fast' },

  // Maymun (2 variants)
  { id: 'maymun-1', animalType: 'maymun', variant: 1, name: 'Maymun', nameEn: 'Monkey', style: 'kare', imageUrl: '/assets/avatars/kare/maymun-1.svg', description: 'Eğlenceli ve zeki', descriptionEn: 'Fun and smart' },
  { id: 'maymun-2', animalType: 'maymun', variant: 2, name: 'Maymun', nameEn: 'Monkey', style: 'kare', imageUrl: '/assets/avatars/kare/maymun-2.svg', description: 'Eğlenceli ve zeki', descriptionEn: 'Fun and smart' },

  // Leopar
  { id: 'leopar', animalType: 'leopar', name: 'Leopar', nameEn: 'Leopard', style: 'kare', imageUrl: '/assets/avatars/kare/leopar.svg', description: 'Hızlı ve gizemli', descriptionEn: 'Fast and mysterious' },

  // Kızıl panda
  { id: 'kizil-panda', animalType: 'kizil-panda', name: 'Kızıl Panda', nameEn: 'Red Panda', style: 'kare', imageUrl: '/assets/avatars/kare/kizil-panda.svg', description: 'Sevimli ve nadir', descriptionEn: 'Cute and rare' },

  // Yaban domuzu
  { id: 'yaban-domuzu', animalType: 'yaban-domuzu', name: 'Yaban Domuzu', nameEn: 'Wild Boar', style: 'kare', imageUrl: '/assets/avatars/kare/yaban-domuzu.svg', description: 'Güçlü ve vahşi', descriptionEn: 'Strong and wild' },

  // Kedi (3 variants)
  { id: 'kedi-1', animalType: 'kedi', variant: 1, name: 'Kedi', nameEn: 'Cat', style: 'kare', imageUrl: '/assets/avatars/kare/kedi-1.svg', description: 'Bağımsız ve sevimli', descriptionEn: 'Independent and cute' },
  { id: 'kedi-2', animalType: 'kedi', variant: 2, name: 'Kedi', nameEn: 'Cat', style: 'kare', imageUrl: '/assets/avatars/kare/kedi-2.svg', description: 'Bağımsız ve sevimli', descriptionEn: 'Independent and cute' },
  { id: 'kedi-3', animalType: 'kedi', variant: 3, name: 'Kedi', nameEn: 'Cat', style: 'kare', imageUrl: '/assets/avatars/kare/kedi-3.svg', description: 'Bağımsız ve sevimli', descriptionEn: 'Independent and cute' },

  // Şahin
  { id: 'sahin', animalType: 'sahin', name: 'Şahin', nameEn: 'Hawk', style: 'kare', imageUrl: '/assets/avatars/kare/sahin.svg', description: 'Keskin gözlü ve hızlı', descriptionEn: 'Sharp-eyed and fast' },

  // Boğa
  { id: 'boga', animalType: 'boga', name: 'Boğa', nameEn: 'Bull', style: 'kare', imageUrl: '/assets/avatars/kare/boga.svg', description: 'Güçlü ve kararlı', descriptionEn: 'Strong and determined' },

  // Devekuşu
  { id: 'devekusu', animalType: 'devekusu', name: 'Devekuşu', nameEn: 'Ostrich', style: 'kare', imageUrl: '/assets/avatars/kare/devekusu.svg', description: 'Büyük ve hızlı koşucu', descriptionEn: 'Large and fast runner' },

  // Goril
  { id: 'goril', animalType: 'goril', name: 'Goril', nameEn: 'Gorilla', style: 'kare', imageUrl: '/assets/avatars/kare/goril.svg', description: 'Güçlü ve korumacı', descriptionEn: 'Strong and protective' },

  // Öküz
  { id: 'okuz', animalType: 'okuz', name: 'Öküz', nameEn: 'Ox', style: 'kare', imageUrl: '/assets/avatars/kare/okuz.svg', description: 'Güçlü ve çalışkan', descriptionEn: 'Strong and hardworking' },

  // Zürafa
  { id: 'zurafa', animalType: 'zurafa', name: 'Zürafa', nameEn: 'Giraffe', style: 'kare', imageUrl: '/assets/avatars/kare/zurafa.svg', description: 'Uzun ve sakin', descriptionEn: 'Tall and calm' },

  // Kaplumbağa
  { id: 'kaplumbaga', animalType: 'kaplumbaga', name: 'Kaplumbağa', nameEn: 'Turtle', style: 'kare', imageUrl: '/assets/avatars/kare/kaplumbaga.svg', description: 'Sakin ve sabırlı', descriptionEn: 'Calm and patient' },

  // Aslan
  { id: 'aslan', animalType: 'aslan', name: 'Aslan', nameEn: 'Lion', style: 'kare', imageUrl: '/assets/avatars/kare/aslan.svg', description: 'Güçlü ve lider', descriptionEn: 'Strong and leader' },

  // Flamingo
  { id: 'flamingo', animalType: 'flamingo', name: 'Flamingo', nameEn: 'Flamingo', style: 'kare', imageUrl: '/assets/avatars/kare/flamingo.svg', description: 'Zarif ve pembe', descriptionEn: 'Elegant and pink' },

  // Panda
  { id: 'panda', animalType: 'panda', name: 'Panda', nameEn: 'Panda', style: 'kare', imageUrl: '/assets/avatars/kare/panda.svg', description: 'Şirin ve sakin', descriptionEn: 'Cute and calm' },

  // Ayı
  { id: 'ayi', animalType: 'ayi', name: 'Ayı', nameEn: 'Bear', style: 'kare', imageUrl: '/assets/avatars/kare/ayi.svg', description: 'Güçlü ve korumacı', descriptionEn: 'Strong and protective' },

  // Tembel hayvan
  { id: 'tembel-hayvan', animalType: 'tembel-hayvan', name: 'Tembel Hayvan', nameEn: 'Sloth', style: 'kare', imageUrl: '/assets/avatars/kare/tembel-hayvan.svg', description: 'Yavaş ve sakin', descriptionEn: 'Slow and calm' },

  // Sincap
  { id: 'sincap', animalType: 'sincap', name: 'Sincap', nameEn: 'Squirrel', style: 'kare', imageUrl: '/assets/avatars/kare/sincap.svg', description: 'Çalışkan ve çevik', descriptionEn: 'Hardworking and agile' },

  // Fil
  { id: 'fil', animalType: 'fil', name: 'Fil', nameEn: 'Elephant', style: 'kare', imageUrl: '/assets/avatars/kare/fil.svg', description: 'Büyük ve bilge', descriptionEn: 'Large and wise' },

  // Circle variants (yuvarlak)
  { id: 'kurt-1-yuvarlak', animalType: 'kurt', variant: 1, name: 'Kurt', nameEn: 'Wolf', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kurt-1.svg', description: 'Özgür ve güçlü', descriptionEn: 'Free and strong' },
  { id: 'kurt-2-yuvarlak', animalType: 'kurt', variant: 2, name: 'Kurt', nameEn: 'Wolf', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kurt-2.svg', description: 'Özgür ve güçlü', descriptionEn: 'Free and strong' },
  { id: 'at-yuvarlak', animalType: 'at', name: 'At', nameEn: 'Horse', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/at.svg', description: 'Hızlı ve asil', descriptionEn: 'Fast and noble' },
  { id: 'baykus-yuvarlak', animalType: 'baykus', name: 'Baykuş', nameEn: 'Owl', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/baykus.svg', description: 'Bilge ve sakin', descriptionEn: 'Wise and calm' },
  { id: 'tavsan-yuvarlak', animalType: 'tavsan', name: 'Tavşan', nameEn: 'Rabbit', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/tavsan.svg', description: 'Hızlı ve sevimli', descriptionEn: 'Fast and cute' },
  { id: 'fare-yuvarlak', animalType: 'fare', name: 'Fare', nameEn: 'Mouse', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/fare.svg', description: 'Küçük ve çevik', descriptionEn: 'Small and agile' },
  { id: 'tilki-yuvarlak', animalType: 'tilki', name: 'Tilki', nameEn: 'Fox', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/tilki.svg', description: 'Zeki ve kurnaz', descriptionEn: 'Smart and clever' },
  { id: 'yilan-yuvarlak', animalType: 'yilan', name: 'Yılan', nameEn: 'Snake', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/yilan.svg', description: 'Gizemli ve hızlı', descriptionEn: 'Mysterious and fast' },
  { id: 'orumcek-yuvarlak', animalType: 'orumcek', name: 'Örümcek', nameEn: 'Spider', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/orumcek.svg', description: 'Sabırlı ve üretken', descriptionEn: 'Patient and productive' },
  { id: 'kaplan-yuvarlak', animalType: 'kaplan', name: 'Kaplan', nameEn: 'Tiger', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kaplan.svg', description: 'Güçlü ve cesur', descriptionEn: 'Strong and brave' },
  { id: 'timsah-yuvarlak', animalType: 'timsah', name: 'Timsah', nameEn: 'Crocodile', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/timsah.svg', description: 'Güçlü ve dayanıklı', descriptionEn: 'Strong and resilient' },
  { id: 'ahtopot-yuvarlak', animalType: 'ahtopot', name: 'Ahtapot', nameEn: 'Octopus', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/ahtopot.svg', description: 'Zeki ve esnek', descriptionEn: 'Smart and flexible' },
  { id: 'hipopotam-yuvarlak', animalType: 'hipopotam', name: 'Hipopotam', nameEn: 'Hippo', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/hipopotam.svg', description: 'Büyük ve sakin', descriptionEn: 'Large and calm' },
  { id: 'gergedan-yuvarlak', animalType: 'gergedan', name: 'Gergedan', nameEn: 'Rhino', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/gergedan.svg', description: 'Güçlü ve korumacı', descriptionEn: 'Strong and protective' },
  { id: 'inek-yuvarlak', animalType: 'inek', name: 'İnek', nameEn: 'Cow', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/inek.svg', description: 'Sakin ve üretken', descriptionEn: 'Calm and productive' },
  { id: 'kurbaga-yuvarlak', animalType: 'kurbaga', name: 'Kurbağa', nameEn: 'Frog', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kurbaga.svg', description: 'Eğlenceli ve zıpır', descriptionEn: 'Fun and bouncy' },
  { id: 'kuzu-yuvarlak', animalType: 'kuzu', name: 'Kuzu', nameEn: 'Lamb', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kuzu.svg', description: 'Yumuşak ve sevimli', descriptionEn: 'Soft and cute' },
  { id: 'zebra-yuvarlak', animalType: 'zebra', name: 'Zebra', nameEn: 'Zebra', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/zebra.svg', description: 'Çizgili ve hızlı', descriptionEn: 'Striped and fast' },
  { id: 'findik-faresi-yuvarlak', animalType: 'findik-faresi', name: 'Fındık Faresi', nameEn: 'Dormouse', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/findik-faresi.svg', description: 'Küçük ve sevimli', descriptionEn: 'Small and cute' },
  { id: 'balik-1-yuvarlak', animalType: 'balik', variant: 1, name: 'Balık', nameEn: 'Fish', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/balik-1.svg', description: 'Renkli ve özgür', descriptionEn: 'Colorful and free' },
  { id: 'balik-2-yuvarlak', animalType: 'balik', variant: 2, name: 'Balık', nameEn: 'Fish', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/balik-2.svg', description: 'Renkli ve özgür', descriptionEn: 'Colorful and free' },
  { id: 'balik-3-yuvarlak', animalType: 'balik', variant: 3, name: 'Balık', nameEn: 'Fish', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/balik-3.svg', description: 'Renkli ve özgür', descriptionEn: 'Colorful and free' },
  { id: 'balik-4-yuvarlak', animalType: 'balik', variant: 4, name: 'Balık', nameEn: 'Fish', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/balik-4.svg', description: 'Renkli ve özgür', descriptionEn: 'Colorful and free' },
  { id: 'domuz-yuvarlak', animalType: 'domuz', name: 'Domuz', nameEn: 'Pig', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/domuz.svg', description: 'Neşeli ve doygun', descriptionEn: 'Joyful and content' },
  { id: 'penguen-yuvarlak', animalType: 'penguen', name: 'Penguen', nameEn: 'Penguin', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/penguen.svg', description: 'Şirin ve dayanıklı', descriptionEn: 'Cute and resilient' },
  { id: 'papagan-yuvarlak', animalType: 'papagan', name: 'Papağan', nameEn: 'Parrot', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/papagan.svg', description: 'Renkli ve konuşkan', descriptionEn: 'Colorful and talkative' },
  { id: 'kirpi-yuvarlak', animalType: 'kirpi', name: 'Kirpi', nameEn: 'Hedgehog', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kirpi.svg', description: 'Dikenli ama sevimli', descriptionEn: 'Spiky but cute' },
  { id: 'dinazor-1-yuvarlak', animalType: 'dinazor', variant: 1, name: 'Dinozor', nameEn: 'Dinosaur', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/dinazor-1.svg', description: 'Tarih öncesi dev', descriptionEn: 'Prehistoric giant' },
  { id: 'dinazor-2-yuvarlak', animalType: 'dinazor', variant: 2, name: 'Dinozor', nameEn: 'Dinosaur', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/dinazor-2.svg', description: 'Tarih öncesi dev', descriptionEn: 'Prehistoric giant' },
  { id: 'fok-baligi-yuvarlak', animalType: 'fok', name: 'Fok Balığı', nameEn: 'Seal', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/fok-baligi.svg', description: 'Sevimli ve oyuncu', descriptionEn: 'Cute and playful' },
  { id: 'ceylan-yuvarlak', animalType: 'ceylan', name: 'Ceylan', nameEn: 'Gazelle', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/ceylan.svg', description: 'Zarif ve hızlı', descriptionEn: 'Elegant and fast' },
  { id: 'tukan-yuvarlak', animalType: 'tukan', name: 'Tukan', nameEn: 'Toucan', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/tukan.svg', description: 'Renkli ve gürültücü', descriptionEn: 'Colorful and noisy' },
  { id: 'deve-yuvarlak', animalType: 'deve', name: 'Deve', nameEn: 'Camel', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/deve.svg', description: 'Dayanıklı ve sakin', descriptionEn: 'Durable and calm' },
  { id: 'ordek-yuvarlak', animalType: 'ordek', name: 'Ördek', nameEn: 'Duck', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/ordek.svg', description: 'Neşeli ve yüzücü', descriptionEn: 'Happy and swimmer' },
  { id: 'kopek-1-yuvarlak', animalType: 'kopek', variant: 1, name: 'Köpek', nameEn: 'Dog', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kopek-1.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-2-yuvarlak', animalType: 'kopek', variant: 2, name: 'Köpek', nameEn: 'Dog', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kopek-2.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-3-yuvarlak', animalType: 'kopek', variant: 3, name: 'Köpek', nameEn: 'Dog', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kopek-3.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-4-yuvarlak', animalType: 'kopek', variant: 4, name: 'Köpek', nameEn: 'Dog', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kopek-4.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-5-yuvarlak', animalType: 'kopek', variant: 5, name: 'Köpek', nameEn: 'Dog', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kopek-5.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-6-yuvarlak', animalType: 'kopek', variant: 6, name: 'Köpek', nameEn: 'Dog', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kopek-6.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-7-yuvarlak', animalType: 'kopek', variant: 7, name: 'Köpek', nameEn: 'Dog', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kopek-7.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'kopek-8-yuvarlak', animalType: 'kopek', variant: 8, name: 'Köpek', nameEn: 'Dog', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kopek-8.svg', description: 'Sadık ve enerjik', descriptionEn: 'Loyal and energetic' },
  { id: 'geyik-yuvarlak', animalType: 'geyik', name: 'Geyik', nameEn: 'Deer', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/geyik.svg', description: 'Zarif ve hızlı', descriptionEn: 'Elegant and fast' },
  { id: 'tavuk-yuvarlak', animalType: 'tavuk', name: 'Tavuk', nameEn: 'Chicken', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/tavuk.svg', description: 'Gündüzcü ve üretken', descriptionEn: 'Diurnal and productive' },
  { id: 'kartal-yuvarlak', animalType: 'kartal', name: 'Kartal', nameEn: 'Eagle', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kartal.svg', description: 'Görkemli ve özgür', descriptionEn: 'Majestic and free' },
  { id: 'koala-yuvarlak', animalType: 'koala', name: 'Koala', nameEn: 'Koala', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/koala.svg', description: 'Sakin ve uykucu', descriptionEn: 'Calm and sleepy' },
  { id: 'rakun-yuvarlak', animalType: 'rakun', name: 'Rakun', nameEn: 'Raccoon', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/rakun.svg', description: 'Meraklı ve zeki', descriptionEn: 'Curious and smart' },
  { id: 'kanguru-yuvarlak', animalType: 'kanguru', name: 'Kanguru', nameEn: 'Kangaroo', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kanguru.svg', description: 'Zıpır ve hızlı', descriptionEn: 'Bouncy and fast' },
  { id: 'leopar-yuvarlak', animalType: 'leopar', name: 'Leopar', nameEn: 'Leopard', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/leopar.svg', description: 'Hızlı ve gizemli', descriptionEn: 'Fast and mysterious' },
  { id: 'kizil-panda-yuvarlak', animalType: 'kizil-panda', name: 'Kızıl Panda', nameEn: 'Red Panda', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kizil-panda.svg', description: 'Sevimli ve nadir', descriptionEn: 'Cute and rare' },
  { id: 'yaban-domuzu-yuvarlak', animalType: 'yaban-domuzu', name: 'Yaban Domuzu', nameEn: 'Wild Boar', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/yaban-domuzu.svg', description: 'Güçlü ve vahşi', descriptionEn: 'Strong and wild' },
  { id: 'sahin-yuvarlak', animalType: 'sahin', name: 'Şahin', nameEn: 'Hawk', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/sahin.svg', description: 'Keskin gözlü ve hızlı', descriptionEn: 'Sharp-eyed and fast' },
  { id: 'boga-yuvarlak', animalType: 'boga', name: 'Boğa', nameEn: 'Bull', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/boga.svg', description: 'Güçlü ve kararlı', descriptionEn: 'Strong and determined' },
  { id: 'devekusu-yuvarlak', animalType: 'devekusu', name: 'Devekuşu', nameEn: 'Ostrich', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/devekusu.svg', description: 'Büyük ve hızlı koşucu', descriptionEn: 'Large and fast runner' },
  { id: 'goril-yuvarlak', animalType: 'goril', name: 'Goril', nameEn: 'Gorilla', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/goril.svg', description: 'Güçlü ve korumacı', descriptionEn: 'Strong and protective' },
  { id: 'okuz-yuvarlak', animalType: 'okuz', name: 'Öküz', nameEn: 'Ox', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/okuz.svg', description: 'Güçlü ve çalışkan', descriptionEn: 'Strong and hardworking' },
  { id: 'zurafa-yuvarlak', animalType: 'zurafa', name: 'Zürafa', nameEn: 'Giraffe', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/zurafa.svg', description: 'Uzun ve sakin', descriptionEn: 'Tall and calm' },
  { id: 'kaplumbaga-yuvarlak', animalType: 'kaplumbaga', name: 'Kaplumbağa', nameEn: 'Turtle', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/kaplumbaga.svg', description: 'Sakin ve sabırlı', descriptionEn: 'Calm and patient' },
  { id: 'aslan-yuvarlak', animalType: 'aslan', name: 'Aslan', nameEn: 'Lion', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/aslan.svg', description: 'Güçlü ve lider', descriptionEn: 'Strong and leader' },
  { id: 'flamingo-yuvarlak', animalType: 'flamingo', name: 'Flamingo', nameEn: 'Flamingo', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/flamingo.svg', description: 'Zarif ve pembe', descriptionEn: 'Elegant and pink' },
  { id: 'panda-yuvarlak', animalType: 'panda', name: 'Panda', nameEn: 'Panda', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/panda.svg', description: 'Şirin ve sakin', descriptionEn: 'Cute and calm' },
  { id: 'ayi-yuvarlak', animalType: 'ayi', name: 'Ayı', nameEn: 'Bear', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/ayi.svg', description: 'Güçlü ve korumacı', descriptionEn: 'Strong and protective' },
  { id: 'tembel-hayvan-yuvarlak', animalType: 'tembel-hayvan', name: 'Tembel Hayvan', nameEn: 'Sloth', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/tembel-hayvan.svg', description: 'Yavaş ve sakin', descriptionEn: 'Slow and calm' },
  { id: 'sincap-yuvarlak', animalType: 'sincap', name: 'Sincap', nameEn: 'Squirrel', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/sincap.svg', description: 'Çalışkan ve çevik', descriptionEn: 'Hardworking and agile' },
  { id: 'fil-yuvarlak', animalType: 'fil', name: 'Fil', nameEn: 'Elephant', style: 'yuvarlak', imageUrl: '/assets/avatars/yuvarlak/fil.svg', description: 'Büyük ve bilge', descriptionEn: 'Large and wise' }
];

export type AnimalAvatarId = (typeof animalAvatars)[number]['id'];

// Helper functions
export const getAnimalAvatarById = (id: string) => {
  return animalAvatars.find((a) => a.id === id);
};

export const getAvatarsByStyle = (style: 'kare' | 'yuvarlak' | 'all') => {
  if (style === 'all') return animalAvatars;
  return animalAvatars.filter((a) => a.style === style);
};

export const getAvatarsByAnimalType = (animalType: string) => {
  return animalAvatars.filter((a) => a.animalType === animalType);
};

