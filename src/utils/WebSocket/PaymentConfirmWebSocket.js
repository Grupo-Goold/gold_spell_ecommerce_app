import { useEffect, useRef } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaymentConfirmWebSocket = ({ orderId, onPaymentUpdate }) => {
  const socketRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(orderId, "< AQUI");
    // Verifica se há um orderId para se conectar
    if (!orderId) return;

    // Cria a conexão WebSocket
    const socket = new WebSocket(
      "https://goldspell-orders-backend-api-t8qlu.ondigitalocean.app"
    );
    socketRef.current = socket;

    // Quando o socket abrir, registra o orderId
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "register", order_id: orderId }));
    };

    // Ouve mensagens do servidor WebSocket
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "payment_update" && data.order_id === orderId) {
        if (data.status === "paid") {
          console.log(`Pagamento confirmado para o pedido: ${orderId}`);
          AsyncStorage.removeItem("@order_id");
          onPaymentUpdate(data);
        } else if (data.status === "failed") {
          Alert.alert("Pagamento Falhou", "Tente novamente.");
        }
      }
    };

    // // Lidar com erros de conexão
    // socket.onerror = (error) => {
    //   console.error("Erro no WebSocket:", error);
    //   Alert.alert("Erro na conexão", "Não foi possível conectar ao servidor.");
    // };

    // Fecha o socket quando o componente for desmontado
    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
      }
    };
  }, [orderId, onPaymentUpdate]);

  return null;
};

export default PaymentConfirmWebSocket;
