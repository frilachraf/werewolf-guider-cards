import { useState } from 'react';
import { GameHost } from '@/components/GameHost';
import { GameSession } from '@/types/game';

const Index = () => {
  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  const handleStartGame = (session: GameSession) => {
    setGameSession(session);
  };

  return <GameHost onStartGame={handleStartGame} />;
};

export default Index;
