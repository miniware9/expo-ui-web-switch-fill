import { Host, Switch } from '@expo/ui';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Each Host spans the screen's width (shaded), as a settings row would.
function SettingSwitch({ label }: { label: string }) {
  const [isOn, setIsOn] = useState(false);
  return (
    <Host matchContents={{ vertical: true }} style={styles.host}>
      <Switch label={label} value={isOn} onValueChange={setIsOn} />
    </Host>
  );
}

export default function App() {
  return (
    <View style={styles.screen}>
      <SettingSwitch label="Size" />
      <SettingSwitch label="Connection labels" />
      <SettingSwitch label="Color by net score" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', padding: 24, gap: 16 },
  host: { alignSelf: 'stretch', backgroundColor: '#e9ecef' },
});
