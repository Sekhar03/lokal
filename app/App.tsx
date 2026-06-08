import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import FeedScreen from './src/screens/FeedScreen';
import EventsScreen from './src/screens/EventsScreen';
import EventDetailScreen from './src/screens/EventDetailScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import SocietyScreen from './src/screens/SocietyScreen';
import MarketScreen from './src/screens/MarketScreen';

export default function App() {
  const [route, setRoute] = useState<'login' | 'onboarding' | 'main'>('login');
  const [tab, setTab] = useState<'feed' | 'events' | 'groups' | 'society' | 'market'>('feed');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (phone: string) => {
    setRoute('onboarding');
  };

  const handleOnboardingComplete = (profile: any) => {
    setUser(profile);
    setRoute('main');
  };

  if (route === 'login') return <LoginScreen onLogin={handleLogin} />;
  if (route === 'onboarding') return <OnboardingScreen onComplete={handleOnboardingComplete} />;

  // Main App View (with tabs)
  if (selectedEventId) {
    return <EventDetailScreen id={selectedEventId} onBack={() => setSelectedEventId(null)} />;
  }

  const renderScreen = () => {
    switch (tab) {
      case 'feed': return <FeedScreen />;
      case 'events': return <EventsScreen onEventPress={setSelectedEventId} />;
      case 'groups': return <GroupsScreen />;
      case 'society': return <SocietyScreen />;
      case 'market': return <MarketScreen />;
      default: return <FeedScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setTab('feed')}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={[styles.tabText, tab === 'feed' && styles.tabActive]}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setTab('groups')}>
          <Text style={styles.tabIcon}>💬</Text>
          <Text style={[styles.tabText, tab === 'groups' && styles.tabActive]}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setTab('events')}>
          <Text style={styles.tabIcon}>🎟️</Text>
          <Text style={[styles.tabText, tab === 'events' && styles.tabActive]}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setTab('market')}>
          <Text style={styles.tabIcon}>🛒</Text>
          <Text style={[styles.tabText, tab === 'market' && styles.tabActive]}>Market</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setTab('society')}>
          <Text style={styles.tabIcon}>🏢</Text>
          <Text style={[styles.tabText, tab === 'society' && styles.tabActive]}>Society</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingBottom: 24, paddingTop: 12, justifyContent: 'space-around' },
  tabBtn: { alignItems: 'center' },
  tabIcon: { fontSize: 20, marginBottom: 4 },
  tabText: { fontSize: 11, color: '#9ca3af', fontWeight: '500' },
  tabActive: { color: '#E85D2B', fontWeight: 'bold' }
});
