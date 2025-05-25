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

export default function AIGarson() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Merhaba! Ben dijital garsonunuz. Size nasıl yardımcı olabilirim?',
      isUser: false,
      timestamp: new Date(),
      buttons: commonQuestions
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
  ];

  const subcategories = {
    yemekler: [
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
    ],
    kahvalti: [
      { id: 'kahvalti_tabagi', name: 'Kahvaltı Tabağı' },
      { id: 'omletler', name: 'Omletler' },
      { id: 'tostlar', name: 'Tostlar' },
    ],
  };

  // Örnek ürün verileri
  const products = {
    etli: [
      { id: 1, name: 'Izgara Köfte', price: '120 TL', image: 'https://via.placeholder.com/150', description: 'Özel baharatlarla marine edilmiş dana kıyma köfte', calories: 450, prepTime: '20 dk', popular: true },
      { id: 2, name: 'Kuzu Pirzola', price: '180 TL', image: 'https://via.placeholder.com/150', description: 'Taze baharatlarla servis edilen kuzu pirzola', calories: 380, prepTime: '25 dk', chefSpecial: true },
    ],
    vejetaryen: [
      { id: 3, name: 'Sebzeli Risotto', price: '90 TL', image: 'https://via.placeholder.com/150', description: 'Mevsim sebzeleri ile hazırlanmış kremsi risotto', calories: 320, prepTime: '20 dk', popular: true },
      { id: 4, name: 'Kinoa Salatası', price: '75 TL', image: 'https://via.placeholder.com/150', description: 'Avokado ve taze otlarla zenginleştirilmiş kinoa salatası', calories: 280, prepTime: '15 dk', healthy: true },
    ],
  };

  // Popüler ürünleri filtrele
  const popularProducts = Object.values(products).flat().filter(product => product.popular);
  
  // Şef önerilerini filtrele
  const chefSpecials = Object.values(products).flat().filter(product => product.chefSpecial);

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

    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // Yapay zeka yanıtını hazırla
    let aiResponse = '';
    let responseButtons = [];
    
    switch(questionId) {
      case 'menu':
        aiResponse = 'Menümüzden seçim yapabilirsiniz. Hangi kategoriye bakmak istersiniz?';
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
        aiResponse = 'Şefimizin bugünkü önerileri şunlardır:';
        setCustomOptions(chefSpecials);
        responseButtons = [
          { id: 'see_all_specials', text: 'Tüm şef önerilerini göster', icon: <IconChefHat size={16} /> },
          { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
        ];
        break;
        
      case 'popular':
        aiResponse = 'En popüler yemeklerimiz:';
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
        aiResponse = 'Ana menüye döndünüz. Size nasıl yardımcı olabilirim?';
        responseButtons = commonQuestions;
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
        
      default:
        // Kategori seçimi
        if (questionId.startsWith('cat_')) {
          const categoryId = questionId.replace('cat_', '');
          const category = categories.find(c => c.id === categoryId);
          setActiveCategory(category);
          
          aiResponse = `${category.name} kategorisinde şu seçeneklerimiz mevcut:`;
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
          aiResponse = `${subcategory.name} kategorisindeki ürünlerimiz:`;
          setViewMode('products');
          setCustomOptions(products[subcategoryId] || []);
          
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
            const total = cartItems.reduce((sum, item) => sum + parseInt(item.price), 0);
            aiResponse = `Sepetinizde ${cartItems.length} ürün bulunuyor. Toplam tutar: ${total} TL`;
            
            responseButtons = [
              { id: 'complete_order', text: 'Siparişi Tamamla', icon: <IconShoppingCart size={16} /> },
              { id: 'menu', text: 'Alışverişe Devam Et', icon: <IconHome size={16} /> },
              { id: 'back_main', text: 'Ana Menüye Dön', icon: <IconHome size={16} /> }
            ];
          } else {
            aiResponse = 'Sepetiniz şu anda boş.';
            responseButtons = commonQuestions;
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
          
          aiResponse = `${category.name} kategorisine geri döndünüz.`;
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
          responseButtons = commonQuestions;
        }
    }

    // AI yanıtını ekle
    setTimeout(() => {
      const newAIMessage = {
        id: messages.length + 2,
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        buttons: responseButtons
      };
      
      setMessages(prevMessages => [...prevMessages, newAIMessage]);
    }, 800);
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
                height={120}
                alt={product.name}
                className={styles.productImage}
              />
            </Card.Section>

            <Group justify="space-between" mt="sm" mb="xs">
              <Text fw={500} size="sm">{product.name}</Text>
              <Badge color="blue" variant="filled" size="sm">{product.price}</Badge>
            </Group>

            <Flex gap="xs" mb="xs" wrap="wrap">
              {product.popular && <Badge color="yellow" variant="light" size="xs" leftSection={<IconStar size={12} />}>Popüler</Badge>}
              {product.chefSpecial && <Badge color="red" variant="light" size="xs" leftSection={<IconChefHat size={12} />}>Şef Önerisi</Badge>}
              {product.healthy && <Badge color="green" variant="light" size="xs">Sağlıklı</Badge>}
            </Flex>

            <Text size="xs" c="dimmed" lineClamp={2} className={styles.productDetails}>
              {product.description}
            </Text>

            <Group mt="xs" className={styles.productActions}>
              <Button 
                variant="light" 
                color="blue" 
                onClick={() => handleButtonClick(`product_detail_${product.id}`, `${product.name} hakkında detay alabilir miyim?`)}
                size="xs"
                className={`${styles.actionButton} ${styles.secondaryButton}`}
              >
                Detaylar
              </Button>
              <Button 
                variant="filled" 
                color="green"
                leftSection={<IconPlus size={14} />}
                onClick={() => handleButtonClick(`add_to_cart_${product.id}`, `${product.name} sepete ekle`)}
                size="xs"
                className={`${styles.actionButton} ${styles.primaryButton}`}
              >
                Sepete Ekle
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
          <Flex align="center" gap="xs">
            <Link href="/">
              <ActionIcon size="md" variant="transparent" color="white">
                <IconArrowLeft size={18} />
              </ActionIcon>
            </Link>
            <Title order={2} size="h3">Yapay Zeka Garson</Title>
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
              <Flex
                className={`${styles.message} ${message.isUser ? styles.userMessage : styles.aiMessage}`}
                gap="xs"
                align="flex-start"
              >
                {!message.isUser && (
                  <Avatar color="blue" radius="xl" className={styles.avatar} size="sm">AI</Avatar>
                )}
                <Box className={styles.messageContent}>
                  <Text className={styles.messageText} size="sm">{message.text}</Text>
                  <Text size="xs" c="dimmed" className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </Box>
                {message.isUser && (
                  <Avatar color="teal" radius="xl" className={styles.avatar} size="sm">Siz</Avatar>
                )}
              </Flex>
              
              {/* Mesajın altında görünecek butonlar */}
              {!message.isUser && message.buttons && message.buttons.length > 0 && (
                <Box mt="md" ml={38}>
                  <Group gap="sm" className={styles.responseButtons}>
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
              
              {/* Özel ürün gösterimi */}
              {!message.isUser && customOptions && message.id === messages.length && (
                renderProductCards(customOptions)
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