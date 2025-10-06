import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { BookingData } from '../App';

interface SelectBoatPageProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

const yachts = [
  {
    name: 'The Serenity',
    size: '36 ft',
    price: 500,
    description: 'Perfect for intimate gatherings with elegant interior',
    images: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMGJvYXR8ZW58MXx8fHwxNzU5NDM0MjkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1697207340462-c9eac5047014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMGludGVyaW9yfGVufDF8fHx8MTc1OTQzNTMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1651902387099-787f4a62a3e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGNhYmluJTIwYmVkcm9vbXxlbnwxfHx8fDE3NTk0MzUzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
  },
  {
    name: 'Azure Spirit',
    size: '45 ft',
    price: 950,
    description: 'Spacious deck with modern amenities and style',
    images: [
      'https://images.unsplash.com/photo-1630840754024-8e3817c5e623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGNoYXJ0ZXIlMjBib2F0fGVufDF8fHx8MTc1OTQzNDI5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1759165913870-1c6c0d889171?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGRlY2slMjB2aWV3fGVufDF8fHx8MTc1OTQzNTM0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1744352029006-5c075b0a7572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGRpbmluZyUyMGFyZWF8ZW58MXx8fHwxNzU5NDM1MzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
  },
  {
    name: 'Wave Dancer',
    size: '52 ft',
    price: 1200,
    description: 'Luxury yacht with premium facilities and comfort',
    images: [
      'https://images.unsplash.com/photo-1666710108359-a4d09ef5e22f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWlsaW5nJTIweWFjaHQlMjBvY2VhbnxlbnwxfHx8fDE3NTk0MzQyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1728973702874-a1ecdbaffc16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvciUyMHlhY2h0JTIwc2FpbGluZ3xlbnwxfHx8fDE3NTk0MzUzNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1571456803038-80efbf5c9d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGJhdGhyb29tJTIwbHV4dXJ5fGVufDF8fHx8MTc1OTQzNTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
  }
];

export function SelectBoatPage({ bookingData, updateBookingData }: SelectBoatPageProps) {
  const [fullScreenImage, setFullScreenImage] = useState<{ yacht: typeof yachts[0], imageIndex: number } | null>(null);
  const [yachtImageIndices, setYachtImageIndices] = useState<{ [key: string]: number }>({});

  const handleBoatSelect = (yacht: typeof yachts[0]) => {
    updateBookingData({ selectedBoat: yacht });
  };

  const handleImageClick = (yacht: typeof yachts[0], imageIndex: number) => {
    setFullScreenImage({ yacht, imageIndex });
  };

  const navigateFullScreenImage = (direction: 'prev' | 'next') => {
    if (!fullScreenImage) return;
    
    const yacht = fullScreenImage.yacht;
    const currentIndex = fullScreenImage.imageIndex;
    const totalImages = yacht.images.length;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    }
    
    setFullScreenImage({ yacht, imageIndex: newIndex });
  };

  const navigateYachtThumbnail = (yachtName: string, direction: 'prev' | 'next') => {
    const yacht = yachts.find(y => y.name === yachtName);
    if (!yacht) return;
    
    const currentIndex = yachtImageIndices[yachtName] || 0;
    const totalImages = yacht.images.length;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    }
    
    setYachtImageIndices(prev => ({
      ...prev,
      [yachtName]: newIndex
    }));
  };

  // Set default selected boat if none selected
  React.useEffect(() => {
    if (!bookingData.selectedBoat) {
      handleBoatSelect(yachts[0]);
    }
  }, []);

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl mb-6">Select Boat</h2>
        
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {yachts.map((yacht, index) => {
            const currentImageIndex = yachtImageIndices[yacht.name] || 0;
            return (
              <div
                key={yacht.name}
                onClick={() => handleBoatSelect(yacht)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  bookingData.selectedBoat?.name === yacht.name
                    ? 'border-blue-500 border-2 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex gap-4">
                  <div className="w-40 h-32 rounded-lg overflow-hidden flex-shrink-0 relative group">
                    <ImageWithFallback
                      src={yacht.images[currentImageIndex]}
                      alt={yacht.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(yacht, currentImageIndex);
                      }}
                    />
                    
                    {/* Thumbnail navigation arrows */}
                    {yacht.images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 text-gray-700 hover:bg-white hover:text-gray-900 p-1 h-8 w-8 shadow-md border transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateYachtThumbnail(yacht.name, 'prev');
                          }}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 text-gray-700 hover:bg-white hover:text-gray-900 p-1 h-8 w-8 shadow-md border transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateYachtThumbnail(yacht.name, 'next');
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        {/* Image indicator dots */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {yacht.images.map((_, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`w-2 h-2 rounded-full ${
                                imgIndex === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{yacht.name}</h3>
                      <span className="text-blue-600 font-semibold">${yacht.price}/{bookingData.duration}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{yacht.size}</p>
                    <p className="text-gray-700 text-sm">{yacht.description}</p>
                    
                    {yacht.images.length > 1 && (
                      <p className="text-xs text-gray-500 mt-2">
                        Click image to view gallery ({yacht.images.length} photos)
                      </p>
                    )}
                  </div>
                </div>
                
                {bookingData.selectedBoat?.name === yacht.name && (
                  <div className="mt-3 flex items-center text-blue-600 text-sm">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {fullScreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100]">
          <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFullScreenImage(null)}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 p-2"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Image */}
            <div className="relative max-w-4xl max-h-full">
              <ImageWithFallback
                src={fullScreenImage.yacht.images[fullScreenImage.imageIndex]}
                alt={fullScreenImage.yacht.name}
                className="max-w-full max-h-full object-contain"
              />

              {/* Navigation arrows */}
              {fullScreenImage.yacht.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateFullScreenImage('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-70 p-3"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateFullScreenImage('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-70 p-3"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Image info */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">{fullScreenImage.yacht.name}</h3>
                <p className="text-sm opacity-80">
                  Image {fullScreenImage.imageIndex + 1} of {fullScreenImage.yacht.images.length}
                </p>
              </div>

              {/* Image indicator dots */}
              {fullScreenImage.yacht.images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {fullScreenImage.yacht.images.map((_, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`w-3 h-3 rounded-full cursor-pointer ${
                        imgIndex === fullScreenImage.imageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                      onClick={() => setFullScreenImage({ yacht: fullScreenImage.yacht, imageIndex: imgIndex })}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}