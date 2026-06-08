import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen({ onLogin }: { onLogin: (phone: string) => void }) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (phone.length === 10) setStep('otp');
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      onLogin(`+91${phone}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Lokaal</Text>
          <Text style={styles.subtitle}>Your neighbourhood, connected.</Text>
        </View>

        {step === 'phone' ? (
          <View style={styles.form}>
            <Text style={styles.label}>Enter Mobile Number</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.prefix}>+91</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                placeholder="00000 00000"
              />
            </View>
            <TouchableOpacity 
              style={[styles.button, phone.length !== 10 && styles.buttonDisabled]} 
              onPress={handleSendOtp}
              disabled={phone.length !== 10}
            >
              <Text style={styles.buttonText}>Get OTP</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>Enter 6-digit code sent to +91 {phone}</Text>
            <TextInput
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
              placeholder="------"
              textAlign="center"
            />
            <TouchableOpacity 
              style={[styles.button, otp.length !== 6 && styles.buttonDisabled]} 
              onPress={handleVerify}
              disabled={otp.length !== 6}
            >
              <Text style={styles.buttonText}>Verify & Proceed</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 40, fontWeight: 'bold', color: '#E85D2B', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6b7280', fontWeight: '500' },
  form: { width: '100%' },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, overflow: 'hidden', marginBottom: 24 },
  prefix: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#f3f4f6', color: '#6b7280', fontWeight: '600', borderRightWidth: 1, borderRightColor: '#e5e7eb' },
  input: { flex: 1, paddingHorizontal: 16, fontSize: 18, fontWeight: '600' },
  otpInput: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 16, fontSize: 24, fontWeight: 'bold', marginBottom: 24, letterSpacing: 8 },
  button: { backgroundColor: '#E85D2B', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
