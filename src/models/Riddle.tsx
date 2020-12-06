import Background from '../pages/riddles/Background';
import TreasureHunt from '../pages/riddles/TreasureHunt';
import Light from '../pages/riddles/Light';

export interface Riddle {
  id: string;
  image: string;
  name: string;
  difficulty: number;
  timeSec: number;
  isSuccess: boolean;
  component: React.FC<{ riddle: Riddle }> | null;
}

export const defaultRiddles: Riddle[] = [
  {
    id: '1',
    image:
      'https://jojo-app.fr/wp-content/uploads/2018/09/espace-optimise-appartement-meuble-paris.jpg',
    name: 'riddle-1',
    difficulty: 3,
    timeSec: 0,
    isSuccess: true,
    component: null,
  },
  {
    id: '2',
    image:
      'https://cdn.discordapp.com/attachments/768961466145308702/785223146063921162/file.jpg',
    name: 'Light',
    difficulty: 2,
    timeSec: 0,
    isSuccess: false,
    component: Light,
  },
  {
    id: '3',
    image: 'https://zupimages.net/up/20/49/vpcw.jpg',
    name: 'Background',
    difficulty: 3,
    timeSec: 1,
    isSuccess: false,
    component: Background,
  },
  {
    id: '4',
    image:
      'https://www.thespruce.com/thmb/d97ouPVGIw0T655cMAhEVeWeLM4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/indoor-treasure-hunt-for-children-1695332_FINAL-a9fabbdd08a14bfcbf9acb8ecae3a2f3.png',
    name: 'treasure-hunt',
    difficulty: 1,
    timeSec: 0,
    isSuccess: false,
    component: TreasureHunt,
  },
];
