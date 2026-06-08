import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const MOCK_GROUPS = [
  { id: '1', name: 'Saheed Nagar Residents', members: 450, type: 'Ward' },
  { id: '2', name: 'Bhubaneswar Football Club', members: 120, type: 'Interest' },
  { id: '3', name: 'Smart City Startup Network', members: 85, type: 'Professional' }
];

export default function GroupsScreen() {
  const renderGroup = ({ item }: { item: typeof MOCK_GROUPS[0] }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.type}>{item.type} • {item.members} members</Text>
      </View>
      <View style={styles.joinBtn}>
        <Text style={styles.joinText}>Join</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Local Groups</Text>
        <Text style={styles.headerSubtitle}>Connect with people who share your interests</Text>
      </View>
      <FlatList
        data={MOCK_GROUPS}
        keyExtractor={item => item.id}
        renderItem={renderGroup}
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
  list: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, padding: 16, flexDirection: 'row', alignItems: 'center' },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  type: { fontSize: 13, color: '#6b7280' },
  joinBtn: { backgroundColor: '#fef2f2', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  joinText: { color: '#E85D2B', fontWeight: 'bold', fontSize: 14 }
});
