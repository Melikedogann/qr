'use client';

import { useState } from 'react';
import { Container, Text, Grid, Card, Image, Badge, Group, Button, ActionIcon, Box } from '@mantine/core';
import { IconPlayerPlay, IconHeart, IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './page.module.css';
import Navbar from '../components/Navbar';

// Tatlılar kategorisi renk paleti
const categoryColor = {
  primary: '#F48FB1',
  secondary: '#A1887F',
  background: '#FFF8E1',
  text: '#4E342E'
};

// Tatlılar kategorisindeki ürünler
const desserts = [
  {
    id: 3,
    name: 'Çikolatalı Sufle',
    description: 'Sıcak çikolata dolgulu ve vanilya dondurması ile servis edilen sufle',
    price: 95,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Popüler',
    badgeColor: 'pink',
  },
  {
    id: 9,
    name: 'Tiramisu',
    description: 'Geleneksel İtalyan tatlısı, mascarpone peyniri ve espresso ile',
    price: 85,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'İtalyan',
    badgeColor: 'grape',
  },
  {
    id: 12,
    name: 'Cheesecake',
    description: 'New York usulü klasik cheesecake, meyveli sos ile servis',
    price: 95,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Amerikan',
    badgeColor: 'pink',
  },
  {
    id: 13,
    name: 'Crème Brûlée',
    description: 'Fransız usulü karamelize şekerli vanilya kreması',
    price: 110,
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Fransız',
    badgeColor: 'yellow',
  },
  {
    id: 14,
    name: 'Çikolatalı Lava Kek',
    description: 'İçinden sıcak çikolata akan özel kek, vanilya dondurması ile',
    price: 105,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Sıcak',
    badgeColor: 'red',
  },
  {
    id: 15,
    name: 'Meyve Tart',
    description: 'Mevsim meyveli taze tart, krema patissiere ile',
    price: 85,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Mevsimlik',
    badgeColor: 'green',
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
          {/*<ActionIcon variant="default" radius="md" size="lg">
            <IconHeart size={20} color="#ff6b6b" stroke={1.5} />
          </ActionIcon>*/}
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

export default function Tatlilar() {
  return (
    <div className={styles.pageContainer}>
      <Navbar 
        title="Tatlılar" 
        categoryColors={categoryColor} 
        styles={styles} 
      />

      <Container size="xl" className={styles.container}>
        <Grid gutter={24} className={styles.productsGrid}>
          {desserts.map((product) => (
            <Grid.Col key={product.id} span={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
} 