'use client';

import { useState } from 'react';
import { Container, Text, Grid, Card, Image, Badge, Group, Button, ActionIcon, Box } from '@mantine/core';
import { IconPlayerPlay, IconHeart, IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './page.module.css';
import Navbar from '../components/Navbar';

// Başlangıçlar kategorisi renk paleti
const categoryColor = {
  primary: '#4CAF50',
  secondary: '#FFA726',
  background: '#E8F5E8',
  text: '#2E7D32'
};

// Başlangıçlar kategorisindeki ürünler
const appetizers = [
  {
    id: 1,
    name: 'Akdeniz Salatası',
    description: 'Taze domates, salatalık, biber, zeytin ve beyaz peynir ile hazırlanmış klasik Akdeniz salatası',
    price: 85,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
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
    badge: 'Klasik',
    badgeColor: 'green',
  },
  {
    id: 16,
    name: 'Mezze Tabağı',
    description: 'Humus, babaganuş, ezme ve zeytinyağlılardan oluşan özel mezze tabağı',
    price: 95,
    image: 'https://images.unsplash.com/photo-1544510808-0c8e5c2b8b7e?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Özel',
    badgeColor: 'orange',
  },
  {
    id: 17,
    name: 'Avokado Toast',
    description: 'Ekşi mayalı ekmek üzerinde ezilmiş avokado, cherry domates ve feta peyniri',
    price: 65,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Trend',
    badgeColor: 'lime',
  },
  {
    id: 18,
    name: 'Bruschetta',
    description: 'İtalyan ekmeği üzerinde domates, fesleğen ve mozzarella peyniri',
    price: 55,
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'İtalyan',
    badgeColor: 'red',
  },
  {
    id: 19,
    name: 'Çorba Çeşitleri',
    description: 'Günün çorbası - mercimek, domates veya sebze çorbası seçenekleri',
    price: 35,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Sıcak',
    badgeColor: 'orange',
  }
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
            style={{ backgroundColor: categoryColor.primary }}
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
const ProductCard = ({ product }) => {
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
            <div className={styles.specialImageContainer}>
              <img 
                src="/vecteezy_plate-of-salad-transparent_52325215.png"
                alt={product.name}
                className={styles.rotatingPlateImage}
              />
            </div>
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

export default function Baslangiclar() {
  return (
    <div className={styles.pageContainer}>
      <Navbar 
        title="Başlangıçlar" 
        categoryColors={categoryColor} 
        styles={styles} 
      />

      <Container size="xl" className={styles.container}>
        <Grid gutter={24} className={styles.productsGrid}>
          {appetizers.map((product) => (
            <Grid.Col key={product.id} span={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
} 