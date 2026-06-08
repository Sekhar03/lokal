import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';

export default function EventDetailScreen({ id, onBack }: { id: string, onBack: () => void }) {
  const [rsvped, setRsvped] = useState(false);

  // Mock fetching event details
  const event = {
    id,
    title: 'Maha Jagran & Bhandara',
    date: '24 Aug, 6:00 PM',
    location: 'Durga Mandap, Saheed Nagar, Bhubaneswar, Odisha 751007',
    organizer: 'Saheed Nagar Puja Samiti',
    price: 'Free',
    description: 'Join us for the annual Maha Jagran followed by a community Bhandara. Everyone is welcome to seek blessings and partake in the prasad. Special arrangements have been made for senior citizens.',
    image: 'https://images.unsplash.com/photo-1604928141064-207cea6f5722?q=80&w=600&auto=format&fit=crop',
    attendees: 120
  };

  const handleRsvp = () => {
    // In a real app we'd call POST /api/events/:id/rsvp or trigger Razorpay
    if (event.price === 'Free') {
      setRsvped(true);
      if (typeof alert === 'function') {
        alert('RSVP Confirmed!');
      } else {
        Alert.alert('Success', 'RSVP Confirmed!');
      }
    } else {
      // Mock Razorpay
      if (typeof alert === 'function') {
        alert('Redirecting to Razorpay checkout...');
      } else {
        Alert.alert('Checkout', 'Redirecting to Razorpay checkout...');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={{ uri: event.image }} style={styles.image} />
        
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{event.price === 'Free' ? 'Free Event' : 'Ticketed'}</Text>
          </View>
          
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.organizer}>Organized by <Text style={{fontWeight:'bold'}}>{event.organizer}</Text></Text>
          
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📅</Text>
              <View>
                <Text style={styles.infoLabel}>Date & Time</Text>
                <Text style={styles.infoValue}>{event.date}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📍</Text>
              <View>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{event.location}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>About this event</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.price}>{event.price}</Text>
          <Text style={styles.attendeesText}>{event.attendees + (rsvped ? 1 : 0)} attending</Text>
        </View>
        <TouchableOpacity 
          style={[styles.button, rsvped && styles.buttonDisabled]} 
          onPress={handleRsvp}
          disabled={rsvped}
        >
          <Text style={styles.buttonText}>
            {rsvped ? 'Registered' : (event.price === 'Free' ? 'RSVP Now' : 'Buy Ticket')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  navBar: { padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6', zIndex: 10 },
  backBtn: { padding: 4 },
  backText: { fontSize: 16, color: '#E85D2B', fontWeight: 'bold' },
  scroll: { paddingBottom: 100 },
  image: { width: '100%', height: 250 },
  content: { padding: 20, marginTop: -20, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#fef2f2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginBottom: 12 },
  badgeText: { color: '#E85D2B', fontWeight: 'bold', fontSize: 12 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  organizer: { fontSize: 14, color: '#6b7280', marginBottom: 24 },
  infoBox: { backgroundColor: '#f9fafb', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 24 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoIcon: { fontSize: 24, marginRight: 16 },
  infoLabel: { fontSize: 12, color: '#6b7280', marginBottom: 2 },
  infoValue: { fontSize: 15, fontWeight: '600', color: '#111827' },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 12, marginLeft: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  description: { fontSize: 15, color: '#4b5563', lineHeight: 24 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 16, paddingBottom: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#e5e7eb', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 10 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  attendeesText: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  button: { backgroundColor: '#E85D2B', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  buttonDisabled: { backgroundColor: '#22c55e' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
