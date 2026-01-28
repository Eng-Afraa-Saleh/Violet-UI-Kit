import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download, Heart, Share2, Play, Pause, RotateCw } from 'lucide-react';
import { cn } from '../../utils';
import { Button } from './Button';
import type { GalleryImage, ImageGalleryProps, JustifiedGridProps } from '../../types';



export function ImageGallery({
  images,
  layout = 'grid',
  mode = 'inline',
  columns = 4,
  showThumbnails = true,
  showControls = true,
  showCaptions = true,
  showOverlay = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  enableZoom = true,
  enableDownload = true,
  enableLike = true,
  enableShare = true,
  imageFit = 'cover',
  maxHeight = 400,
  className,
  onImageClick,
  onLike,
  onDownload,
  onShare,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [likedImages, setLikedImages] = useState<Set<string | number>>(new Set());
  const galleryRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);

  const columnsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
  };

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoomLevel(1);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoomLevel(1);
  }, [images.length]);

  const handleImageClick = (image: GalleryImage, index: number) => {
    setCurrentIndex(index);
    if (mode === 'lightbox') {
      setLightboxOpen(true);
    }
    onImageClick?.(image, index);
  };

  const handleLike = (image: GalleryImage, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = new Set(likedImages);
    if (newLiked.has(image.id)) {
      newLiked.delete(image.id);
    } else {
      newLiked.add(image.id);
    }
    setLikedImages(newLiked);
    onLike?.(image);
  };

  const handleDownload = (image: GalleryImage, e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.(image);
  };

  const handleShare = (image: GalleryImage, e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(image);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && (mode === 'slideshow' || lightboxOpen)) {
      intervalRef.current = window.setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    } else {
      if (intervalRef.current !== undefined) {
        window.clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current !== undefined) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, mode, lightboxOpen, autoPlayInterval, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          setLightboxOpen(false);
          break;
        case '+':
        case '=':
          if (e.ctrlKey || e.metaKey) handleZoomIn();
          break;
        case '-':
          if (e.ctrlKey || e.metaKey) handleZoomOut();
          break;
        case '0':
          if (e.ctrlKey || e.metaKey) handleResetZoom();
          break;
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handlePrevious, handleNext]);

  const renderImageOverlay = (image: GalleryImage) => {
    if (!showOverlay) return null;

    return (
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {showCaptions && (
            <div className="text-white">
              <h3 className="font-semibold text-lg">{image.title || image.alt}</h3>
              {image.description && (
                <p className="text-sm text-white/80 mt-1">{image.description}</p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              {enableLike && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={(e) => handleLike(image, e)}
                >
                  <Heart
                    size={18}
                    className={likedImages.has(image.id) ? 'fill-red-500 text-red-500' : ''}
                  />
                </Button>
              )}

              {enableDownload && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={(e) => handleDownload(image, e)}
                >
                  <Download size={18} />
                </Button>
              )}

              {enableShare && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={(e) => handleShare(image, e)}
                >
                  <Share2 size={18} />
                </Button>
              )}
            </div>

            {image.tags && image.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap justify-end">
                {image.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-white/20 text-white rounded-full backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGridLayout = () => {
    return (
      <div
        ref={galleryRef}
        className={cn(
          'grid gap-4',
          columnsClasses[columns],
          className
        )}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className={cn(
              'group relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
              layout === 'masonry' && 'break-inside-avoid'
            )}
            style={{
              maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
            }}
            onClick={() => handleImageClick(image, index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
                imageFit === 'cover' && 'object-cover',
                imageFit === 'contain' && 'object-contain',
                imageFit === 'fill' && 'object-fill'
              )}
              style={{
                height: layout === 'masonry' ? 'auto' : '100%',
                maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
              }}
              loading="lazy"
            />

            {renderImageOverlay(image)}

            {showCaptions && !showOverlay && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="font-medium text-white text-sm truncate">
                  {image.title || image.alt}
                </h3>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCarouselLayout = () => {
    return (
      <div className={cn('relative', className)}>
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image) => (
              <div key={image.id} className="w-full flex-shrink-0">
                <div className="relative" style={{ height: maxHeight }}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={cn(
                      'w-full h-full object-cover',
                      imageFit === 'cover' && 'object-cover',
                      imageFit === 'contain' && 'object-contain',
                      imageFit === 'fill' && 'object-fill'
                    )}
                    style={{ height: maxHeight }}
                  />

                  {showCaptions && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-semibold text-white">
                        {image.title || image.alt}
                      </h3>
                      {image.description && (
                        <p className="text-white/80 mt-2">{image.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showControls && images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={handlePrevious}
            >
              <ChevronLeft size={20} />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={handleNext}
            >
              <ChevronRight size={20} />
            </Button>

            {mode === 'slideshow' && (
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/80'
                  )}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}

        {showThumbnails && images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto py-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                className={cn(
                  'flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                  index === currentIndex
                    ? 'border-primary-500'
                    : 'border-transparent hover:border-slate-300'
                )}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  className="h-20 w-32 object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderLightbox = () => {
    if (!lightboxOpen) return null;

    const currentImage = images[currentIndex];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
          onClick={() => setLightboxOpen(false)}
        >
          <X size={24} />
        </Button>

        <div className="relative w-full h-full flex items-center justify-center p-4">
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handlePrevious}
          >
            <ChevronLeft size={32} />
          </Button>

          <div className="relative max-w-7xl max-h-[90vh] overflow-hidden">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-[80vh] object-contain"
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s ease',
              }}
            />

            {showCaptions && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-2xl font-semibold text-white">
                  {currentImage.title || currentImage.alt}
                </h3>
                {currentImage.description && (
                  <p className="text-white/80 mt-2">{currentImage.description}</p>
                )}
                <div className="flex items-center gap-4 mt-4">
                  {currentImage.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-white/20 text-white rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handleNext}
          >
            <ChevronRight size={32} />
          </Button>
        </div>

        {/* Lightbox controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          {enableZoom && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
              >
                <ZoomOut size={20} />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleResetZoom}
              >
                <RotateCw size={20} />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
              >
                <ZoomIn size={20} />
              </Button>

              <div className="text-white text-sm mx-2">
                {Math.round(zoomLevel * 100)}%
              </div>
            </>
          )}

          <div className="h-6 w-px bg-white/30" />

          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>

          {enableDownload && (
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={(e) => handleDownload(currentImage, e)}
            >
              <Download size={20} />
            </Button>
          )}

          {enableLike && (
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={(e) => handleLike(currentImage, e)}
            >
              <Heart
                size={20}
                className={likedImages.has(currentImage.id) ? 'fill-red-500 text-red-500' : ''}
              />
            </Button>
          )}

          {enableShare && (
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={(e) => handleShare(currentImage, e)}
            >
              <Share2 size={20} />
            </Button>
          )}
        </div>

        {/* Thumbnail strip */}
        {showThumbnails && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto py-2 px-4">
            {images.map((image, index) => (
              <button
                key={image.id}
                className={cn(
                  'flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                  index === currentIndex
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                )}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  className="h-16 w-24 object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Image counter */}
        <div className="absolute top-4 left-4 text-white/80 text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm hidden lg:block">
          Use ← → arrows, ESC to close, Space to play/pause
        </div>
      </div>
    );
  };

  if (mode === 'lightbox' && !lightboxOpen) {
    return (
      <>
        {renderGridLayout()}
        {renderLightbox()}
      </>
    );
  }

  if (layout === 'carousel' || mode === 'slideshow') {
    return (
      <>
        {renderCarouselLayout()}
        {mode === 'lightbox' && renderLightbox()}
      </>
    );
  }

  return (
    <>
      {renderGridLayout()}
      {mode === 'lightbox' && renderLightbox()}
    </>
  );
}

// Justified Grid Component


export function JustifiedGrid({
  images,
  targetHeight = 200,
  gap = 4,
  className,
  onImageClick,
}: JustifiedGridProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const calculateLayout = () => {
    if (containerWidth === 0) return [];

    const rows: Array<Array<GalleryImage & { width: number }>> = [];
    let currentRow: Array<GalleryImage & { width: number }> = [];
    let currentRowWidth = 0;

    images.forEach((image) => {
      const aspectRatio = image.width && image.height ? image.width / image.height : 1;
      const imageWidth = targetHeight * aspectRatio;
      const imageWithWidth = { ...image, width: imageWidth };

      if (currentRowWidth + imageWidth > containerWidth && currentRow.length > 0) {
        rows.push([...currentRow]);
        currentRow = [];
        currentRowWidth = 0;
      }

      currentRow.push(imageWithWidth);
      currentRowWidth += imageWidth + gap;
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const rows = calculateLayout();

  return (
    <div ref={containerRef} className={cn('w-full', className)}>
      {rows.map((row, rowIndex) => {
        const rowWidth = row.reduce((sum, img) => sum + img.width, 0);
        const scale = (containerWidth - (row.length - 1) * gap) / rowWidth;

        return (
          <div key={rowIndex} className="flex gap-2 mb-2">
            {row.map((image, imgIndex) => {
              const width = image.width * scale;
              const height = targetHeight;

              return (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{ width: `${width}px`, height: `${height}px` }}
                  onClick={() => onImageClick?.(image, imgIndex)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}