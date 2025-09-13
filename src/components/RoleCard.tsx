import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Role, roleDefinitions } from '@/types/game';
import { Shield, Sword, Heart, Target, Baby, User } from 'lucide-react';

interface RoleCardProps {
  role: Role;
  playerName?: string;
}

const getRoleIcon = (role: Role) => {
  switch (role) {
    case 'werewolf': return <Sword className="h-6 w-6" />;
    case 'witch': return <Heart className="h-6 w-6" />;
    case 'doctor': return <Shield className="h-6 w-6" />;
    case 'sniper': return <Target className="h-6 w-6" />;
    case 'child': return <Baby className="h-6 w-6" />;
    case 'villager': return <User className="h-6 w-6" />;
  }
};

const getRoleCardClass = (role: Role) => {
  const baseClass = "border-2 min-h-[400px]";
  switch (role) {
    case 'werewolf': return `${baseClass} border-werewolf bg-gradient-to-br from-werewolf/20 to-werewolf/5`;
    case 'witch': return `${baseClass} border-witch bg-gradient-to-br from-witch/20 to-witch/5`;
    case 'doctor': return `${baseClass} border-doctor bg-gradient-to-br from-doctor/20 to-doctor/5`;
    case 'sniper': return `${baseClass} border-sniper bg-gradient-to-br from-sniper/20 to-sniper/5`;
    case 'child': return `${baseClass} border-child bg-gradient-to-br from-child/20 to-child/5`;
    case 'villager': return `${baseClass} border-villager bg-gradient-to-br from-villager/20 to-villager/5`;
  }
};

const getRoleIconColor = (role: Role) => {
  switch (role) {
    case 'werewolf': return 'text-werewolf';
    case 'witch': return 'text-witch';
    case 'doctor': return 'text-doctor';
    case 'sniper': return 'text-sniper';
    case 'child': return 'text-child';
    case 'villager': return 'text-villager';
  }
};

const getRoleDotColor = (role: Role) => {
  switch (role) {
    case 'werewolf': return 'bg-werewolf';
    case 'witch': return 'bg-witch';
    case 'doctor': return 'bg-doctor';
    case 'sniper': return 'bg-sniper';
    case 'child': return 'bg-child';
    case 'villager': return 'bg-villager';
  }
};

export const RoleCard = ({ role, playerName }: RoleCardProps) => {
  const roleInfo = roleDefinitions[role];

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className={getRoleCardClass(role)}>
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-card flex items-center justify-center">
            <div className={getRoleIconColor(role)}>
              {getRoleIcon(role)}
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <span className="text-3xl">{roleInfo.emoji}</span>
              {roleInfo.name}
            </CardTitle>
            {playerName && (
              <p className="text-sm text-muted-foreground">Hello, {playerName}</p>
            )}
            <Badge 
              variant={roleInfo.team === 'werewolf' ? 'destructive' : 'secondary'}
              className="mx-auto"
            >
              {roleInfo.team === 'werewolf' ? 'Werewolf Team' : 'Village Team'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Description
            </h3>
            <CardDescription className="text-base">
              {roleInfo.description}
            </CardDescription>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Your Abilities
            </h3>
            <ul className="space-y-2">
              {roleInfo.abilities.map((ability, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className={`w-2 h-2 rounded-full ${getRoleDotColor(role)} mt-2 flex-shrink-0`} />
                  <span>{ability}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Keep your role secret! The game depends on it.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};