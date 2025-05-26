'use client';

import { useState } from 'react';
import { Container, Title, Text, Grid, Card, Image, Badge, Group, Box, Flex } from '@mantine/core';
import { IconPlayerPlay, IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './page.module.css';
import Navbar from '../components/Navbar';

// İçecekler kategorisi renk paleti - daha canlı renkler
const categoryColor = {
  primary: '#FF4081',
  secondary: '#00E5FF',
  background: '#F5F5F5',
  text: '#6200EA'
};

// İçecekler kategorisindeki ürünler
const drinks = [
  {
    id: 4,
    name: 'Mevsim Meyveleri Kokteyli',
    description: 'Çeşitli mevsim meyveleriyle hazırlanmış ferahlatıcı kokteyl',
    price: 75,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Alkolsüz',
    badgeColor: 'blue',
    gifUrl: 'https://media.giphy.com/media/l41m1FOKcpTAa2UVi/giphy.gif'
  },
  {
    id: 10,
    name: 'Taze Sıkılmış Portakal Suyu',
    description: 'Günlük taze sıkılmış, doğal ve katkısız portakal suyu',
    price: 45,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Taze',
    badgeColor: 'orange',
    gifUrl: 'https://media.giphy.com/media/3o7TKMhxSftmZnNkqc/giphy.gif'
  },
  {
    id: 11,
    name: 'Espresso',
    description: 'İtalyan usulü hazırlanmış yoğun ve aromatik espresso',
    price: 35,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'İtalyan',
    badgeColor: 'dark',
    gifUrl: 'https://media.giphy.com/media/3jVT4U5bilspG/giphy.gif'
  },
  {
    id: 22,
    name: 'Cappuccino',
    description: 'Espresso, sıcak süt ve süt köpüğü ile hazırlanmış klasik İtalyan kahvesi',
    price: 45,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Klasik',
    badgeColor: 'brown',
    gifUrl: 'https://media.giphy.com/media/3jVT4U5bilspG/giphy.gif'
  },
  {
    id: 23,
    name: 'Limonata',
    description: 'Taze limon, nane ve soda ile hazırlanmış serinletici limonata',
    price: 35,
    image: 'https://images.unsplash.com/photo-1523371683702-1c2eb0d8b4b6?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Serinletici',
    badgeColor: 'lime',
    gifUrl: 'https://media.giphy.com/media/xT0xeQblBQZJEmf8oE/giphy.gif'
  },
  {
    id: 24,
    name: 'Çay Çeşitleri',
    description: 'Türk çayı, yeşil çay, bitki çayları ve özel karışımlar',
    price: 25,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Geleneksel',
    badgeColor: 'green',
    gifUrl: 'https://media.giphy.com/media/3o7TKyPpWvFrpwua2I/giphy.gif'
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
          <div
            className={styles.playButton}
            onClick={handlePlay}
          >
            <IconPlayerPlay size={24} />
          </div>
        </div>
      )}
    </div>
  );
};

// ProductCard bileşeni - yeniden düzenlenmiş
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
              height={160} // Görsel boyutu küçültüldü
              alt={product.name}
              className={styles.productImage}
            />
            <div
              className={styles.videoButton}
              onClick={() => setShowVideo(true)}
            >
              <IconPlayerPlay size={18} />
            </div>
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

      <Text size="xl" fw={700} className={styles.price} style={{ color: categoryColor.primary }}>
        {product.price} ₺
      </Text>
    </Card>
  );
};

export default function Icecekler() {
  return (
    <div className={styles.pageContainer}>
      <Navbar 
        title="İçecekler" 
        categoryColors={categoryColor} 
        styles={styles} 
      />

      <Container size="xl" className={styles.container}>
        <Grid gutter={24} className={styles.productsGrid}>
          {drinks.map((product) => (
            <Grid.Col key={product.id} span={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
} 