import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';

const MOCK_ITEMS = [
  { id: '1', title: 'Royal Enfield Classic 350', price: '₹1,20,000', seller: 'Ramesh', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=300&auto=format&fit=crop' },
  { id: '2', title: 'Homemade Odia Pickles', price: '₹150', seller: 'Sujata', image: 'https://images.unsplash.com/photo-1627308595229-7830f5c90683?q=80&w=300&auto=format&fit=crop' },
  { id: '3', title: 'Sofa Set (3+1)', price: '₹8,500', seller: 'Priya', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop' },
  { id: '4', title: 'Guitar Classes', price: '₹1000/mo', seller: 'Dev', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=300&auto=format&fit=crop' },
];

export default function MarketScreen() {
  const renderItem = ({ item }: { item: typeof MOCK_ITEMS[0] }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.seller}>By {item.seller}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Local Market</Text>
        <Text style={styles.headerSubtitle}>Buy & sell in your neighbourhood</Text>
      </View>

      <FlatList
        data={MOCK_ITEMS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />
      
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+ Sell</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#fff', padding: 16, paddingTop: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  headerSubtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  list: { padding: 12 },
  row: { justifyContent: 'space-between' },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, width: '48%', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  image: { width: '100%', height: 120 },
  cardContent: { padding: 12 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#047857', marginBottom: 4 },
  title: { fontSize: 14, color: '#1f2937', marginBottom: 8, height: 40 },
  seller: { fontSize: 12, color: '#9ca3af' },
  fab: { position: 'absolute', bottom: 24, right: 24, backgroundColor: '#047857', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 28, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  fabText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
