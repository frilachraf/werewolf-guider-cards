import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QRCodeCanvas } from 'qrcode.react';
import { Role, GameSession, roleDefinitions } from '@/types/game';
import { Moon, Users, Shuffle, RotateCcw } from 'lucide-react';

interface GameHostProps {
  onStartGame: (session: GameSession) => void;
}

export const GameHost = ({ onStartGame }: GameHostProps) => {
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [playerCount, setPlayerCount] = useState(6);
  const [gameUrl, setGameUrl] = useState('');

  useEffect(() => {
    setGameUrl(`${window.location.origin}/join/${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  const generateRoles = (count: number): Role[] => {
    const roles: Role[] = [];
    const werewolfCount = Math.max(1, Math.floor(count / 4));
    
    // Add werewolves
    for (let i = 0; i < werewolfCount; i++) {
      roles.push('werewolf');
    }
    
    // Add special roles
    const specialRoles: Role[] = ['witch', 'doctor', 'sniper', 'child'];
    const availableSpecialRoles = Math.min(specialRoles.length, count - werewolfCount - 1);
    
    for (let i = 0; i < availableSpecialRoles; i++) {
      roles.push(specialRoles[i]);
    }
    
    // Fill remaining with villagers
    while (roles.length < count) {
      roles.push('villager');
    }
    
    return roles.sort(() => Math.random() - 0.5);
  };

  const createGameSession = () => {
    const roles = generateRoles(playerCount);
    const session: GameSession = {
      id: Math.random().toString(36).substr(2, 9),
      roles,
      assignedRoles: new Map(),
      maxPlayers: playerCount
    };
    setGameSession(session);
    onStartGame(session);
  };

  const resetGame = () => {
    setGameSession(null);
    setGameUrl(`${window.location.origin}/join/${Math.random().toString(36).substr(2, 9)}`);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Moon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Werewolves</h1>
          </div>
          <p className="text-muted-foreground">Game Master Control Panel</p>
        </div>

        {!gameSession ? (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Setup Game
              </CardTitle>
              <CardDescription>Configure your werewolf game session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Players</label>
                <div className="flex gap-2">
                  {[4, 5, 6, 7, 8, 9, 10].map((count) => (
                    <Button
                      key={count}
                      variant={playerCount === count ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPlayerCount(count)}
                      className="w-10 h-10"
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Distribution</label>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(
                    generateRoles(playerCount).reduce((acc, role) => {
                      acc[role] = (acc[role] || 0) + 1;
                      return acc;
                    }, {} as Record<Role, number>)
                  ).map(([role, count]) => (
                    <Badge key={role} variant="secondary" className="text-xs">
                      {roleDefinitions[role as Role].emoji} {count}x {roleDefinitions[role as Role].name}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button onClick={createGameSession} className="w-full" size="lg">
                <Shuffle className="h-4 w-4 mr-2" />
                Create Game Session
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Game Active</CardTitle>
                <CardDescription>Players can scan the QR code to join</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <QRCodeCanvas value={gameUrl} size={200} />
                </div>
                <p className="text-sm text-muted-foreground break-all">{gameUrl}</p>
                <div className="flex gap-2">
                  <Button onClick={resetGame} variant="outline" size="sm" className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Game
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Game Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Players Joined:</span>
                    <span className="text-sm font-medium">{gameSession.assignedRoles.size}/{gameSession.maxPlayers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Session ID:</span>
                    <span className="text-sm font-mono">{gameSession.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};