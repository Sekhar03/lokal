import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Maha Jagran & Bhandara',
    date: '24 Aug, 6:00 PM',
    location: 'Durga Mandap, Saheed Nagar',
    organizer: 'Saheed Nagar Puja Samiti',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1604928141064-207cea6f5722?q=80&w=600&auto=format&fit=crop',
    attendees: 120
  },
  {
    id: '2',
    title: 'Free Eye Checkup Camp',
    date: '28 Aug, 10:00 AM',
    location: 'Community Center, Ward 30',
    organizer: 'Lions Club Bhubaneswar',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop',
    attendees: 45
  },
  {
    id: '3',
    title: 'Local Standup Comedy Night',
    date: '02 Sep, 8:00 PM',
    location: 'Bocca Cafe',
    organizer: 'Bhubaneswar Komedians',
    price: '₹199',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=600&auto=format&fit=crop',
    attendees: 30
  }
];

export default function EventsScreen({ onEventPress }: { onEventPress: (id: string) => void }) {
  const renderEvent = ({ item }: { item: typeof MOCK_EVENTS[0] }) => (
    <TouchableOpacity style={styles.card} onPress={() => onEventPress(item.id)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={item.price === 'Free' ? styles.priceFree : styles.pricePaid}>{item.price}</Text>
        </View>
        <Text style={styles.date}>📅 {item.date}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.organizer}>By {item.organizer}</Text>
          <Text style={styles.attendees}>{item.attendees} attending</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Local Events</Text>
        <Text style={styles.headerSubtitle}>Discover what's happening around you</Text>
      </View>
      
      <FlatList
        data={MOCK_EVENTS}
        keyExtractor={item => item.id}
        renderItem={renderEvent}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#fff', padding: 16, paddingTop: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  headerSubtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  list: { padding: 16, paddingBottom: 100 },
  card: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  image: { width: '100%', height: 160 },
  content: { padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#111827', flex: 1, marginRight: 8 },
  priceFree: { fontSize: 14, fontWeight: 'bold', color: '#22c55e' },
  pricePaid: { fontSize: 14, fontWeight: 'bold', color: '#E85D2B' },
  date: { fontSize: 14, color: '#E85D2B', fontWeight: '500', marginBottom: 4 },
  location: { fontSize: 14, color: '#4b5563', marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingTop: 12 },
  organizer: { fontSize: 12, color: '#6b7280', fontWeight: '500' },
  attendees: { fontSize: 12, color: '#111827', fontWeight: '600', backgroundColor: '#f3f4f6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }
});
