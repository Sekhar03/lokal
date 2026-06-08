import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

type Role = 'user' | 'new' | 'admin' | null;

export default function LoginScreen({ onLogin }: { onLogin: (identifier: string) => void }) {
  const [role, setRole] = useState<Role>(null);
  
  // Form States
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (role === 'new' && (!name.trim() || phone.length !== 10)) {
      setError('Please enter a valid name and phone number.');
      return;
    }
    if (role === 'user' && phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setStep('otp');
    setError('');
  };

  const handleAdminLogin = () => {
    if (email === 'admin@lokaal.com' && password === 'admin123') {
      onLogin(email);
    } else {
      setError('Invalid Admin credentials. Try admin@lokaal.com / admin123');
    }
  };

  const handleVerify = () => {
    if (otp === '123456') {
      onLogin(`+91${phone}`);
    } else {
      setError('Invalid OTP. Please use 123456');
    }
  };

  const resetState = () => {
    setRole(null);
    setStep('details');
    setError('');
    setOtp('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Rich Background with Demo Feeds styling */}
      <View style={styles.backgroundContainer}>
        {/* Animated gradient or rich colored blobs */}
        <View style={styles.bgBlob1} />
        <View style={styles.bgBlob2} />
        <View style={styles.bgBlob3} />
        
        {/* Overlaying pattern or demo cards simulating a feed in the background */}
        <View style={styles.demoFeedContainer}>
           <View style={[styles.demoCard, { top: '10%', left: '-10%', opacity: 0.3, transform: [{ rotate: '-15deg' }] }]}><Text style={styles.demoCardText}>🏠 3 BHK for Rent</Text></View>
           <View style={[styles.demoCard, { top: '30%', right: '-5%', opacity: 0.4, transform: [{ rotate: '10deg' }] }]}><Text style={styles.demoCardText}>🎟️ Yoga at Park</Text></View>
           <View style={[styles.demoCard, { top: '60%', left: '5%', opacity: 0.2, transform: [{ rotate: '-5deg' }] }]}><Text style={styles.demoCardText}>💬 Community Poll</Text></View>
           <View style={[styles.demoCard, { bottom: '10%', right: '10%', opacity: 0.3, transform: [{ rotate: '15deg' }] }]}><Text style={styles.demoCardText}>🛒 Selling Sofa</Text></View>
        </View>
        
        {/* Dark overlay to make glassmorphism pop */}
        <View style={styles.overlay} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <Text style={styles.logoText}>Lokaal</Text>
            <Text style={styles.tagline}>Your neighbourhood, re-imagined.</Text>
          </View>

          <View style={styles.glassCard}>
            {!role ? (
              <View style={styles.roleSelection}>
                <Text style={styles.welcomeText}>Welcome to the Community</Text>
                <Text style={styles.subWelcomeText}>How would you like to continue?</Text>
                
                <TouchableOpacity style={styles.roleButtonPrimary} onPress={() => setRole('new')} activeOpacity={0.8}>
                  <Text style={styles.roleButtonIcon}>✨</Text>
                  <View>
                    <Text style={styles.roleButtonTitlePrimary}>Join as New User</Text>
                    <Text style={styles.roleButtonDescPrimary}>Create an account and connect</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.roleButtonSecondary} onPress={() => setRole('user')} activeOpacity={0.8}>
                  <Text style={styles.roleButtonIcon}>👋</Text>
                  <View>
                    <Text style={styles.roleButtonTitleSecondary}>Existing User Login</Text>
                    <Text style={styles.roleButtonDescSecondary}>Access your community feed</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.roleButtonOutline} onPress={() => setRole('admin')} activeOpacity={0.8}>
                  <Text style={styles.roleButtonIcon}>🛡️</Text>
                  <View>
                    <Text style={styles.roleButtonTitleOutline}>Admin Portal</Text>
                    <Text style={styles.roleButtonDescOutline}>Manage society & events</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.formContainer}>
                {/* Back Button */}
                <TouchableOpacity onPress={resetState} style={styles.backButton}>
                  <Text style={styles.backButtonText}>← Back to options</Text>
                </TouchableOpacity>

                {role === 'admin' ? (
                  // Admin Login Flow
                  <View>
                    <Text style={styles.formTitle}>Admin Login</Text>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Email Address</Text>
                      <TextInput style={styles.textInput} value={email} onChangeText={(t) => {setEmail(t); setError('');}} placeholder="admin@lokaal.com" placeholderTextColor="#9ca3af" autoCapitalize="none" keyboardType="email-address" />
                    </View>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Password</Text>
                      <TextInput style={styles.textInput} value={password} onChangeText={(t) => {setPassword(t); setError('');}} placeholder="••••••••" placeholderTextColor="#9ca3af" secureTextEntry />
                    </View>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    <TouchableOpacity style={styles.submitButton} onPress={handleAdminLogin} activeOpacity={0.8}>
                      <Text style={styles.submitButtonText}>Secure Login</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  // User / New User Flow
                  <View>
                    <Text style={styles.formTitle}>{role === 'new' ? 'Create Account' : 'Welcome Back'}</Text>
                    
                    {step === 'details' ? (
                      <View>
                        {role === 'new' && (
                          <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <TextInput style={styles.textInput} value={name} onChangeText={(t) => {setName(t); setError('');}} placeholder="John Doe" placeholderTextColor="#9ca3af" />
                          </View>
                        )}
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Mobile Number</Text>
                          <View style={styles.phoneInputContainer}>
                            <Text style={styles.phonePrefix}>+91</Text>
                            <TextInput style={styles.phoneInput} value={phone} onChangeText={(t) => {setPhone(t.replace(/[^0-9]/g, '')); setError('');}} placeholder="00000 00000" placeholderTextColor="#9ca3af" keyboardType="numeric" maxLength={10} />
                          </View>
                        </View>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <TouchableOpacity style={[styles.submitButton, (!phone || phone.length !== 10) && styles.submitButtonDisabled]} onPress={handleSendOtp} disabled={!phone || phone.length !== 10} activeOpacity={0.8}>
                          <Text style={styles.submitButtonText}>Send OTP</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <Text style={styles.inputLabel}>Enter 6-digit code sent to +91 {phone}</Text>
                        <TextInput style={styles.otpInput} value={otp} onChangeText={(t) => {setOtp(t.replace(/[^0-9]/g, '')); setError('');}} placeholder="------" placeholderTextColor="#d1d5db" keyboardType="numeric" maxLength={6} textAlign="center" />
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <Text style={styles.hintText}>Demo OTP: <Text style={{fontWeight: 'bold', color: '#111827'}}>123456</Text></Text>
                        <TouchableOpacity style={[styles.submitButton, otp.length !== 6 && styles.submitButtonDisabled]} onPress={handleVerify} disabled={otp.length !== 6} activeOpacity={0.8}>
                          <Text style={styles.submitButtonText}>Verify & Proceed</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  backgroundContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  bgBlob1: { position: 'absolute', top: -150, right: -100, width: 400, height: 400, borderRadius: 200, backgroundColor: '#E85D2B', opacity: 0.4 },
  bgBlob2: { position: 'absolute', bottom: -100, left: -100, width: 350, height: 350, borderRadius: 175, backgroundColor: '#8B5CF6', opacity: 0.3 },
  bgBlob3: { position: 'absolute', top: height * 0.4, left: width * 0.2, width: 300, height: 300, borderRadius: 150, backgroundColor: '#3B82F6', opacity: 0.2 },
  demoFeedContainer: { ...StyleSheet.absoluteFillObject },
  demoCard: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  demoCardText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(17, 24, 39, 0.6)' },
  
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  
  header: { alignItems: 'center', marginBottom: 40, marginTop: 40 },
  logoText: { fontSize: 56, fontWeight: '900', color: '#ffffff', letterSpacing: -2, textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 10 },
  tagline: { fontSize: 18, color: '#d1d5db', fontWeight: '500', marginTop: 8 },
  
  glassCard: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: 28, padding: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 30, elevation: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' },
  
  roleSelection: { width: '100%' },
  welcomeText: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 4, textAlign: 'center' },
  subWelcomeText: { fontSize: 15, color: '#6b7280', marginBottom: 32, textAlign: 'center', fontWeight: '500' },
  
  roleButtonPrimary: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E85D2B', padding: 20, borderRadius: 20, marginBottom: 16, shadowColor: '#E85D2B', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 },
  roleButtonTitlePrimary: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  roleButtonDescPrimary: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
  
  roleButtonSecondary: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', padding: 20, borderRadius: 20, marginBottom: 16 },
  roleButtonTitleSecondary: { color: '#111827', fontSize: 18, fontWeight: 'bold' },
  roleButtonDescSecondary: { color: '#6b7280', fontSize: 13, marginTop: 2 },
  
  roleButtonOutline: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', borderWidth: 2, borderColor: '#e5e7eb', padding: 20, borderRadius: 20 },
  roleButtonTitleOutline: { color: '#374151', fontSize: 18, fontWeight: 'bold' },
  roleButtonDescOutline: { color: '#9ca3af', fontSize: 13, marginTop: 2 },
  
  roleButtonIcon: { fontSize: 32, marginRight: 16 },
  
  formContainer: { width: '100%' },
  backButton: { marginBottom: 24, alignSelf: 'flex-start' },
  backButtonText: { color: '#6b7280', fontSize: 15, fontWeight: '600' },
  formTitle: { fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 24 },
  
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 8 },
  textInput: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 16, padding: 16, fontSize: 16, color: '#111827', fontWeight: '500' },
  
  phoneInputContainer: { flexDirection: 'row', backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 16, overflow: 'hidden' },
  phonePrefix: { paddingHorizontal: 20, paddingVertical: 18, backgroundColor: '#f3f4f6', color: '#4b5563', fontWeight: '700', fontSize: 16, borderRightWidth: 1, borderRightColor: '#e5e7eb' },
  phoneInput: { flex: 1, paddingHorizontal: 16, fontSize: 18, fontWeight: '600', color: '#111827' },
  
  otpInput: { backgroundColor: '#f9fafb', borderRadius: 16, padding: 16, fontSize: 32, fontWeight: '800', marginBottom: 16, letterSpacing: 12, borderWidth: 1, borderColor: '#e5e7eb', color: '#111827' },
  
  errorText: { color: '#ef4444', marginBottom: 16, fontWeight: '500', fontSize: 14 },
  hintText: { color: '#6b7280', marginBottom: 24, fontSize: 14, textAlign: 'center' },
  
  submitButton: { backgroundColor: '#111827', padding: 20, borderRadius: 16, alignItems: 'center', marginTop: 8 },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
