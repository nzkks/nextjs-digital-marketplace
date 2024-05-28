import { ReactNode } from 'react';
import { ChefHat, Globe, PartyPopper } from 'lucide-react';

type Props = {
  id: number;
  name: string;
  title: string;
  image: ReactNode;
};

export const categoryItems: Props[] = [
  {
    id: 0,
    name: 'template',
    title: 'Template',
    image: <Globe />,
  },
  {
    id: 1,
    name: 'uikit',
    title: 'Ui Kit',
    image: <ChefHat />,
  },
  {
    id: 2,
    name: 'icon',
    title: 'Icon',
    image: <PartyPopper />,
  },
];
