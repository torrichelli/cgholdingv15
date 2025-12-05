
import React from 'react';
import { motion } from 'framer-motion';
import { DIVISIONS, ICON_MAP } from '../constants';
import { PageView } from '../types';
import { ChevronRight } from 'lucide-react';

interface DivisionsProps {
  onSelect: (id: PageView) => void;
}

const Divisions: React.FC<DivisionsProps> = ({ onSelect }) => {
  // This component is kept for compatibility but the main ecosystem display is in HomeSections.tsx
  return null;
};

export default Divisions;
