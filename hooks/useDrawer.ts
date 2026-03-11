// base
import { useState, useCallback } from 'react';

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return { isOpen, openDrawer, closeDrawer };
};
