{/* ROLDANA ADMIN + TÍTULO */}
import { Ionicons } from '@expo/vector-icons';
{/* ROLDANA ADMIN + TÍTULO */}
<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
  <Text style={styles.title}>Criar Conta</Text>
  <TouchableOpacity
    onPress={() => {
      let count = 0;
      const start = Date.now();
      const handler = setInterval(() => {
        count++;
        if (count >= 5) {
          clearInterval(handler);
          navigation.navigate('AdminPanel');
          Alert.alert("Acesso Admin", "Painel liberado!");
        }
        if (Date.now() - start > 3000) clearInterval(handler);
      }, 100);
    }}
    style={{ marginLeft: 10, padding: 10, backgroundColor: '#ddd', borderRadius: 20 }}
  >
    <Text style={{ fontSize: 16 }}>Gear Icon</Text>
  </TouchableOpacity>
</View>