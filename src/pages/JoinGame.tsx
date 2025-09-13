import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RoleCard } from '@/components/RoleCard';
import { Role, roleDefinitions } from '@/types/game';
import { Moon, User } from 'lucide-react';

export const JoinGame = () => {
  const { gameId } = useParams();
  const [playerName, setPlayerName] = useState('');
  const [assignedRole, setAssignedRole] = useState<Role | null>(null);
  const [hasJoined, setHasJoined] = useState(false);

  // Simulate role assignment (in a real app, this would connect to the game server)
  const assignRole = () => {
    if (!playerName.trim()) return;
    
    // Get a random role for demo purposes
    const roles: Role[] = ['werewolf', 'witch', 'doctor', 'sniper', 'child', 'villager'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    
    setAssignedRole(randomRole);
    setHasJoined(true);
  };

  if (hasJoined && assignedRole) {
    return <RoleCard role={assignedRole} playerName={playerName} />;
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Moon className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl">Join Werewolf Game</CardTitle>
            <CardDescription>
              Game ID: <span className="font-mono text-foreground">{gameId}</span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="playerName" className="text-sm font-medium">
              Your Name
            </label>
            <Input
              id="playerName"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="text-center"
            />
          </div>
          
          <Button 
            onClick={assignRole}
            disabled={!playerName.trim()}
            className="w-full"
            size="lg"
          >
            <User className="h-4 w-4 mr-2" />
            Join Game & Get Role
          </Button>
          
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              You'll receive your secret role after joining
            </p>
            <div className="flex justify-center gap-1">
              {Object.entries(roleDefinitions).map(([role, info]) => (
                <span key={role} className="text-lg" title={info.name}>
                  {info.emoji}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};