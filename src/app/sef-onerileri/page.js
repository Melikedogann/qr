'use client';

import { useState } from 'react';
import { Container, Title, Text, Grid, Card, Image, Badge, Group, Button, ActionIcon, Flex, Box } from '@mantine/core';
import { IconPlayerPlay, IconArrowLeft, IconHeart, IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './page.module.css';

// Şef önerileri kategorisi renk paleti
const categoryColor = {
  primary: '#FF6B35',
  secondary: '#F7931E',
  background: '#FFF4E6',
  text: '#E65100'
};

// Şef önerileri kategorisindeki ürünler
const chefSpecials = [
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
    id: 25,
    name: 'Özel Deniz Mahsulleri',
    description: 'Şefimizin özel sosları ile hazırlanmış karides, midye ve ahtapot',
    price: 350,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    badge: 'Premium',
    badgeColor: 'blue',
  },
  {
    id: 26,
    name: 'Truffle Risotto',
    description: 'İtalyan arborio pirinç, beyaz truffle ve parmesan ile hazırlanmış özel risotto',
    price: 220,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Lüks',
    badgeColor: 'yellow',
  },
  {
    id: 27,
    name: 'Wagyu Burger',
    description: 'Wagyu eti, truffle mayonez ve özel soslarla hazırlanmış gourmet burger',
    price: 180,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Gourmet',
    badgeColor: 'grape',
  },
  {
    id: 28,
    name: 'Şef Tatlı Tabağı',
    description: 'Çeşitli mini tatlılardan oluşan şefimizin özel tatlı sunumu',
    price: 120,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&crop=center',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    badge: 'Özel Sunum',
    badgeColor: 'pink',
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

export default function SefOnerileri() {
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
                <Text style={{ fontSize: '2rem' }}>👨‍🍳</Text>
                <Title className={styles.title}>Şef Önerileri</Title>
              </Flex>
              <Text className={styles.subtitle}>Şefimizin özel seçtiği lezzetli yemekler</Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container size="xl" className={styles.container}>
        <Grid gutter={24} className={styles.productsGrid}>
          {chefSpecials.map((product) => (
            <Grid.Col key={product.id} span={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
} 