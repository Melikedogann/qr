'use client';

import { Container, Title, Text, Button, Group, Box, Flex, Grid, Card, Badge, Paper, Image, Transition } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconArrowRight, IconBrandHipchat, IconStar, IconPhone, IconMapPin, IconClock, IconEye } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './page.module.css';

// Kategori renk paletleri
const categoryColors = {
  'baslangiclar': {
    primary: '#4CAF50',
    secondary: '#FFA726',
    background: '#E8F5E8',
    text: '#2E7D32'
  },
  'ana-yemekler': {
    primary: '#8B0000',
    secondary: '#5D4037',
    background: '#FFF3E0',
    text: '#3E2723'
  },
  'tatlilar': {
    primary: '#F48FB1',
    secondary: '#A1887F',
    background: '#FFF8E1',
    text: '#4E342E'
  },
  'icecekler': {
    primary: '#81D4FA',
    secondary: '#FFEB3B',
    background: '#E3F2FD',
    text: '#1565C0'
  },
  'sef-onerileri': {
    primary: '#FF6B35',
    secondary: '#F7931E',
    background: '#FFF4E6',
    text: '#E65100'
  },
  'ai-garson': {
    primary: '#ff8a00',
    secondary: '#e65c00',
    background: '#FFF4E6',
    text: '#C34400'
  }
};

// Kategoriler
const categories = [
  {
    id: 'sef-onerileri',
    title: 'Şef Önerileri',
    description: 'Şefimizin size özel seçtiği lezzetli yemekler',
    icon: '👨‍🍳',
    route: '/sef-onerileri',
    colors: categoryColors['sef-onerileri'],
    //featured: true,
    size: 'large'
  },
  {
    id: 'baslangiclar',
    title: 'Başlangıçlar',
    description: 'Sağlıklı ve lezzetli başlangıçlar',
    icon: '🥗',
    route: '/baslangiclar',
    colors: categoryColors['baslangiclar'],
    size: 'large'
  },
  {
    id: 'ana-yemekler',
    title: 'Ana Yemekler',
    description: 'Lezzetli ve doyurucu ana yemekler',
    icon: '🍝',
    route: '/ana-yemekler',
    colors: categoryColors['ana-yemekler'],
    //featured: true,
    size: 'large'
  },
  {
    id: 'tatlilar',
    title: 'Tatlılar',
    description: 'Sütlü veya çikolatalı enfes tatlılar',
    icon: '🍰',
    route: '/tatlilar',
    colors: categoryColors['tatlilar'],
    size: 'large'
  },
  {
    id: 'icecekler',
    title: 'İçecekler',
    description: 'Serinletici ya da sıcak içecekler',
    icon: '☕',
    route: '/icecekler',
    colors: categoryColors['icecekler'],
    size: 'large'
  }
];

// CategoryCard bileşeni
const CategoryCard = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Yapay Zeka Garson için özel badge stili
  const badgeStyle = category.id === 'ai-garson' 
    ? { backgroundColor: '#ff8a00', color: 'white', fontWeight: 'bold' }
    : {};
    
  // Ekran boyutunu izleme
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <Link href={category.route} style={{ textDecoration: 'none', height: '100%' }}>
      <Card
        className={`${styles.categoryCard} ${styles[`size-${category.size}`]} ${styles[`category-${category.id}`]}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, ${category.colors.background} 0%, ${category.colors.primary}15 100%)`
            : `linear-gradient(135deg, ${category.colors.background} 0%, white 100%)`,
          borderTop: !isMobile ? `4px solid ${category.colors.primary}` : 'none',
          transform: isHovered && !isMobile ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? `0 15px 30px ${category.colors.primary}30` 
            : '0 5px 15px rgba(0, 0, 0, 0.08)'
        }}
      >
        {category.featured && (
          <Badge 
            className={styles.featuredBadge}
            color={category.colors.primary}
            variant="filled"
            radius="sm"
            leftSection={<IconStar size={isMobile ? 12 : 14} />}
            style={badgeStyle}
          >
            Öne Çıkan
          </Badge>
        )}
        
        <Box className={styles.categoryIconContainer}>
          <Text 
            className={styles.categoryIcon}
            style={{
              backgroundColor: `${category.colors.primary}20`,
              color: category.colors.primary,
              transform: isHovered && !isMobile ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            {category.icon}
          </Text>
        </Box>
        
        <Box className={styles.categoryTextContainer}>
          <Title 
            order={3} 
            className={styles.categoryTitle}
            style={{ 
              color: category.colors.text
            }}
          >
            {category.title}
          </Title>
          
          <Text 
            className={styles.categoryDescription}
            style={{ color: category.colors.text }}
          >
            {category.description}
          </Text>
          
          <Button
            className={styles.categoryButton}
            style={{
              backgroundColor: category.colors.primary,
              borderColor: category.colors.primary,
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px'
            }}
            rightSection={!isMobile && (
              <IconArrowRight 
                size={isMobile ? 14 : 16} 
                style={{ 
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)', 
                  transition: 'transform 0.3s ease'
                }} 
              />
            )}
          >
            <span style={{ 
              fontFamily: 'Segoe UI, Arial, sans-serif',
              fontSize: isMobile ? '13px' : '15px',
              fontWeight: '500',
              letterSpacing: '0.3px'
            }}>
              {isMobile ? 'İncele' : 'İncele'}
            </span>
            {isMobile && (
              <IconArrowRight 
                size={14} 
                style={{ 
                  marginLeft: '2px'
                }} 
              />
            )}
          </Button>
        </Box>
      </Card>
    </Link>
  );
};

// Yeni bileşen: Restoran Bilgileri
const RestaurantInfo = () => (
  <Box className={styles.restaurantInfo} mb={30}>
    <Group justify="center" gap="xl">
      <Group gap="xs">
        <IconMapPin size={18} color="#FF6B35" />
        <Text size="sm" c="dimmed">Bahçelievler Mah. Isparta</Text>
      </Group>
      <Group gap="xs">
        <IconPhone size={18} color="#FF6B35" />
        <Text size="sm" c="dimmed">0246 123 1234</Text>
      </Group>
      <Group gap="xs">
        <IconClock size={18} color="#FF6B35" />
        <Text size="sm" c="dimmed">09:00 - 23:00</Text>
      </Group>
    </Group>
  </Box>
);

// Güncellenmiş bileşen: Menü Keşfetme Butonları
const MenuExploreActions = () => (
  <Group justify="center" mt={20} mb={40} gap="md">
    
    <Link href="/ai-garson" style={{ textDecoration: 'none' }}>
      <Button 
        leftSection={<IconBrandHipchat size={18} />}
        variant="filled" 
        color="#ff8a00"
        size="md"
        radius="xl"
        style={{
          background: 'linear-gradient(135deg, #ff8a00 0%, #e65c00 100%)',
          boxShadow: '0 4px 15px rgba(255, 138, 0, 0.3)'
        }}
      >
        🤖 AI Garson ile Konuş
      </Button>
    </Link>
  </Group>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.backgroundContainer}>
        {/* Ana İçerik */}
        <Container size="xl" className={styles.mainContainer}>
          <Box className={styles.glassPanel}>
            
            {/* Kategori Kartları - Modern Grid */}
            <Box m={10} id="menu-categories">
              <Title order={1} className={styles.mainSectionTitle} ta="center" mb={20}>
                Menü Kategorileri
              </Title>
              
              <Text ta="center" size="xl" mb={30} className={styles.categoryIntro}>
                Restoranımızın özenle hazırlanmış menü kategorilerini keşfedin. 
                Her kategoriyi inceleyerek size en uygun lezzetleri bulabilirsiniz.
              </Text>
              
              {/* Hızlı Erişim Butonları */}
              <MenuExploreActions />
              
              <div className={styles.newCategoriesGrid}>
                {/* İlk Satır - Şef Önerileri ve Başlangıçlar */}
                <div className={styles.gridRow}>
                  <div className={`${styles.gridItem} ${styles.largeGridItem} ${styles.sefOnerilerCol}`}>
                    <CategoryCard category={categories[0]} />
                  </div>
                  <div className={`${styles.gridItem} ${styles.largeGridItem}`}>
                    <CategoryCard category={categories[1]} />
                  </div>
                </div>
                
                {/* İkinci Satır - Ana Yemekler ve Tatlılar */}
                <div className={styles.gridRow}>
                  <div className={styles.gridItem}>
                    <CategoryCard category={categories[2]} />
                  </div>
                  <div className={styles.gridItem}>
                    <CategoryCard category={categories[3]} />
                  </div>
                </div>
                
                {/* Üçüncü Satır - İçecekler */}
                <div className={styles.gridRow}>
                  <div className={`${styles.gridItem} ${styles.fullWidthGridItem}`}>
                    <CategoryCard category={categories[4]} />
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}
