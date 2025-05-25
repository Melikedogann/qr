'use client';

import { useState, useRef, useEffect } from 'react';
import { Container, Title, Text, Paper, Button, TextInput, ScrollArea, Box, Flex, Avatar, ActionIcon } from '@mantine/core';
import { IconSend, IconMicrophone, IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './page.module.css';

export default function AIGarson() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Merhaba! Ben dijital garsonunuz. Size nasıl yardımcı olabilirim?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    // Kullanıcı mesajını ekle
    const newUserMessage = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInput('');

    // Yapay zeka yanıtını simüle et (gerçek projede API çağrısı yapılacak)
    setTimeout(() => {
      const aiResponses = [
        'Menümüzde çeşitli lezzetli yemeklerimiz bulunuyor. Size özel önerilerimiz var!',
        'Bugün şefimizin özel tavsiyeleri arasında mevsim balıkları ve özel soslu makarnalarımız bulunuyor.',
        'Vejetaryen seçeneklerimiz de mevcut. Sebzeli risotto ve kinoa salatamızı deneyebilirsiniz.',
        'Tatlı olarak çikolatalı suflemiz çok beğeniliyor. Yanında dondurma ile servis ediyoruz.',
        'Tabii ki, içecek menümüzde ev yapımı limonatalarımız ve özel kahvelerimiz bulunuyor.',
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const newAIMessage = {
        id: messages.length + 2,
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, newAIMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // Ses kaydı simülasyonu (gerçek projede mikrofon API'si kullanılacak)
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput('Menüde ne önerirsiniz?');
      }, 2000);
    }
  };

  return (
    <Container size="md" className={styles.container}>
      <Paper shadow="md" radius="lg" className={styles.chatContainer}>
        <Box className={styles.header}>
          <Flex align="center" gap="md">
            <Link href="/">
              <ActionIcon size="lg" variant="subtle" color="gray">
                <IconArrowLeft size={20} />
              </ActionIcon>
            </Link>
            <Title order={2}>Yapay Zeka Garson</Title>
          </Flex>
          <Text size="sm" c="dimmed">Sorularınızı sorun veya sipariş verin</Text>
        </Box>

        <ScrollArea h={500} offsetScrollbars scrollbarSize={6} className={styles.messagesContainer}>
          {messages.map((message) => (
            <Flex
              key={message.id}
              className={`${styles.message} ${message.isUser ? styles.userMessage : styles.aiMessage}`}
              gap="sm"
              align="flex-start"
            >
              {!message.isUser && (
                <Avatar color="blue" radius="xl" className={styles.avatar}>AI</Avatar>
              )}
              <Box className={styles.messageContent}>
                <Text className={styles.messageText}>{message.text}</Text>
                <Text size="xs" c="dimmed" className={styles.timestamp}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </Box>
              {message.isUser && (
                <Avatar color="teal" radius="xl" className={styles.avatar}>Siz</Avatar>
              )}
            </Flex>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <Box className={styles.inputContainer}>
          <TextInput
            placeholder="Mesajınızı yazın..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.input}
            rightSection={
              <Flex gap="xs">
                <ActionIcon 
                  color={isRecording ? "red" : "blue"} 
                  variant={isRecording ? "filled" : "subtle"} 
                  onClick={toggleRecording}
                >
                  <IconMicrophone size={20} />
                </ActionIcon>
                <ActionIcon color="blue" onClick={handleSend} disabled={input.trim() === ''}>
                  <IconSend size={20} />
                </ActionIcon>
              </Flex>
            }
          />
        </Box>
      </Paper>
    </Container>
  );
} 