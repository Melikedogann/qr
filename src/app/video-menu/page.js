'use client';

import { useState } from 'react';
import { Container, Title, Text, Grid, Card, Image, Badge, Group, Button, Tabs, ActionIcon, Flex, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconPlayerPlay, IconArrowLeft, IconHeart, IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './page.module.css';

// Kategori renk paletleri
const categoryColors = {
  'appetizers': {
    primary: '#4CAF50',    // Yeşil - tazelik & doğallık
    secondary: '#FFA726',  // Turuncu - enerji
    background: '#E8F5E8', // Açık yeşil arka plan
    text: '#2E7D32'        // Koyu yeşil metin
  },
  'main-dishes': {
    primary: '#8B0000',    // Bordo - zengin & sofistike
    secondary: '#5D4037',  // Koyu kahverengi - et çağrışımı
    background: '#FFF3E0', // Açık turuncu arka plan
    text: '#3E2723'        // Koyu kahve metin
  },
  'desserts': {
    primary: '#F48FB1',    // Pembe - şekerli & eğlenceli
    secondary: '#A1887F',  // Açık kahve - kek çağrışımı
    background: '#FFF8E1', // Vanilya beyazı arka plan
    text: '#4E342E'        // Koyu kahve metin
  },
  'drinks': {
    primary: '#81D4FA',    // Buz mavisi - serinlik
    secondary: '#FFEB3B',  // Mango sarısı - meyve suyu
    background: '#E3F2FD', // Açık mavi arka plan
    text: '#1565C0'        // Koyu mavi metin
  }
};

// Örnek menü kategorileri ve ürünler
const menuCategories = [
  { 
    value: 'appetizers', 
    label: 'Başlangıçlar',
    icon: '🥗',
    color: categoryColors.appetizers.primary
  },
  { 
    value: 'main-dishes', 
    label: 'Ana Yemekler',
    icon: '🍝',
    color: categoryColors['main-dishes'].primary
  },
  { 
    value: 'desserts', 
    label: 'Tatlılar',
    icon: '🍰',
    color: categoryColors.desserts.primary
  },
  { 
    value: 'drinks', 
    label: 'İçecekler',
    icon: '☕',
    color: categoryColors.drinks.primary
  },
];

// Örnek ürünler - Unsplash ve diğer platformlardan gerçek görseller
const products = [
  {
    id: 1,
    name: 'Akdeniz Salatası',
    description: 'Taze domates, salatalık, biber, zeytin ve beyaz peynir ile hazırlanmış klasik Akdeniz salatası',
    price: 85,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'appetizers',
    badge: 'Vejetaryen',
    badgeColor: 'green',
  },
  {
    id: 2,
    name: 'Bonfile Steak',
    description: 'Özel sos ve mevsim sebzeleri ile servis edilen Marine edilmiş dana bonfile',
    price: 280,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    category: 'main-dishes',
    badge: 'Şef Önerisi',
    badgeColor: 'red',
  },
  {
    id: 3,
    name: 'Çikolatalı Sufle',
    description: 'Sıcak çikolata dolgulu ve vanilya dondurması ile servis edilen sufle',
    price: 95,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'desserts',
    badge: 'Popüler',
    badgeColor: 'pink',
  },
  {
    id: 4,
    name: 'Mevsim Meyveleri Kokteyli',
    description: 'Çeşitli mevsim meyveleriyle hazırlanmış ferahlatıcı kokteyl',
    price: 75,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'drinks',
    badge: 'Alkolsüz',
    badgeColor: 'blue',
  },
  {
    id: 5,
    name: 'Karışık Izgara',
    description: 'Dana bonfile, kuzu pirzola ve tavuk göğsünden oluşan özel ızgara tabağı',
    price: 320,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    category: 'main-dishes',
    badge: 'Yeni',
    badgeColor: 'orange',
  },
  {
    id: 6,
    name: 'Mantarlı Risotto',
    description: 'Porcini ve kültür mantarları ile hazırlanmış kremsi İtalyan risottosu',
    price: 150,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'main-dishes',
    badge: 'Vejetaryen',
    badgeColor: 'green',
  },
  {
    id: 7,
    name: 'Sezar Salatası',
    description: 'Klasik Sezar soslu, kruton ve parmesan peynirli taze marul salatası',
    price: 75,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'appetizers',
    badge: 'Klasik',
    badgeColor: 'green',
  },
  {
    id: 8,
    name: 'Somon Teriyaki',
    description: 'Teriyaki soslu ızgara somon, jasmin pilavı ve wok sebzeleri ile',
    price: 240,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    category: 'main-dishes',
    badge: 'Sağlıklı',
    badgeColor: 'teal',
  },
  {
    id: 9,
    name: 'Tiramisu',
    description: 'Geleneksel İtalyan tatlısı, mascarpone peyniri ve espresso ile',
    price: 85,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'desserts',
    badge: 'İtalyan',
    badgeColor: 'grape',
  },
  {
    id: 10,
    name: 'Taze Sıkılmış Portakal Suyu',
    description: 'Günlük taze sıkılmış, doğal ve katkısız portakal suyu',
    price: 45,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'drinks',
    badge: 'Taze',
    badgeColor: 'orange',
  },
  {
    id: 11,
    name: 'Espresso',
    description: 'İtalyan usulü hazırlanmış yoğun ve aromatik espresso',
    price: 35,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'drinks',
    badge: 'İtalyan',
    badgeColor: 'dark',
  },
  {
    id: 12,
    name: 'Cheesecake',
    description: 'New York usulü klasik cheesecake, meyveli sos ile servis',
    price: 95,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'desserts',
    badge: 'Amerikan',
    badgeColor: 'pink',
  },
];

// VideoPlayer bileşeni
const VideoPlayer = ({ videoUrl, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={styles.videoContainer}>
      {isPlaying ? (
        <video
          controls
          autoPlay
          className={styles.video}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      ) : (
        <div className={styles.thumbnailContainer}>
          <Image src={thumbnail} alt="Video thumbnail" className={styles.thumbnail} />
          <ActionIcon
            size="xl"
            radius="xl"
            variant="filled"
            color="primary"
            className={styles.playButton}
            onClick={handlePlay}
          >
            <IconPlayerPlay size={24} />
          </ActionIcon>
        </div>
      )}
    </div>
  );
};

// ProductCard bileşeni
const ProductCard = ({ product, categoryColor }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <Card 
      shadow="sm" 
      p="lg" 
      radius="md" 
      withBorder 
      className={styles.productCard}
      style={{
        borderTop: `4px solid ${categoryColor.primary}`,
        backgroundColor: categoryColor.background
      }}
    >
      <Card.Section>
        {showVideo ? (
          <VideoPlayer videoUrl={product.videoUrl} thumbnail={product.image} />
        ) : (
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              height={180}
              alt={product.name}
              className={styles.productImage}
            />
            <ActionIcon
              size="lg"
              radius="xl"
              variant="filled"
              style={{ backgroundColor: categoryColor.primary }}
              className={styles.videoButton}
              onClick={() => setShowVideo(true)}
            >
              <IconPlayerPlay size={20} />
            </ActionIcon>
          </div>
        )}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} className={styles.productName} style={{ color: categoryColor.text }}>
          {product.name}
        </Text>
        <Badge color={product.badgeColor} variant="light">
          {product.badge}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" className={styles.productDescription}>
        {product.description}
      </Text>

      <Group justify="space-between" mt="md">
        <Text size="xl" fw={700} className={styles.price} style={{ color: categoryColor.primary }}>
          {product.price} ₺
        </Text>
        <Group gap={8}>
          <ActionIcon variant="default" radius="md" size="lg">
            <IconHeart size={20} color="#ff6b6b" stroke={1.5} />
          </ActionIcon>
          <Button 
            radius="md" 
            style={{ 
              flex: 1, 
              backgroundColor: categoryColor.primary,
              borderColor: categoryColor.primary
            }}
          >
            <IconShoppingCart size={20} stroke={1.5} />
            <Text ml={8}>Sepete Ekle</Text>
          </Button>
        </Group>
      </Group>
    </Card>
  );
};

export default function VideoMenu() {
  const [activeCategory, setActiveCategory] = useState('appetizers');

  const filteredProducts = products.filter(
    product => product.category === activeCategory
  );

  // Öne çıkan ürünler
  const featuredProducts = products.filter(
    product => product.badge === 'Şef Önerisi' || product.badge === 'Popüler'
  );

  const currentCategoryColor = categoryColors[activeCategory];

  return (
    <div className={styles.pageContainer}>
      <Box 
        className={styles.header}
        style={{
          background: `linear-gradient(90deg, ${currentCategoryColor.primary}, ${currentCategoryColor.secondary})`
        }}
      >
        <Container size="xl">
          <Flex align="center" gap="md">
            <Link href="/">
              <ActionIcon size="lg" variant="light" color="white" className={styles.backButton}>
                <IconArrowLeft size={20} />
              </ActionIcon>
            </Link>
            <Title className={styles.title}>Video Menü</Title>
          </Flex>
        </Container>
      </Box>

      <Container size="xl" className={styles.container}>
        {/* Öne Çıkan Ürünler Carousel */}
        <Box className={styles.featuredSection}>
          <Title order={2} mb="md" className={styles.sectionTitle}>
            Şef Önerileri
          </Title>
          <Carousel
            slideSize="33.333333%"
            slideGap="md"
            loop
            align="start"
            controlsOffset="xs"
            breakpoints={[
              { maxWidth: 'md', slideSize: '50%' },
              { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
            ]}
            className={styles.carousel}
          >
            {featuredProducts.map((product) => (
              <Carousel.Slide key={product.id}>
                <ProductCard 
                  product={product} 
                  categoryColor={categoryColors[product.category]} 
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>

        {/* Kategori Tabları */}
        <Box className={styles.menuSection}>
          <Tabs
            value={activeCategory}
            onChange={setActiveCategory}
            radius="md"
            className={styles.tabs}
          >
            <Tabs.List grow>
              {menuCategories.map((category) => (
                <Tabs.Tab
                  key={category.value}
                  value={category.value}
                  className={styles.tab}
                  style={{
                    color: activeCategory === category.value ? 'white' : category.color,
                    backgroundColor: activeCategory === category.value ? category.color : 'transparent',
                    borderColor: category.color
                  }}
                >
                  <span style={{ marginRight: '8px' }}>{category.icon}</span>
                  {category.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>

          <Grid gutter={24} className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <Grid.Col key={product.id} span={{ xs: 12, sm: 6, md: 4 }}>
                <ProductCard 
                  product={product} 
                  categoryColor={currentCategoryColor} 
                />
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
} 