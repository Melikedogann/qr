'use client';

import { Box, Container, Title, Flex } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Kategori ikon ve başlık eşleştirmeleri
const categoryIcons = {
  'Ana Yemekler': { icon: '🍝', emoji: true },
  'Başlangıçlar': { icon: '🥗', emoji: true },
  'İçecekler': { icon: '', emoji: false }, // İçecekler için emoji kaldırıldı
  'Tatlılar': { icon: '🍰', emoji: true },
};

// Her kategori için özel navbar animasyonları
const categoryAnimations = {
  'Ana Yemekler': (styles) => ({
    background: 'linear-gradient(45deg, #8B0000, #5D4037)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  }),
  'Başlangıçlar': (styles) => ({
    background: 'linear-gradient(45deg, #4CAF50, #FFA726)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  }),
  'İçecekler': (styles) => ({
    background: '#111',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  }),
  'Tatlılar': (styles) => ({
    background: 'linear-gradient(45deg, #F48FB1, #A1887F)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  }),
};

const Navbar = ({ title, categoryColors, styles }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Scroll pozisyonunu takip eden efekt
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kategori başlığına göre navbar stillerini belirle
  const getNavbarStyle = () => {
    if (categoryAnimations[title]) {
      return categoryAnimations[title](styles);
    }
    // Varsayılan stil
    return {
      background: `linear-gradient(90deg, ${categoryColors.primary}, ${categoryColors.secondary})`,
    };
  };

  // İçecekler için özel rainbow efekti
  const renderRainbowEffect = () => {
    if (title === 'İçecekler') {
      return <div className={styles.rainbowNavbar}></div>;
    }
    return null;
  };

  // Kategori başlığı için özel stil
  const getTitleStyle = () => {
    if (title === 'İçecekler') {
      return {
        fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
        letterSpacing: '3px',
        textTransform: 'uppercase',
      };
    }
    
    if (title === 'Tatlılar') {
      return {
        fontFamily: 'Brush Script MT, cursive',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
      };
    }
    
    if (title === 'Ana Yemekler') {
      return {
        fontFamily: 'Georgia, serif',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      };
    }
    
    if (title === 'Başlangıçlar') {
      return {
        fontFamily: 'Verdana, sans-serif',
        textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
      };
    }
    
    return {};
  };

  return (
    <Box className={styles.header} style={getNavbarStyle()}>
      {renderRainbowEffect()}
      <Container size="xl">
        <Flex align="center" justify="center" gap="md">
          <Link href="/" style={{ position: 'absolute', left: '20px' }}>
            <div className={styles.backButton}>
              <IconArrowLeft size={20} />
            </div>
          </Link>
          <Box>
            <Flex align="center" gap="md">
              {categoryIcons[title]?.emoji && (
                <span style={{ fontSize: '2rem' }}>{categoryIcons[title].icon}</span>
              )}
              <Title className={styles.title} style={getTitleStyle()}>
                {title}
              </Title>
            </Flex>
            {title !== 'İçecekler' && (
              <div className={styles.subtitle}>
                {title === 'Ana Yemekler' && 'Doyurucu ve lezzetli ana yemekler'}
                {title === 'Başlangıçlar' && 'Hafif ve iştah açıcı başlangıçlar'}
                {title === 'Tatlılar' && 'Tatlı bir son için lezzetli seçenekler'}
              </div>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar; 