import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState , useEffect } from 'react';
import CameraIcon from "../../assets/images/Mainpage/Camera.svg";
import PhoneIcon from "../../assets/images/Homepage/ModalScreen/Phone.svg";
import MailIcon from "../../assets/images/Homepage/ModalScreen/MailIcon.svg";
import UploadIcon from "../../assets/images/Morepage/uploadIcon.svg";
import CameraIconWhite from "../../assets/images/Morepage/whiteCameraicon.svg";
import GreenCamera from "../../assets/images/Morepage/GreenCamera.svg";
import * as ImagePicker from 'expo-image-picker';

const Profilepage = ({ navigation, route }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [username, setUsername] = useState('');
	const { color } = route.params; // Get the color from the route parameters
  //camera
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);

	const UsernameInput = (username) => {
		const nameParts = username.trim().split(/\s+/);
		let initials = '';
		for (let part of nameParts) {
			if (part) {
				initials += part[0].toUpperCase();
			}
			if (initials.length === 2) {
				break;
			}
		}
		return initials;
	};

  useEffect(() => {
    (async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === "granted");
        setHasCameraPermission(cameraStatus.status === "granted");
    })();
}, []);

const pickImage = async () => {
    if (!hasGalleryPermission) {
        alert('No access to gallery');
        return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.uri);
        setModalVisible(false);
    }
};

const takePhoto = async () => {
    if (!hasCameraPermission) {
        alert('No access to camera');
        return;
    }

    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.uri);
        setModalVisible(false);
    }
};

	return (
		<SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
			<View style={styles.profileContainer}>
				<View style={styles.profileImage}>
					<View style={[styles.initialsContainer, { backgroundColor: color.backgroundColor }]}>
						<Text style={[styles.initialsText, { backgroundColor: color.backgroundColor, color: color.textColor }]}>
							{UsernameInput(username)}
						</Text>
					</View>
					<Pressable onPress={() => setModalVisible(true)} style={styles.cameraIconContainer}>
						<CameraIcon name="camera-outline" size={24} color="black" />
					</Pressable>
				</View>
			</View>
			<Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.popupContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContainer}>
                                <View style={{ padding: 12, backgroundColor: "#F2F4F7", borderRadius: 28, borderColor: "#F9FAFB", borderWidth: 6, marginBottom: 16 }}><GreenCamera /></View>
                                <Text style={styles.popupTitle}>Add Image</Text>
                                <Text style={styles.popupSubtitle}>Upload a photo or video of the product</Text>
                                <View style={styles.buttonContainer}>
                                    <Pressable style={styles.uploadButton} onPress={pickImage}>
                                        <UploadIcon />
                                        <Text style={{ fontSize: 16, fontWeight: 600, fontFamily: "Nunito-SemiBold", lineHeight: 24, marginLeft: 8 }}>Upload</Text>
                                    </Pressable>
                                    <Pressable style={styles.cameraButton} onPress={takePhoto}>
                                        <CameraIconWhite />
                                        <Text style={{ fontSize: 16, fontWeight: 600, fontFamily: "Nunito-SemiBold", color: "#F8F9F9", lineHeight: 24, marginLeft: 8 }}>Camera</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

			<View style={styles.detailsContainer}>
				<Text style={styles.textStyle}>Name</Text>
				<View style={styles.inputText}>
					<TextInput
						placeholder="kayal vizhi"
						style={{ flex: 1, fontWeight: 'normal', fontFamily: 'Nunito-Medium' }}
						placeholderTextColor={'#212121'}
						editable={true}
						selectTextOnFocus={false}
						onChangeText={setUsername}
						onSubmitEditing={() => UsernameInput(username)}
					/>
				</View>
				<Text style={styles.textStyle}>Phone number</Text>
				<View style={styles.inputText}>
					<PhoneIcon />
					<TextInput
						placeholder="9356767168"
						style={{ flex: 1, fontWeight: 'normal', fontFamily: 'Nunito-Regular', paddingHorizontal: 8, color: color.textColor }}
						placeholderTextColor={'#7C7E7E'}
						editable={false}
						selectTextOnFocus={false}
					/>
					<Pressable
						onPress={() => {
							navigation.navigate("ProfileNumberEdit");
						}}>
						<Text style={{ color: "#347B72", fontSize: 14, fontWeight: "600", lineHeight: 22, fontFamily: "Nunito-Bold" }}>Edit</Text>
					</Pressable>
				</View>
				<Text style={styles.textStyle}>Email</Text>
				<View style={styles.inputText}>
					<MailIcon />
					<TextInput
						placeholder="kayalvizhi321@gmail.com"
						style={{ flex: 1, fontWeight: 'normal', fontFamily: 'Nunito-Regular', paddingHorizontal: 8, color: color.textColor }}
						placeholderTextColor={'#7C7E7E'}
						editable={false}
						selectTextOnFocus={false}
					/>
					<Pressable
						onPress={() => {
							navigation.navigate("ProfileEmailEdit");
						}}>
						<Text style={{ color: "#347B72", fontSize: 14, fontWeight: "600", lineHeight: 22, fontFamily: "Nunito-Bold" }}>Edit</Text>
					</Pressable>
				</View>

				<View style={{ justifyContent: "flex-end", borderWidth: 0 }}>
					<Pressable
						style={{
							backgroundColor: '#347B72',
							borderRadius: 10,
							padding: 12,
							alignItems: 'center',
							marginTop: 142,
							marginBottom: 48,
							height: 48,
							bottom: 24
						}}
						onPress={() => {
							navigation.navigate("More");
						}}>
						<Text style={{ color: 'white', fontWeight: "600", fontFamily: "Nunito-SemiBold" }}>Save Details</Text>
					</Pressable>
				</View>
			</View>
			
		</SafeAreaView>
	);
}

export default Profilepage;

const styles = StyleSheet.create({
	profileContainer: {
		height: 208,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	profileImage: {
		position: 'relative',
	},
	initialsContainer: {
		width: 128,
		height: 128,
		borderRadius: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0,
		backgroundColor: '#D9D6FE', // Set a default background color
	},
	initialsText: {
		fontSize: 36,
		fontWeight: 'bold',
		fontFamily: "Nunito-Bold",
		fontStyle: "normal",
		// Note: Remove background color from initialsText
	},
	cameraIconContainer: {
		position: 'absolute',
		alignItems: "center",
		justifyContent: "center",
		width: 40,
		height: 40,
		bottom: 0,
		right: 0,
		backgroundColor: 'white',
		borderRadius: 50,
		borderColor: "#CBCDCD",
		borderWidth: 2,
		padding: 4,
	},
	detailsContainer: {
		paddingHorizontal: 20,
		justifyContent: "flex-start",
		backgroundColor: "#fff",
	},
	textStyle: {
		fontSize: 14,
		fontStyle: "normal",
		lineHeight: 20,
		fontFamily: "Nunito-SemiBold",
	},
	inputText: {
		borderColor: '#CBCDCD',
		flexDirection: 'row',
		borderRadius: 8,
		borderWidth: 1,
		paddingHorizontal: 14,
		paddingVertical: 10,
		marginTop: 6,
		marginBottom: 24,
		alignItems: "center",
	},
  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
},
modalContainer: {
    width: '80%',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
},
popupTitle: {
    textAlign: "center",
    alignSelf: "stretch",
    fontSize: 20,
    fontWeight: 'heavy',
    marginBottom: 8,
    fontStyle: "normal",
    fontFamily: "Nunito-Bold",
    color: "#212121",
    lineHeight: 30
},
popupSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7C7E7E',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: "normal",
    fontFamily: "Nunito-Medium",
    lineHeight: 20
},
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
},
uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#CBCDCD',
    borderRadius: 10,
    width: "46%"
},
cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#347B72',
    borderRadius: 10,
    width: "47%"
},
buttonText: {
    marginLeft: 5,
},
})