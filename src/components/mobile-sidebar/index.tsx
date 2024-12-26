'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import Sidebar from '../sidebar';
import useWindowDimensions from '@/hooks/useWindowDimensions.hook';

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = () => {
    if (windowWidth && windowWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar onItemClick={handleItemClick} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
