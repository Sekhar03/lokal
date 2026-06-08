import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function LoginScreen({ onLogin }: { onLogin: (phone: string) => void }) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setStep('otp');
      setError('');
    }
  };

  const handleVerify = () => {
    if (otp === '123456') {
      onLogin(`+91${phone}`);
    } else {
      setError('Invalid OTP. Please use 123456');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Decorative Background Elements */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Lokaal</Text>
            <Text style={styles.subtitle}>Your neighbourhood, connected.</Text>
          </View>

          <View style={styles.card}>
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
                    onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                    placeholder="00000 00000"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
                <TouchableOpacity 
                  style={[styles.button, phone.length !== 10 && styles.buttonDisabled]} 
                  onPress={handleSendOtp}
                  disabled={phone.length !== 10}
                  activeOpacity={0.8}
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
                  onChangeText={(text) => {
                    setOtp(text.replace(/[^0-9]/g, ''));
                    setError('');
                  }}
                  placeholder="------"
                  placeholderTextColor="#d1d5db"
                  textAlign="center"
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Text style={styles.hintText}>Demo OTP: <Text style={{fontWeight: 'bold'}}>123456</Text></Text>
                <TouchableOpacity 
                  style={[styles.button, otp.length !== 6 && styles.buttonDisabled]} 
                  onPress={handleVerify}
                  disabled={otp.length !== 6}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Verify & Proceed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStep('phone')} style={styles.backButton}>
                  <Text style={styles.backButtonText}>Change Number</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', position: 'relative' },
  blob1: { position: 'absolute', top: -100, right: -50, width: 300, height: 300, borderRadius: 150, backgroundColor: '#E85D2B', opacity: 0.1 },
  blob2: { position: 'absolute', top: 200, left: -100, width: 200, height: 200, borderRadius: 100, backgroundColor: '#E85D2B', opacity: 0.05 },
  keyboardView: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 48 },
  title: { fontSize: 48, fontWeight: '900', color: '#E85D2B', marginBottom: 8, letterSpacing: -1 },
  subtitle: { fontSize: 18, color: '#4b5563', fontWeight: '500' },
  card: { backgroundColor: '#ffffff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  form: { width: '100%' },
  label: { fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 12, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', backgroundColor: '#f3f4f6', borderRadius: 16, overflow: 'hidden', marginBottom: 24, borderWidth: 1, borderColor: '#e5e7eb' },
  prefix: { paddingHorizontal: 20, paddingVertical: 18, backgroundColor: '#e5e7eb', color: '#4b5563', fontWeight: '700', fontSize: 16 },
  input: { flex: 1, paddingHorizontal: 16, fontSize: 18, fontWeight: '600', color: '#111827' },
  otpInput: { backgroundColor: '#f3f4f6', borderRadius: 16, padding: 16, fontSize: 32, fontWeight: '800', marginBottom: 12, letterSpacing: 12, borderWidth: 1, borderColor: '#e5e7eb', color: '#111827' },
  errorText: { color: '#ef4444', textAlign: 'center', marginBottom: 12, fontWeight: '500' },
  hintText: { color: '#6b7280', textAlign: 'center', marginBottom: 24, fontSize: 14 },
  button: { backgroundColor: '#E85D2B', padding: 18, borderRadius: 16, alignItems: 'center', shadowColor: '#E85D2B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  buttonDisabled: { backgroundColor: '#fca5a5', shadowOpacity: 0 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  backButton: { marginTop: 16, alignItems: 'center', padding: 8 },
  backButtonText: { color: '#6b7280', fontSize: 15, fontWeight: '600' }
});
