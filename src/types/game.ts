export type Role = 'werewolf' | 'witch' | 'doctor' | 'sniper' | 'child' | 'villager';

export interface RoleInfo {
  name: string;
  description: string;
  abilities: string[];
  team: 'werewolf' | 'village';
  emoji: string;
}

export interface GameSession {
  id: string;
  roles: Role[];
  assignedRoles: Map<string, Role>;
  maxPlayers: number;
}

export const roleDefinitions: Record<Role, RoleInfo> = {
  werewolf: {
    name: 'Werewolf',
    description: 'A creature of the night seeking to eliminate the villagers.',
    abilities: ['Vote to eliminate a villager each night', 'Know other werewolves'],
    team: 'werewolf',
    emoji: '🐺'
  },
  witch: {
    name: 'Witch',
    description: 'A mystical healer with powerful potions.',
    abilities: ['Save someone with healing potion (once)', 'Eliminate someone with poison (once)'],
    team: 'village',
    emoji: '🧙‍♀️'
  },
  doctor: {
    name: 'Doctor',
    description: 'A skilled healer protecting the innocent.',
    abilities: ['Protect one person each night', 'Cannot protect the same person twice in a row'],
    team: 'village',
    emoji: '👨‍⚕️'
  },
  sniper: {
    name: 'Sniper',
    description: 'A sharp-shooter hunting the werewolves.',
    abilities: ['Eliminate one person during the day (once)', 'Must choose carefully'],
    team: 'village',
    emoji: '🎯'
  },
  child: {
    name: 'Child',
    description: 'An innocent child beloved by all.',
    abilities: ['If eliminated, all players lose their special abilities', 'Cannot be targeted by werewolves on first night'],
    team: 'village',
    emoji: '🧒'
  },
  villager: {
    name: 'Villager',
    description: 'An ordinary citizen fighting for survival.',
    abilities: ['Vote during the day', 'Use logic and intuition to find werewolves'],
    team: 'village',
    emoji: '👨‍🌾'
  }
};