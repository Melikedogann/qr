'use client';

import { useState } from 'react';
import { Container, Title, Text, Grid, Card, Image, Badge, Group, Button, ActionIcon, Flex, Box } from '@mantine/core';
import { IconPlayerPlay, IconArrowLeft, IconHeart, IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './page.module.css';

// Ana yemekler kategorisi renk paleti
const categoryColor = {
  primary: '#8B0000',
  secondary: '#5D4037',
  background: '#FFF3E0',
  text: '#3E2723'
};

// Ana yemekler kategorisindeki ürünler
const mainDishes = [
  {
    id: 2,
    name: 'Bonfile Steak',
    description: 'Özel sos ve mevsim sebzeleri ile servis edilen Marine edilmiş dana bonfile',
    price: 280,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    badge: 'Şef Önerisi',
    badgeColor: 'red',
  },
  {
    id: 5,
    name: 'Karışık Izgara',
    description: 'Dana bonfile, kuzu pirzola ve tavuk göğsünden oluşan özel ızgara tabağı',
    price: 320,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
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
    badge: 'Vejetaryen',
    badgeColor: 'green',
  },
  {
    id: 8,
    name: 'Somon Teriyaki',
    description: 'Teriyaki soslu ızgara somon, jasmin pilavı ve wok sebzeleri ile',
    price: 240,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    badge: 'Sağlıklı',
    badgeColor: 'teal',
  },
  {
    id: 20,
    name: 'Kuzu Tandır',
    description: 'Geleneksel tandırda pişirilmiş kuzu eti, pilav ve cacık ile',
    price: 260,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    badge: 'Geleneksel',
    badgeColor: 'brown',
  },
  {
    id: 21,
    name: 'Tavuk Cordon Bleu',
    description: 'Jambon ve kaşar peyniri dolgulu tavuk göğsü, patates püresi ile',
    price: 180,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Fransız',
    badgeColor: 'blue',
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

export default function AnaYemekler() {
  return (
    <div className={styles.pageContainer}>
      <Box 
        className={styles.header}
        style={{
          background: `linear-gradient(90deg, ${categoryColor.primary}, ${categoryColor.secondary})`
        }}
      >
        <Container size="xl">
          <Flex align="center" gap="md">
            <Link href="/">
              <ActionIcon size="lg" variant="light" color="white" className={styles.backButton}>
                <IconArrowLeft size={20} />
              </ActionIcon>
            </Link>
            <Box>
              <Flex align="center" gap="md">
                <Text style={{ fontSize: '2rem' }}>🍝</Text>
                <Title className={styles.title}>Ana Yemekler</Title>
              </Flex>
              <Text className={styles.subtitle}>Doyurucu ve lezzetli ana yemekler</Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container size="xl" className={styles.container}>
        <Grid gutter={24} className={styles.productsGrid}>
          {mainDishes.map((product) => (
            <Grid.Col key={product.id} span={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
} 