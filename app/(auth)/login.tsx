// base
import { useState } from 'react';

// react-native
import { StyleSheet, TextInput } from 'react-native';

// expo
import { Stack } from 'expo-router';

// hooks
import { useLogin } from '@/hooks/useLogin';

// componnets
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const { mutate: login, isPending, error } = useLogin();

  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    if (!username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      login({ username, password });
    }
  };

  const errorsUserName = errors.username ? (
    <ThemedText style={styles.errorText}>{errors.username}</ThemedText>
  ) : null;

  const errorsPassword = errors.password ? (
    <ThemedText style={styles.errorText}>{errors.password}</ThemedText>
  ) : null;

  const errorMessage = error ? (
    <ThemedText style={styles.errorText}>
      {error instanceof Error ? error.message : 'Login failed'}
    </ThemedText>
  ) : null;

  return (
    <ThemedView style={styles.root}>
      <Stack.Screen
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <ThemedView style={styles.form}>
        <ThemedText type="lgSemiBold" style={styles.title}>
          Welcome Back
        </ThemedText>
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          {errorsUserName}
        </ThemedView>
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errorsPassword}
        </ThemedView>
        {errorMessage}
        <ThemedView
          style={[styles.button, isPending && styles.buttonDisabled]}
          onTouchEnd={!isPending ? handleSubmit : undefined}
        >
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            {isPending ? 'Logging in...' : 'Login'}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 400,
    width: '100%',
  },
  title: {
    paddingBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: '#0F172A',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
  },
  errorText: {
    marginTop: 4,
    fontSize: 14,
    color: '#FF3B30',
  },
});
