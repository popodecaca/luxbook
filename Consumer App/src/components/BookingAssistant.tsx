import React, { useState, useRef } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

interface BookingAssistantProps {
  onClose: () => void;
}

export function BookingAssistant({ onClose }: BookingAssistantProps) {
  const [position, setPosition] = useState({ x: 530, y: window.innerHeight - 506 }); // bottom-6 equivalent
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - 350, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 500, e.clientY - dragOffset.y));
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset]);

  return (
    <div 
      ref={dragRef}
      className="fixed z-50"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span className="font-medium">Booking Assistant</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 text-white hover:bg-white hover:bg-opacity-20"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">AI Chat Assistant</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get instant help with your booking questions
            </p>
            <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Coming Soon!</p>
              <p className="text-sm mt-1">
                Our AI assistant will be available shortly to help you with your yacht charter booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}