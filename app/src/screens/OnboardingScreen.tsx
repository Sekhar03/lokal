import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

export default function OnboardingScreen({ onComplete }: { onComplete: (profile: any) => void }) {
  const [step, setStep] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [ward, setWard] = useState('');
  const [name, setName] = useState('');
  const [flat, setFlat] = useState('');

  const handleNext = () => {
    if (step === 1 && pinCode.length === 6) {
      setStep(2);
    } else if (step === 2 && name.length >= 2) {
      onComplete({ name, pinCode, ward, flatNumber: flat });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressSegment, step >= 1 && styles.progressActive]} />
          <View style={[styles.progressSegment, step >= 2 && styles.progressActive]} />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>{step === 1 ? 'Where do you live?' : 'Set up your profile'}</Text>
          <Text style={styles.subtitle}>
            {step === 1 
              ? 'We need this to show you updates from your neighbourhood.'
              : 'Help your neighbours recognise you.'}
          </Text>
        </View>

        {step === 1 ? (
          <View style={styles.form}>
            <Text style={styles.label}>PIN Code</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={6}
              value={pinCode}
              onChangeText={setPinCode}
              placeholder="e.g. 751001"
            />
            {pinCode.length === 6 && (
              <View style={{ marginTop: 24 }}>
                <Text style={styles.label}>Ward / Locality Name</Text>
                <TextInput
                  style={styles.input}
                  value={ward}
                  onChangeText={setWard}
                  placeholder="e.g. Saheed Nagar"
                />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
            <View style={{ marginTop: 24 }}>
              <Text style={styles.label}>Flat / House Number (Optional)</Text>
              <TextInput
                style={styles.input}
                value={flat}
                onChangeText={setFlat}
                placeholder="Helps if you join a society"
              />
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              ((step === 1 && pinCode.length !== 6) || (step === 2 && name.length < 2)) && styles.buttonDisabled
            ]} 
            onPress={handleNext}
            disabled={(step === 1 && pinCode.length !== 6) || (step === 2 && name.length < 2)}
          >
            <Text style={styles.buttonText}>{step === 1 ? 'Continue' : 'Complete Setup'}</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 24 },
  progressBar: { flexDirection: 'row', gap: 8, marginBottom: 32, marginTop: 16 },
  progressSegment: { flex: 1, height: 6, backgroundColor: '#f3f4f6', borderRadius: 3 },
  progressActive: { backgroundColor: '#E85D2B' },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6b7280' },
  form: { flex: 1 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 16, fontSize: 16, fontWeight: '500' },
  footer: { marginTop: 'auto', paddingTop: 24 },
  button: { backgroundColor: '#E85D2B', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
