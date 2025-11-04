// src/components/Button.stories.jsx

import { Button } from './buttoncomp';
 // 1. Apne component ko import karein

// 2. File ki default configuration
export default {
  title: 'UI/Button', // Storybook ke sidebar mein kaisa dikhega
  component: Button,
};

// 3. Pehli story: Primary Button
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button', // 'children' prop use karein, 'label' nahi
  },
};

// 4. Doosri story: Secondary Button
export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// 5. Ek aur story: Large Button
export const Large = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// 6. Ek aur story: Small Button
export const Small = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};