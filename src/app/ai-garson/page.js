'use client';

import { useState, useRef, useEffect } from 'react';
import { Container, Title, Text, Paper, Button, ScrollArea, Box, Flex, Avatar, ActionIcon, Group, Badge, Card, Image, SimpleGrid, Divider } from '@mantine/core';
import { IconArrowLeft, IconChevronRight, IconPlus, IconHome, IconChefHat, IconStar, IconShoppingCart, IconMoodSmile, IconQuestionMark, IconMeat, IconGlass, IconCake } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './page.module.css';

// Ana sohbet seçenekleri - her buton bir kullanıcı sorusu oluşturur
const commonQuestions = [
  { id: 'menu', text: 'Menüyü görmek istiyorum', icon: <IconHome size={16} /> },
  { id: 'recommendations', text: 'Bugün ne önerirsiniz?', icon: <IconChefHat size={16} /> },
  { id: 'popular', text: 'En popüler yemekler neler?', icon: <IconStar size={16} /> },
  { id: 'ask', text: 'Başka bir soru sormak istiyorum', icon: <IconQuestionMark size={16} /> },
];

// Kategori açıklamaları
const categoryDescriptions = {
  'yemekler': 'Doyurucu ve lezzetli ana yemekler',
  'icecekler': 'Serinletici ve enerji verici içecekler',
  'tatlilar': 'Şekerli ve eğlenceli tatlılar',
  'kahvalti': 'Güne harika bir başlangıç',
  'baslangiçlar': 'Taze salatalar ve mezeler',
};

export default function AIGarson() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Merhaba! Ben dijital garsonunuz. Size nasıl yardımcı olabilirim?',
      isUser: false,
      timestamp: new Date(),
      buttons: [
        ...commonQuestions,
        { id: 'baslangiçlar_menu', text: 'Başlangıçlar Menüsü', icon: <IconMoodSmile size={16} /> },
        { id: 'ana_yemekler_menu', text: 'Ana Yemekler Menüsü', icon: <IconMeat size={16} /> },
        { id: 'tatlilar_menu', text: 'Tatlılar Menüsü', icon: <IconCake size={16} /> },
        { id: 'icecekler_menu', text: 'İçecekler Menüsü', icon: <IconGlass size={16} /> },
      ]
    },
  ]);
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [viewMode, setViewMode] = useState('welcome'); // 'welcome', 'categories', 'subcategories', 'products'
  const [cartItems, setCartItems] = useState([]);
  const [customOptions, setCustomOptions] = useState(null);
  const messagesEndRef = useRef(null);

  // Örnek kategori verileri
  const categories = [
    { id: 'yemekler', name: 'Yemekler', icon: <IconMeat size={24} /> },
    { id: 'icecekler', name: 'İçecekler', icon: <IconGlass size={24} /> },
    { id: 'tatlilar', name: 'Tatlılar', icon: <IconCake size={24} /> },
    { id: 'kahvalti', name: 'Kahvaltı', icon: <IconChefHat size={24} /> },
    { id: 'baslangiçlar', name: 'Başlangıçlar', icon: <IconMoodSmile size={24} /> },
  ];

  const subcategories = {
    yemekler: [
      { id: 'ana_yemekler', name: 'Ana Yemekler' },
      { id: 'etli', name: 'Etli Yemekler' },
      { id: 'tavuk', name: 'Tavuk Yemekleri' },
      { id: 'deniz', name: 'Deniz Ürünleri' },
      { id: 'vejetaryen', name: 'Vejetaryen' },
    ],
    icecekler: [
      { id: 'sicak', name: 'Sıcak İçecekler' },
      { id: 'soguk', name: 'Soğuk İçecekler' },
      { id: 'alkol', name: 'Alkollü İçecekler' },
    ],
    tatlilar: [
      { id: 'sutlu', name: 'Sütlü Tatlılar' },
      { id: 'sekerli', name: 'Şerbetli Tatlılar' },
      { id: 'dondurmalar', name: 'Dondurmalar' },
      { id: 'ozel_tatlilar', name: 'Özel Tatlılar' },
    ],
    kahvalti: [
      { id: 'kahvalti_tabagi', name: 'Kahvaltı Tabağı' },
      { id: 'omletler', name: 'Omletler' },
      { id: 'tostlar', name: 'Tostlar' },
    ],
    baslangiçlar: [
      { id: 'salatalar', name: 'Salatalar' },
      { id: 'mezeler', name: 'Mezeler' },
      { id: 'corba', name: 'Çorbalar' },
    ],
  };

  // Örnek ürün verileri
  const products = {
    // Mevcut kategoriler    
    // Ana Yemekler kategorisinden ürünler
    ana_yemekler: [
      { id: 101, name: 'Bonfile Steak', price: '280 TL', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center', description: 'Özel sos ve mevsim sebzeleri ile servis edilen Marine edilmiş dana bonfile', calories: 550, prepTime: '25 dk', chefSpecial: true, popular: true },
      { id: 102, name: 'Karışık Izgara', price: '320 TL', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&crop=center', description: 'Dana bonfile, kuzu pirzola ve tavuk göğsünden oluşan özel ızgara tabağı', calories: 680, prepTime: '30 dk', popular: true },
      { id: 103, name: 'Mantarlı Risotto', price: '150 TL', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&crop=center', description: 'Porcini ve kültür mantarları ile hazırlanmış kremsi İtalyan risottosu', calories: 320, prepTime: '20 dk', healthy: true },
      { id: 104, name: 'Somon Teriyaki', price: '240 TL', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&crop=center', description: 'Teriyaki soslu ızgara somon, jasmin pilavı ve wok sebzeleri ile', calories: 420, prepTime: '25 dk', healthy: true },
      { id: 105, name: 'Kuzu Tandır', price: '260 TL', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center', description: 'Geleneksel tandırda pişirilmiş kuzu eti, pilav ve cacık ile', calories: 580, prepTime: '35 dk', popular: true },
      { id: 106, name: 'Tavuk Cordon Bleu', price: '180 TL', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop&crop=center', description: 'Jambon ve kaşar peyniri dolgulu tavuk göğsü, patates püresi ile', calories: 450, prepTime: '25 dk', popular: false },
    ],

    // Başlangıçlar kategorisinden ürünler
    salatalar: [
      { id: 201, name: 'Akdeniz Salatası', price: '85 TL', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center', description: 'Taze domates, salatalık, biber, zeytin ve beyaz peynir ile hazırlanmış klasik Akdeniz salatası', calories: 180, prepTime: '10 dk', healthy: true },
      { id: 202, name: 'Sezar Salatası', price: '75 TL', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center', description: 'Klasik Sezar soslu, kruton ve parmesan peynirli taze marul salatası', calories: 220, prepTime: '10 dk', popular: true },
      { id: 203, name: 'Avokado Toast', price: '65 TL', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&crop=center', description: 'Ekşi mayalı ekmek üzerinde ezilmiş avokado, cherry domates ve feta peyniri', calories: 280, prepTime: '15 dk', healthy: true },
    ],
    
    mezeler: [
      { id: 204, name: 'Mezze Tabağı', price: '95 TL', image: 'https://images.unsplash.com/photo-1544510808-0c8e5c2b8b7e?w=400&h=300&fit=crop&crop=center', description: 'Humus, babaganuş, ezme ve zeytinyağlılardan oluşan özel mezze tabağı', calories: 350, prepTime: '15 dk', popular: true },
      { id: 205, name: 'Bruschetta', price: '55 TL', image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop&crop=center', description: 'İtalyan ekmeği üzerinde domates, fesleğen ve mozzarella peyniri', calories: 180, prepTime: '10 dk', popular: false },
    ],
    
    corba: [
      { id: 206, name: 'Çorba Çeşitleri', price: '35 TL', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&crop=center', description: 'Günün çorbası - mercimek, domates veya sebze çorbası seçenekleri', calories: 120, prepTime: '15 dk', healthy: true },
    ],

    // Tatlılar kategorisinden ürünler
    sutlu: [
      { id: 301, name: 'Crème Brûlée', price: '110 TL', image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&h=300&fit=crop&crop=center', description: 'Fransız usulü karamelize şekerli vanilya kreması', calories: 350, prepTime: '15 dk', popular: true },
    ],

    sekerli: [
      { id: 302, name: 'Çikolatalı Sufle', price: '95 TL', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center', description: 'Sıcak çikolata dolgulu ve vanilya dondurması ile servis edilen sufle', calories: 420, prepTime: '20 dk', popular: true, chefSpecial: true },
    ],

    ozel_tatlilar: [
      { id: 303, name: 'Tiramisu', price: '85 TL', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center', description: 'Geleneksel İtalyan tatlısı, mascarpone peyniri ve espresso ile', calories: 380, prepTime: '15 dk', popular: true },
      { id: 304, name: 'Cheesecake', price: '95 TL', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&crop=center', description: 'New York usulü klasik cheesecake, meyveli sos ile servis', calories: 400, prepTime: '15 dk', popular: true },
      { id: 305, name: 'Çikolatalı Lava Kek', price: '105 TL', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&crop=center', description: 'İçinden sıcak çikolata akan özel kek, vanilya dondurması ile', calories: 450, prepTime: '20 dk', chefSpecial: true },
      { id: 306, name: 'Meyve Tart', price: '85 TL', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop&crop=center', description: 'Mevsim meyveli taze tart, krema patissiere ile', calories: 320, prepTime: '15 dk', healthy: true },
    ],

    // İçecekler kategorisinden ürünler
    sicak: [
      { id: 401, name: 'Espresso', price: '35 TL', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop&crop=center', description: 'İtalyan usulü hazırlanmış yoğun ve aromatik espresso', calories: 5, prepTime: '5 dk', popular: true },
      { id: 402, name: 'Cappuccino', price: '45 TL', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center', description: 'Espresso, sıcak süt ve süt köpüğü ile hazırlanmış klasik İtalyan kahvesi', calories: 120, prepTime: '5 dk', popular: true },
      { id: 403, name: 'Çay Çeşitleri', price: '25 TL', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&crop=center', description: 'Türk çayı, yeşil çay, bitki çayları ve özel karışımlar', calories: 0, prepTime: '5 dk', healthy: true },
    ],

    soguk: [
      { id: 404, name: 'Mevsim Meyveleri Kokteyli', price: '75 TL', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center', description: 'Çeşitli mevsim meyveleriyle hazırlanmış ferahlatıcı kokteyl', calories: 180, prepTime: '10 dk', healthy: true },
      { id: 405, name: 'Taze Sıkılmış Portakal Suyu', price: '45 TL', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&crop=center', description: 'Günlük taze sıkılmış, doğal ve katkısız portakal suyu', calories: 120, prepTime: '5 dk', healthy: true },
      { id: 406, name: 'Limonata', price: '35 TL', image: 'https://images.unsplash.com/photo-1523371683702-1c2eb0d8b4b6?w=400&h=300&fit=crop&crop=center', description: 'Taze limon, nane ve soda ile hazırlanmış serinletici limonata', calories: 100, prepTime: '5 dk', popular: true },
    ],

    // Şef Önerileri kategorisinden özel ürünler
    deniz: [
      { id: 501, name: 'Özel Deniz Mahsulleri', price: '350 TL', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&crop=center', description: 'Şefimizin özel sosları ile hazırlanmış karides, midye ve ahtapot', calories: 380, prepTime: '30 dk', chefSpecial: true },
    ],
    
    tavuk: [
      { id: 502, name: 'Wagyu Burger', price: '180 TL', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center', description: 'Wagyu eti, truffle mayonez ve özel soslarla hazırlanmış gourmet burger', calories: 580, prepTime: '20 dk', chefSpecial: true, popular: true },
    ],
    
    dondurmalar: [
      { id: 503, name: 'Şef Tatlı Tabağı', price: '120 TL', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&crop=center', description: 'Çeşitli mini tatlılardan oluşan şefimizin özel tatlı sunumu', calories: 450, prepTime: '15 dk', chefSpecial: true },
    ],
  };

  // Popüler ürünleri filtrele
  const popularProducts = Object.values(products).flat().filter(product => product.popular);
  
  // Şef önerilerini filtrele
  const chefSpecials = Object.values(products).flat().filter(product => product.chefSpecial);

  // Sağlıklı ürünleri filtrele
  const healthyProducts = Object.values(products).flat().filter(product => product.healthy);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Claude benzeri arayüzde kullanıcının tıkladığı seçenek bir mesaj olarak eklenir
  const handleButtonClick = (questionId, questionText) => {
    // Kullanıcı mesajını ekle
    const newUserMessage = {
      id: messages.length + 1,
      text: questionText,
      isUser: true,
      timestamp: new Date(),
    };

    // AI yanıtını hazırla
    let aiResponse = '';
    let responseButtons = [];
    
    switch(questionId) {
      // Direkt kategori menüleri için yeni case'ler ekleyelim
      case 'baslangiçlar_menu':
        aiResponse = '';
        setActiveCategory(categories.find(c => c.id === 'baslangiçlar'));
        
        // Tüm başlangıç ürünlerini birleştir
        const baslangiçProducts = [
          ...(products['salatalar'] || []),
          ...(products['mezeler'] || []),
          ...(products['corba'] || [])
        ];
        
        setCustomOptions(baslangiçProducts);
        setViewMode('products');
        
        responseButtons = [
          { id: 'menu', text: 'Menüye Dön', icon: <IconHome size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;

      case 'ana_yemekler_menu':
        aiResponse = '';
        setActiveCategory(categories.find(c => c.id === 'yemekler'));
        
        // Tüm ana yemekleri birleştir
        const anaYemeklerProducts = [
          ...(products['ana_yemekler'] || []),
          ...(products['etli'] || []),
          ...(products['tavuk'] || []),
          ...(products['deniz'] || []),
          ...(products['vejetaryen'] || [])
        ];
        
        setCustomOptions(anaYemeklerProducts);
        setViewMode('products');
        
        responseButtons = [
          { id: 'menu', text: 'Menüye Dön', icon: <IconHome size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'tatlilar_menu':
        aiResponse = '';
        setActiveCategory(categories.find(c => c.id === 'tatlilar'));
        
        // Tüm tatlıları birleştir
        const tatlilarProducts = [
          ...(products['sutlu'] || []),
          ...(products['sekerli'] || []),
          ...(products['dondurmalar'] || []),
          ...(products['ozel_tatlilar'] || [])
        ];
        
        setCustomOptions(tatlilarProducts);
        setViewMode('products');
        
        responseButtons = [
          { id: 'menu', text: 'Menüye Dön', icon: <IconHome size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'icecekler_menu':
        aiResponse = '';
        setActiveCategory(categories.find(c => c.id === 'icecekler'));
        
        // Tüm içecekleri birleştir
        const iceceklerProducts = [
          ...(products['sicak'] || []),
          ...(products['soguk'] || []),
          ...(products['alkol'] || [])
        ];
        
        setCustomOptions(iceceklerProducts);
        setViewMode('products');
        
        responseButtons = [
          { id: 'menu', text: 'Menüye Dön', icon: <IconHome size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'menu':
        aiResponse = 'Menümüzden seçim yapabilirsiniz:';
        setViewMode('categories');
        // Menü göster ile ilgili butonlar
        responseButtons = [
          ...categories.map(cat => ({ 
            id: `cat_${cat.id}`, 
            text: cat.name, 
            icon: cat.icon 
          })),
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'recommendations':
        aiResponse = '';
        setCustomOptions(chefSpecials);
        responseButtons = [
          { id: 'see_all_specials', text: 'Tüm şef önerilerini göster', icon: <IconChefHat size={16} /> },
          { id: 'menu', text: 'Menüye Git', icon: <IconHome size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'popular':
        aiResponse = '';
        setCustomOptions(popularProducts);
        responseButtons = [
          { id: 'menu', text: 'Menüye Git', icon: <IconHome size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'ask':
        aiResponse = 'Tabii, nasıl yardımcı olabilirim?';
        responseButtons = [
          { id: 'ask_allergies', text: 'Alerjisi olanlar için öneriler', icon: <IconQuestionMark size={16} /> },
          { id: 'ask_time', text: 'Servis süresi ne kadar?', icon: <IconQuestionMark size={16} /> },
          { id: 'ask_vegan', text: 'Vegan seçenekler var mı?', icon: <IconQuestionMark size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'back_main':
        aiResponse = 'Size nasıl yardımcı olabilirim?';
        responseButtons = [
          ...commonQuestions,
          { id: 'baslangiçlar_menu', text: 'Başlangıçlar Menüsü', icon: <IconMoodSmile size={16} /> },
          { id: 'ana_yemekler_menu', text: 'Ana Yemekler Menüsü', icon: <IconMeat size={16} /> },
          { id: 'tatlilar_menu', text: 'Tatlılar Menüsü', icon: <IconCake size={16} /> },
          { id: 'icecekler_menu', text: 'İçecekler Menüsü', icon: <IconGlass size={16} /> },
        ];
        setCustomOptions(null);
        setViewMode('welcome');
        break;
        
      case 'ask_allergies':
        aiResponse = 'Alerjisi olan misafirlerimiz için özel menümüz mevcut. Lütfen sipariş vermeden önce alerjilerinizi belirtiniz. Size uygun alternatifler sunabiliriz.';
        responseButtons = [
          { id: 'ask', text: 'Başka bir soru sormak istiyorum', icon: <IconQuestionMark size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'ask_time':
        aiResponse = 'Siparişlerimiz ortalama 20-25 dakika içerisinde hazırlanıp servis edilmektedir. Yoğunluğa göre bu süre değişebilir.';
        responseButtons = [
          { id: 'ask', text: 'Başka bir soru sormak istiyorum', icon: <IconQuestionMark size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'ask_vegan':
        aiResponse = 'Evet, vegan misafirlerimiz için özel seçeneklerimiz mevcut. Vejetaryen kategorimizde bulabilirsiniz.';
        responseButtons = [
          { id: 'menu', text: 'Menüyü Göster', icon: <IconHome size={16} /> },
          { id: 'ask', text: 'Başka bir soru sormak istiyorum', icon: <IconQuestionMark size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'see_all_specials':
        aiResponse = '';
        setCustomOptions(chefSpecials);
        responseButtons = [
          { id: 'menu', text: 'Menüye Git', icon: <IconHome size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      default:
        // Kategori seçimi
        if (questionId.startsWith('cat_')) {
          const categoryId = questionId.replace('cat_', '');
          const category = categories.find(c => c.id === categoryId);
          setActiveCategory(category);
          
          aiResponse = '';
          
          // Kategori seçimine göre doğrudan tüm ürünleri göster
          let allCategoryProducts = [];
          
          // Kategoriye ait tüm alt kategorilerdeki ürünleri birleştir
          if (categoryId === 'yemekler') {
            allCategoryProducts = [
              ...(products['ana_yemekler'] || []),
              ...(products['etli'] || []),
              ...(products['tavuk'] || []),
              ...(products['deniz'] || []),
              ...(products['vejetaryen'] || [])
            ];
          } else if (categoryId === 'icecekler') {
            allCategoryProducts = [
              ...(products['sicak'] || []),
              ...(products['soguk'] || []),
              ...(products['alkol'] || [])
            ];
          } else if (categoryId === 'tatlilar') {
            allCategoryProducts = [
              ...(products['sutlu'] || []),
              ...(products['sekerli'] || []),
              ...(products['dondurmalar'] || []),
              ...(products['ozel_tatlilar'] || [])
            ];
          } else if (categoryId === 'baslangiçlar') {
            allCategoryProducts = [
              ...(products['salatalar'] || []),
              ...(products['mezeler'] || []),
              ...(products['corba'] || [])
            ];
          } else if (categoryId === 'kahvalti') {
            allCategoryProducts = [
              ...(products['kahvalti_tabagi'] || []),
              ...(products['omletler'] || []),
              ...(products['tostlar'] || [])
            ];
          }
          
          setCustomOptions(allCategoryProducts);
          setViewMode('products');
          
          // Alt kategoriye gitme seçeneği de ekleyelim
          responseButtons = [
            { id: `subcategories_${categoryId}`, text: 'Alt Kategorileri Göster', icon: <IconChevronRight size={16} /> },
            { id: 'menu', text: 'Menüye Dön', icon: <IconHome size={16} /> },
            { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
          ];
        }
        
        // Alt kategorileri görüntüle
        else if (questionId.startsWith('subcategories_')) {
          const categoryId = questionId.replace('subcategories_', '');
          const category = categories.find(c => c.id === categoryId);
          setActiveCategory(category);
          
          aiResponse = '';
          setViewMode('subcategories');
          
          responseButtons = [
            ...subcategories[categoryId].map(subcat => ({ 
              id: `subcat_${subcat.id}`, 
              text: subcat.name, 
              icon: <IconChevronRight size={16} /> 
            })),
            { id: 'menu', text: 'Diğer Kategorilere Bak', icon: <IconHome size={16} /> },
            { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
          ];
        }
        
        // Subkategori seçimi
        else if (questionId.startsWith('subcat_')) {
          const subcategoryId = questionId.replace('subcat_', '');
          const subcategory = Object.values(subcategories).flat().find(s => s.id === subcategoryId);
          
          setActiveSubcategory(subcategory);
          aiResponse = '';
          setViewMode('products');
          
          // Ürünleri doğru subcategory ID'sine göre ayarla
          const subcategoryProducts = products[subcategoryId] || [];
          setCustomOptions(subcategoryProducts);
          
          responseButtons = [
            { id: `back_to_${activeCategory.id}`, text: 'Kategoriye Dön', icon: <IconArrowLeft size={16} /> },
            { id: 'menu', text: 'Menüye Dön', icon: <IconHome size={16} /> },
            { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
          ];
        }
        
        // Ürün detayı
        else if (questionId.startsWith('product_detail_')) {
          const productId = parseInt(questionId.replace('product_detail_', ''));
          const product = Object.values(products).flat().find(p => p.id === productId);
          
          if (product) {
            aiResponse = `${product.name}: ${product.description}\nFiyat: ${product.price}\nKalori: ${product.calories} kcal\nHazırlama süresi: ${product.prepTime}`;
            
            responseButtons = [
              { id: `add_to_cart_${product.id}`, text: 'Sepete Ekle', icon: <IconPlus size={16} /> },
              { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
            ];
          }
        }
        
        // Sepete ekleme
        else if (questionId.startsWith('add_to_cart_')) {
          const productId = parseInt(questionId.replace('add_to_cart_', ''));
          const product = Object.values(products).flat().find(p => p.id === productId);
          
          if (product) {
            setCartItems(prev => [...prev, product]);
            aiResponse = `"${product.name}" sepetinize eklendi. Başka bir arzunuz var mı?`;
            
            responseButtons = [
              { id: 'view_cart', text: 'Sepeti Görüntüle', icon: <IconShoppingCart size={16} /> },
              { id: 'menu', text: 'Menüye Devam Et', icon: <IconHome size={16} /> },
              { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
            ];
          }
        }
        
        // Sepeti görüntüle
        else if (questionId === 'view_cart') {
          if (cartItems.length > 0) {
            // String formatındaki fiyatları temizleyip sayıya dönüştürüyoruz
            const total = cartItems.reduce((sum, item) => {
              // "120 TL" gibi string'den sadece sayı kısmını al
              const priceValue = parseInt(item.price.replace(/[^0-9]/g, ''));
              return sum + priceValue;
            }, 0);
            
            aiResponse = `Sepetinizde ${cartItems.length} ürün bulunuyor. Toplam tutar: ${total} TL`;
            
            // Sepetteki ürünleri göstermek için
            const cartItemsList = cartItems.map(item => `- ${item.name} (${item.price})`).join('\n');
            aiResponse += '\n\n' + cartItemsList;
            
            responseButtons = [
              { id: 'complete_order', text: 'Siparişi Tamamla', icon: <IconShoppingCart size={16} /> },
              { id: 'menu', text: 'Alışverişe Devam Et', icon: <IconHome size={16} /> },
              { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
            ];
          } else {
            aiResponse = 'Sepetiniz şu anda boş.';
            responseButtons = [
              ...commonQuestions,
              { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
            ];
          }
        }
        
        // Siparişi tamamla
        else if (questionId === 'complete_order') {
          aiResponse = 'Siparişiniz alındı! Teşekkür ederiz. Yemeğiniz en kısa sürede hazırlanacak.';
          setCartItems([]);
          responseButtons = [
            { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
          ];
        }
        
        // Kategori dönüş
        else if (questionId.startsWith('back_to_')) {
          const categoryId = questionId.replace('back_to_', '');
          const category = categories.find(c => c.id === categoryId);
          
          aiResponse = '';
          setViewMode('subcategories');
          setCustomOptions(null);
          
          responseButtons = [
            ...subcategories[categoryId].map(subcat => ({ 
              id: `subcat_${subcat.id}`, 
              text: subcat.name, 
              icon: <IconChevronRight size={16} /> 
            })),
            { id: 'menu', text: 'Diğer Kategorilere Bak', icon: <IconHome size={16} /> },
            { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
          ];
        }
        else {
          aiResponse = 'Size nasıl yardımcı olabilirim?';
          responseButtons = [
            ...commonQuestions,
            { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
          ];
        }
    }

    // Önce kullanıcı mesajını ekle
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // Sonra AI yanıtını ekle (tek bir yanıt)
    setTimeout(() => {
      const newAIMessage = {
        id: messages.length + 2,
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        buttons: responseButtons
      };
      
      setMessages(prevMessages => [...prevMessages, newAIMessage]);
      
      // Yanıt eklendiğinde aşağı kaydır
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }, 500);
  };

  const renderProductCards = (productList) => {
    if (!productList || productList.length === 0) return null;
    
    return (
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
        {productList.map((product) => (
          <Card key={product.id} shadow="sm" p="sm" radius="md" withBorder className={styles.productCard}>
            <Card.Section>
              <Image
                src={product.image}
                height={160}
                alt={product.name}
                className={styles.productImage}
              />
            </Card.Section>

            <Group justify="space-between" mt="sm" mb="xs">
              <Text fw={500} size="lg">{product.name}</Text>
              <Badge color="blue" variant="filled" size="md">{product.price}</Badge>
            </Group>

            <Flex gap="xs" mb="xs" wrap="wrap">
              {product.popular && <Badge color="yellow" variant="light" size="xs" leftSection={<IconStar size={12} />}>Popüler</Badge>}
              {product.chefSpecial && <Badge color="red" variant="light" size="xs" leftSection={<IconChefHat size={12} />}>Şef Önerisi</Badge>}
              {product.healthy && <Badge color="green" variant="light" size="xs">Sağlıklı</Badge>}
            </Flex>

            <Text size="sm" c="dimmed" lineClamp={2} className={styles.productDetails}>
              {product.description}
            </Text>
            
            <Flex mt="xs" mb="md" gap="sm" align="center">
              <Text size="xs" c="dimmed" fw={500}>
                <span style={{ fontWeight: 'bold' }}>Kalori:</span> {product.calories} kcal
              </Text>
              <Text size="xs" c="dimmed" fw={500}>
                <span style={{ fontWeight: 'bold' }}>Hazırlama:</span> {product.prepTime}
              </Text>
            </Flex>

            <Group mt="xs" className={styles.productActions}>
              <Button 
                variant="light" 
                color="blue" 
                onClick={() => handleButtonClick(`product_detail_${product.id}`, `${product.name} hakkında detay alabilir miyim?`)}
                size="sm"
                className={`${styles.actionButton}`}
                fullWidth
              >
                Detaylar
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Container p={0} className={styles.container}>
      <Paper shadow="none" radius={0} className={styles.chatContainer}>
        <Box className={styles.header}>
          <Flex align="center" gap="xs" justify="space-between">
          <Flex align="center" gap="xs">
            <Link href="/">
              <ActionIcon size="md" variant="transparent" color="white">
                <IconArrowLeft size={18} />
              </ActionIcon>
            </Link>
            <Title order={2} size="h3">Yapay Zeka Garson</Title>
            </Flex>
            <Button 
              variant="light" 
              color="orange" 
              size="xs" 
              onClick={() => handleButtonClick('back_main', 'Ana Menüye Dön')} 
              leftSection={<IconHome size={16} />}
            >
              Ana Menü
            </Button>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text size="xs" c="gray.2">Siparişiniz için size yardımcı olalım</Text>
            {cartItems.length > 0 && (
              <Badge color="green" size="lg" variant="filled" leftSection={<IconShoppingCart size={16} />}>
                {cartItems.length} ürün
              </Badge>
            )}
          </Flex>
        </Box>

        <ScrollArea className={styles.messagesContainer} scrollbarSize={4} type="hover" offsetScrollbars>
          {messages.map((message) => (
            <Box key={message.id} mb="lg">
              {/* Eğer AI mesajının içeriği boş değilse göster */}
              {(!message.isUser && message.text) && (
              <Flex
                  className={`${styles.message} ${styles.aiMessage}`}
                gap="xs"
                align="flex-start"
              >
                  <Avatar color="blue" radius="xl" className={styles.avatar} size="sm">AI</Avatar>
                  <Box className={styles.messageContent}>
                    <Text className={styles.messageText} size="sm">{message.text}</Text>
                    <Text size="xs" c="dimmed" className={styles.timestamp}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </Box>
                </Flex>
              )}
              
              {/* Kullanıcı mesajını her zaman göster */}
              {message.isUser && (
                <Flex
                  className={`${styles.message} ${styles.userMessage}`}
                  gap="xs"
                  align="flex-start"
                >
                <Box className={styles.messageContent}>
                  <Text className={styles.messageText} size="sm">{message.text}</Text>
                  <Text size="xs" c="dimmed" className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </Box>
                  <Avatar color="teal" radius="xl" className={styles.avatar} size="sm">Siz</Avatar>
                </Flex>
              )}
              
              {/* Özel ürün gösterimi - Önce ürün kartlarını göster */}
              {!message.isUser && customOptions && message.id === messages.length && (
                <Box mt="md" ml={38}>
                  {renderProductCards(customOptions)}
                </Box>
              )}
              
              {/* Sonra butonları göster */}
              {!message.isUser && message.buttons && message.buttons.length > 0 && (
                <Box mt="md" ml={38}>
                  <Group gap="sm" wrap="wrap" className={styles.responseButtons}>
                    {message.buttons.map((btn) => (
                      <Button
                        key={btn.id}
                        leftSection={btn.icon}
                        variant="light"
                        size="xs"
                        className={styles.responseButton}
                        onClick={() => handleButtonClick(btn.id, btn.text)}
                      >
                        {btn.text}
                      </Button>
                    ))}
                  </Group>
                </Box>
              )}
            </Box>
          ))}
          
          <div ref={messagesEndRef} />
        </ScrollArea>

        {cartItems.length > 0 && (
          <Box className={styles.cartSummary}>
            <Flex justify="space-between" align="center">
              <Text size="sm" fw={500}>Sepetinizde {cartItems.length} ürün bulunuyor</Text>
              <Button
                variant="filled"
                color="green"
                size="xs"
                leftSection={<IconShoppingCart size={16} />}
                onClick={() => handleButtonClick('view_cart', 'Sepeti görüntüle')}
                className={styles.viewCartButton}
              >
                Sepeti Görüntüle
              </Button>
            </Flex>
          </Box>
        )}
      </Paper>
    </Container>
  );
} 