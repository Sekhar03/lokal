import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

export default function SocietyScreen() {
  const notices = [
    { id: '1', title: 'Water Supply Interruption', date: '25 Aug', description: 'No water from 10 AM to 2 PM due to tank cleaning.' },
    { id: '2', title: 'Ganesh Puja Contribution', date: '22 Aug', description: 'Please submit your contribution of ₹500 to the Secretary.' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Society</Text>
        <Text style={styles.headerSubtitle}>Niladri Vihar Phase 2 RWA</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>👮</Text>
            <Text style={styles.actionLabel}>Guard Room</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>📝</Text>
            <Text style={styles.actionLabel}>Complaints</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>💸</Text>
            <Text style={styles.actionLabel}>Pay Dues</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Notice Board</Text>
        {notices.map(notice => (
          <View key={notice.id} style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <Text style={styles.noticeTitle}>{notice.title}</Text>
              <Text style={styles.noticeDate}>{notice.date}</Text>
            </View>
            <Text style={styles.noticeDesc}>{notice.description}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#1e3a8a', padding: 20, paddingTop: 30 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#bfdbfe', marginTop: 4 },
  scroll: { padding: 16 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  actionBtn: { backgroundColor: '#fff', borderRadius: 12, padding: 16, alignItems: 'center', width: '31%', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  actionIcon: { fontSize: 28, marginBottom: 8 },
  actionLabel: { fontSize: 12, fontWeight: '500', color: '#4b5563', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  noticeCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#f59e0b', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  noticeHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  noticeTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', flex: 1 },
  noticeDate: { fontSize: 12, color: '#9ca3af' },
  noticeDesc: { fontSize: 14, color: '#4b5563', lineHeight: 20 }
});
