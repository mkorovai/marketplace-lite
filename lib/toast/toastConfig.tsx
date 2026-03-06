// react-native
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ fontWeight: '600', fontSize: 16 }}
      text2Style={{ fontSize: 14, color: '#6B7280' }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ fontWeight: '600', fontSize: 16 }}
      text2Style={{ fontSize: 14, color: '#6B7280' }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftWidth: 0,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
      text1Style={{ fontWeight: '600', fontSize: 16 }}
      text2Style={{ fontSize: 14, color: '#6B7280' }}
    />
  ),
};
