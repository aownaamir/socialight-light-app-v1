import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  Switch,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/index';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Ssiiggnn = ({ navigation }) => {
  const [isPersonalInfo, setIsPersonalInfo] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [additionalPhotos, setAdditionalPhotos] = useState([null, null, null]);

  const handleProfilePhotoUpload = () => {
    // Implement photo upload functionality
    // console.log("Upload profile photo");
    // This would normally connect to image picker
    setProfilePhoto({ uri: 'https://example.com/temp-photo.jpg' });
  };

  const handleAdditionalPhotoUpload = (index) => {
    // Implement additional photo upload functionality
    // console.log(`Upload additional photo at index ${index}`);
    // This would normally connect to image picker
    const newPhotos = [...additionalPhotos];
    newPhotos[index] = { uri: 'https://example.com/temp-photo.jpg' };
    setAdditionalPhotos(newPhotos);
  };

  const isCompleteButtonEnabled = profilePhoto !== null;

  const renderAccountInfoContent = () => (
    <>
      {/* Phone number input */}
      <View style={styles.inputContainer}>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+382</Text>
          <View style={styles.phoneInputDivider} />
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone number"
            placeholderTextColor="#9E9E9E"
            keyboardType="phone-pad"
          />
        </View>
        <Text style={styles.inputHint}>Why we need your phone number?</Text>
        {/* <Text style={styles.inputError}>The phone number is incorrect</Text> */}
        
        <Text style={styles.sectionTitle}>Only Enter your handles</Text>
        
        <View style={styles.socialInputContainer}>
          <TextInput
            style={styles.socialInput}
            placeholder="Add your Instagram*"
            placeholderTextColor="#9E9E9E"
          />
        </View>
        <Text style={styles.inputError}>Something wrong with username</Text>

        
        <View style={styles.socialInputContainer}>
          <TextInput
            style={styles.socialInput}
            placeholder="Add your Facebook (optional)"
            placeholderTextColor="#9E9E9E"
          />
        </View>
        {/* <Text style={styles.inputError}>The phone number is incorrect</Text> */}

        
        <View style={styles.socialInputContainer}>
          <TextInput
            style={styles.socialInput}
            placeholder="Add your TikTok (optional)"
            placeholderTextColor="#9E9E9E"
          />
        </View>
        {/* <Text style={styles.inputError}>The phone number is incorrect</Text> */}

        
        <View style={styles.socialInputContainer}>
          <TextInput
            style={styles.socialInput}
            placeholder="Add your YouTube (optional)"
            placeholderTextColor="#9E9E9E"
          />
        </View>
        {/* <Text style={styles.inputError}>The phone number is incorrect</Text> */}
      </View>

      {/* Navigation buttons */}
      <View style={styles.navigationContainer}>
        <Pressable 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
        
        <Pressable 
          style={styles.nextButton}
          onPress={() => setIsPersonalInfo(true)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </View>
    </>
  );

  const renderPersonalInfoContent = () => (
    <>
      {/* Profile Photo Upload */}
      <View style={styles.photoUploadSection}>
        <Text style={styles.sectionLabel}>Upload Profile Photo</Text>
        <Pressable 
          style={styles.profilePhotoContainer}
          onPress={handleProfilePhotoUpload}
        >
          {profilePhoto ? (
            <Image 
              source={profilePhoto} 
              style={styles.profilePhoto} 
            />
          ) : (
            <Ionicons name="add" size={30} color="rgba(255, 255, 255, 0.5)" />
          )}
        </Pressable>
        <Text style={styles.uploadInstruction}>Upload or take three professional photos</Text>
      </View>

      {/* Additional Photos */}
      <View style={styles.additionalPhotosContainer}>
        {additionalPhotos.map((photo, index) => (
          <Pressable 
            key={index}
            style={styles.additionalPhotoBox}
            onPress={() => handleAdditionalPhotoUpload(index)}
          >
            {photo ? (
              <Image 
                source={photo} 
                style={styles.additionalPhoto} 
              />
            ) : (
              <Ionicons name="add" size={24} color="rgba(255, 255, 255, 0.5)" />
            )}
          </Pressable>
        ))}
      </View>

      {/* Complete Registration Button */}
      <Pressable 
        style={[
          styles.completeButton,
          !isCompleteButtonEnabled && styles.disabledButton
        ]}
        onPress={() => {
          if (isCompleteButtonEnabled) {
            navigation.navigate('RegistrationComplete');
          }
        }}
      >
        <Text style={styles.completeButtonText}>Complete Registration</Text>
      </Pressable>

      {/* Go Back Button */}
      <Pressable 
        style={styles.backButton}
        onPress={() => setIsPersonalInfo(false)}
      >
        <Text style={styles.backButtonText}>Go back</Text>
      </Pressable>
    </>
  );

  return (
    <LinearGradient
      colors={[colors.background, colors.mapOverlay]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandName}>SOCIALIGHT</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Tab selection */}
            <View style={styles.tabContainer}>
              <Pressable style={styles.tabButton}>
                <Text style={styles.tabButtonText}>For Influencers</Text>
              </Pressable>
            </View>

            {/* Account type toggle */}
            <View style={styles.accountTypeContainer}>
              <View style={styles.personalInfoContainer}>
                <Text style={styles.accountTypeText}>Account</Text>
                <Text style={styles.accountTypeSubtext}>Personal Info</Text>
              </View>
              <Switch
                trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: colors.accent }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="rgba(255, 255, 255, 0.1)"
                onValueChange={() => setIsPersonalInfo(!isPersonalInfo)}
                value={isPersonalInfo}
                style={styles.switch}
              />
            </View>

            {/* Render content based on toggle state */}
            {isPersonalInfo ? renderPersonalInfoContent() : renderAccountInfoContent()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  brandName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 2,
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  tabContainer: {
    backgroundColor: colors.accent,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  accountTypeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  personalInfoContainer: {
    flexDirection: 'row',
  },
  accountTypeText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
  },
  accountTypeSubtext: {
    color: colors.accent,
    fontSize: 12,
    marginRight: 10,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 5,
    paddingLeft: 15,
  },
  countryCode: {
    color: colors.textPrimary,
    paddingVertical: 12,
    fontSize: 14,
  },
  phoneInputDivider: {
    width: 1,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 10,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: colors.textPrimary,
  },
  inputHint: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 25,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  socialInputContainer: {
    marginBottom: 10,
    width: '100%',
  },
  socialInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 20,
  },
  backButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '400',
  },
  nextButton: {
    backgroundColor: colors.accent,
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    width: '30%',
  },
  nextButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  inputError: {
    color: colors.textError,
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  photoUploadSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 15,
    alignSelf: 'center',
  },
  profilePhotoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadInstruction: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  additionalPhotosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  additionalPhotoBox: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  additionalPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  completeButton: {
    backgroundColor: colors.accent,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: 'rgba(5, 101, 98, 0.5)',
  },
  completeButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Ssiiggnn;