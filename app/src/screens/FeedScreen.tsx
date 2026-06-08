import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const MOCK_POSTS = [
  {
    id: '1',
    type: 'ALERT',
    author: { name: 'Ramesh Agarwal', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Ramesh' },
    content: 'Water supply will be cut off tomorrow from 10 AM to 2 PM due to pipeline maintenance. Please store water.',
    createdAt: '2 hours ago',
    likes: 12,
    comments: 4,
  },
  {
    id: '2',
    type: 'FOR_SALE',
    author: { name: 'Sunita Devi', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Sunita' },
    content: 'Selling my 2-year old wooden dining table. Good condition.',
    price: '₹4,500',
    createdAt: '5 hours ago',
    likes: 3,
    comments: 1,
  }
];

export default function FeedScreen() {
  const renderPost = ({ item }: { item: typeof MOCK_POSTS[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.authorRow}>
          <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.authorName}>{item.author.name}</Text>
            <Text style={styles.timestamp}>{item.createdAt}</Text>
          </View>
        </View>
        <View style={[styles.badge, item.type === 'ALERT' ? styles.badgeRed : styles.badgeGreen]}>
          <Text style={styles.badgeText}>{item.type.replace('_', ' ')}</Text>
        </View>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      {item.price && <Text style={styles.price}>{item.price}</Text>}
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>🤍 {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>💬 {item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>🔗 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Lokaal</Text>
          <Text style={styles.headerSubtitle}>📍 Saheed Nagar</Text>
        </View>
      </View>
      
      <View style={styles.alertBanner}>
        <Text style={styles.alertTitle}>🔔 Dengue Alert</Text>
        <Text style={styles.alertBody}>Municipal corporation is fogging the ward today.</Text>
      </View>

      <FlatList
        data={MOCK_POSTS}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#fff', padding: 16, paddingTop: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
  headerSubtitle: { fontSize: 13, color: '#6b7280', marginTop: 2, fontWeight: '500' },
  alertBanner: { margin: 16, backgroundColor: '#fef2f2', borderColor: '#fee2e2', borderWidth: 1, borderRadius: 12, padding: 12 },
  alertTitle: { color: '#b91c1c', fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  alertBody: { color: '#dc2626', fontSize: 13 },
  list: { padding: 16, paddingTop: 0, paddingBottom: 100 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  authorRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f3f4f6', marginRight: 12 },
  authorName: { fontWeight: 'bold', fontSize: 15, color: '#111827' },
  timestamp: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeRed: { backgroundColor: '#ef4444' },
  badgeGreen: { backgroundColor: '#22c55e' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  content: { fontSize: 15, color: '#374151', lineHeight: 22, marginBottom: 12 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#E85D2B', marginBottom: 12 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingTop: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontSize: 14, color: '#6b7280', fontWeight: '500' },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#E85D2B', justifyContent: 'center', alignItems: 'center', shadowColor: '#E85D2B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  fabIcon: { color: '#fff', fontSize: 32, fontWeight: '300', marginTop: -4 }
});
