import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';
const options: ImageLibraryOptions = {
  mediaType: 'photo',
};

export const handleImageLibrary = () => {
  launchImageLibrary(options, (response: ImagePickerResponse) => {
    console.log('response', response);
  });
};

export const handleCamera = () => {
  launchCamera(options, (response: ImagePickerResponse) =>
    console.log('response', response),
  );
};
