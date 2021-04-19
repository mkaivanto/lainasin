import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';
const options: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: true,
};

export const handleImagePicker = (
  useCamera: boolean,
  setFN: (name: string, value: string) => void,
) => {
  useCamera
    ? launchCamera(options, (response: ImagePickerResponse) => {
        if (response.base64) {
          setFN('image', response.base64);
        }
      })
    : launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (response.base64) {
          setFN('image', response.base64);
        }
      });
};

export const handleCamera = () => {
  launchCamera(options, (response: ImagePickerResponse) =>
    console.log('response', response),
  );
};
