import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

function App() {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  const connectWebSocket = () => {
    if (stompClient) {
      stompClient.deactivate();
    }

    const client = new Client({
      brokerURL: 'ws://192.168.0.2:8080/pms',
      connectHeaders: {},
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      console.log('Connected:', frame);
      setConnectionStatus('웹소켓 연결에 성공했습니다! 🎉');
      setIsConnected(true);

      // 토픽 구독
      client.subscribe('/sub/orders', (message) => {
        console.log('Received:', message.body);
      });

      // 연결 성공 메시지 전송
      client.publish({
        destination: '/app/hello',
        body: JSON.stringify({ message: '연결되었습니다!' }),
      });
    };

    client.onDisconnect = () => {
      console.log('Disconnected!');
      setConnectionStatus('웹소켓 연결이 종료되었습니다.');
      setIsConnected(false);
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
      setConnectionStatus('웹소켓 연결 중 오류가 발생했습니다.');
      setIsConnected(false);
    };

    try {
      client.activate();
      setStompClient(client);
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionStatus('연결 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: '/app/message',
        body: JSON.stringify({ message: '안녕하세요!' }),
      });
    }
  };

  return (
      <div style={{ padding: '20px' }}>
        <h1>WebSocket 테스트</h1>

        <button
            onClick={connectWebSocket}
            style={{
              backgroundColor: isConnected ? '#4CAF50' : '#f44336',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
        >
          {isConnected ? '연결됨' : '웹소켓 연결하기'}
        </button>

        <button
            onClick={sendMessage}
            disabled={!isConnected}
            style={{
              backgroundColor: isConnected ? '#2196F3' : '#cccccc',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: isConnected ? 'pointer' : 'not-allowed'
            }}
        >
          메시지 전송
        </button>

        {connectionStatus && (
            <p style={{
              marginTop: '10px',
              color: isConnected ? '#4CAF50' : '#f44336'
            }}>
              {connectionStatus}
            </p>
        )}
      </div>
  );
}

export default App;