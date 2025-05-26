'use client';

import { Box, Container, Title, Flex, Text } from '@mantine/core';
import { IconArrowLeft, IconGlass } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Kategori ikon ve başlık eşleştirmeleri
const categoryIcons = {
  'Ana Yemekler': { icon: '🍝', emoji: true },
  'Başlangıçlar': { icon: '🥗', emoji: true },
  'İçecekler': { icon: <IconGlass size={24} />, emoji: false }, // İçecekler için ikon eklendi
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
    background: 'linear-gradient(45deg, #0077b6, #48cae4)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
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

  // Kategori başlığı için özel stil
  const getTitleStyle = () => {
    if (title === 'İçecekler') {
      return {
        fontFamily: 'Verdana, sans-serif',
        textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
      };
    }
    
    if (title === 'Tatlılar') {
      return {
        fontFamily: 'Verdana, sans-serif',
        textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
      };
    }
    
    if (title === 'Ana Yemekler') {
      return {
        fontFamily: 'Verdana, sans-serif',
        textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
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

  // İçecekler için açıklama
  const getSubtitleText = () => {
    if (title === 'Ana Yemekler') return 'Doyurucu ve lezzetli ana yemekler';
    if (title === 'Başlangıçlar') return 'Hafif ve iştah açıcı başlangıçlar';
    if (title === 'Tatlılar') return 'Tatlı bir son için lezzetli seçenekler';
    if (title === 'İçecekler') return 'Ferahlatıcı içecekler ve özel karışımlar';
    return '';
  };

  return (
    <Box className={styles.header} style={getNavbarStyle()}>
      <Container size="xl">
        <Flex align="center" justify="center" gap="md">
          <Link href="/" style={{ position: 'absolute', left: '20px' }}>
            <div className={styles.backButton}>
              <IconArrowLeft size={20} />
            </div>
          </Link>
          <Box>
            <Flex align="center" gap="md" justify="center">
              {categoryIcons[title]?.emoji ? (
                <span style={{ fontSize: '2rem' }}>{categoryIcons[title].icon}</span>
              ) : (
                categoryIcons[title]?.icon && (
                  <Box style={{ color: 'white' }}>{categoryIcons[title].icon}</Box>
                )
              )}
              <Title className={styles.title} style={getTitleStyle()}>
                {title}
              </Title>
            </Flex>
            <Text className={styles.subtitle} align="center">
              {getSubtitleText()}
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar; 