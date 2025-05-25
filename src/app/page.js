'use client';

import { Container, Title, Text, Button, Group, Box, Flex, Grid, Card } from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Kategori renk paletleri
const categoryColors = {
  'baslangiçlar': {
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
    primary: '#00AAFF',
    secondary: '#0090E0',
    background: '#E3F2FD',
    text: '#0277BD'
  }
};

// Kategoriler
const categories = [
  {
    id: 'sef-onerileri',
    title: 'Şef Önerileri',
    description: 'Şefimizin özel seçtiği lezzetli yemekler',
    icon: '👨‍🍳',
    route: '/sef-onerileri',
    colors: categoryColors['sef-onerileri']
  },
  {
    id: 'baslangiçlar',
    title: 'Başlangıçlar',
    description: 'Taze salatalar ve mezeler',
    icon: '🥗',
    route: '/baslangiçlar',
    colors: categoryColors['baslangiçlar']
  },
  {
    id: 'ana-yemekler',
    title: 'Ana Yemekler',
    description: 'Doyurucu ve lezzetli ana yemekler',
    icon: '🍝',
    route: '/ana-yemekler',
    colors: categoryColors['ana-yemekler']
  },
  {
    id: 'tatlilar',
    title: 'Tatlılar',
    description: 'Şekerli ve eğlenceli tatlılar',
    icon: '🍰',
    route: '/tatlilar',
    colors: categoryColors['tatlilar']
  },
  {
    id: 'icecekler',
    title: 'İçecekler',
    description: 'Serinletici ve enerji verici içecekler',
    icon: '☕',
    route: '/icecekler',
    colors: categoryColors['icecekler']
  },
  {
    id: 'ai-garson',
    title: 'Yapay Zeka Garson',
    description: 'AI destekli garsonumuzla sohbet edin',
    icon: '🤖',
    route: '/ai-garson',
    colors: categoryColors['ai-garson']
  }
];

// CategoryCard bileşeni
const CategoryCard = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={category.route} style={{ textDecoration: 'none' }}>
      <Card
        className={styles.categoryCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: `linear-gradient(135deg, ${category.colors.background} 0%, ${category.colors.primary}15 100%)`,
          borderTop: `4px solid ${category.colors.primary}`,
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? `0 12px 24px ${category.colors.primary}30` 
            : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box className={styles.categoryIconContainer}>
          <Text 
            className={styles.categoryIcon}
            style={{
              backgroundColor: `${category.colors.primary}20`,
              color: category.colors.primary
            }}
          >
            {category.icon}
          </Text>
        </Box>
        
        <Title 
          order={3} 
          className={styles.categoryTitle}
          style={{ color: category.colors.text }}
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
            color: 'white'
          }}
        >
          Keşfet
        </Button>
      </Card>
    </Link>
  );
};

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundContainer}>
        <Container size="xl" className={styles.heroContainer}>
          <Box className={styles.glassPanel}>
            <Title order={1} className={styles.title} ta="center">
              Dijital Menü Deneyimi
            </Title>
            
            <Text size="xl" ta="center" mb={40} className={styles.subtitle}>
              Restoranımızın zengin menüsünü keşfedin
            </Text>
            
            <Grid gutter={24} className={styles.categoriesGrid}>
              {categories.map((category) => (
                <Grid.Col key={category.id} span={{ xs: 12, sm: 6, md: 4 }}>
                  <CategoryCard category={category} />
                </Grid.Col>
              ))}
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}
