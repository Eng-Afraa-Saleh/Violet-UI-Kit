import React, { useState } from 'react';
import { Grid, List, Play, Pause, Maximize2, Download, Heart, Share2, Camera, Image as ImageIcon } from 'lucide-react';
 import { ImageGallery, JustifiedGrid, type GalleryImage, type GalleryLayout } from '../components/ui/ImageGallery';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Layout';
import { Select } from '../components/ui/Form';
import ComponentPreview from './ComponentPreview';

const ImageGalleryView = () => {
  const [currentLayout, setCurrentLayout] = useState<GalleryLayout>('grid');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string | number>>(new Set());

  // Sample images data
  const sampleImages: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      alt: 'Mountain landscape',
      title: 'Mountain Majesty',
      description: 'Beautiful mountain landscape at sunrise',
      tags: ['Nature', 'Mountains', 'Landscape'],
      width: 4000,
      height: 3000,
      liked: true,
      downloads: 1245,
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
      alt: 'City skyline',
      title: 'Urban Dreams',
      description: 'Modern city skyline at dusk',
      tags: ['City', 'Urban', 'Architecture'],
      width: 5000,
      height: 3333,
      downloads: 892,
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      alt: 'Ocean waves',
      title: 'Ocean Waves',
      description: 'Powerful ocean waves crashing on rocks',
      tags: ['Ocean', 'Water', 'Nature'],
      width: 6000,
      height: 4000,
      downloads: 1567,
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e',
      alt: 'Forest path',
      title: 'Enchanted Forest',
      description: 'Mystical forest path in autumn',
      tags: ['Forest', 'Nature', 'Autumn'],
      width: 4500,
      height: 3000,
      liked: true,
      downloads: 987,
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0',
      alt: 'Desert dunes',
      title: 'Desert Sands',
      description: 'Golden sand dunes in the desert',
      tags: ['Desert', 'Sand', 'Landscape'],
      width: 5500,
      height: 3667,
      downloads: 756,
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      alt: 'Northern lights',
      title: 'Aurora Borealis',
      description: 'Spectacular northern lights display',
      tags: ['Aurora', 'Night', 'Sky'],
      width: 5000,
      height: 3333,
      downloads: 2314,
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
      alt: 'Beach sunset',
      title: 'Beach Sunset',
      description: 'Beautiful sunset at the beach',
      tags: ['Beach', 'Sunset', 'Ocean'],
      width: 4000,
      height: 3000,
      downloads: 1789,
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      alt: 'Winter wonderland',
      title: 'Winter Magic',
      description: 'Snow covered landscape in winter',
      tags: ['Winter', 'Snow', 'Landscape'],
      width: 6000,
      height: 4000,
      downloads: 1123,
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e',
      alt: 'Waterfall',
      title: 'Powerful Waterfall',
      description: 'Majestic waterfall in the jungle',
      tags: ['Waterfall', 'Nature', 'Jungle'],
      width: 5500,
      height: 3667,
      downloads: 1456,
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0',
      alt: 'Mountain lake',
      title: 'Alpine Lake',
      description: 'Crystal clear mountain lake',
      tags: ['Lake', 'Mountains', 'Reflection'],
      width: 5000,
      height: 3333,
      downloads: 987,
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      alt: 'Flower field',
      title: 'Floral Paradise',
      description: 'Colorful flower field in bloom',
      tags: ['Flowers', 'Field', 'Colorful'],
      width: 4500,
      height: 3000,
      downloads: 876,
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      alt: 'Starry night',
      title: 'Starry Sky',
      description: 'Milky way galaxy in night sky',
      tags: ['Stars', 'Night', 'Galaxy'],
      width: 6000,
      height: 4000,
      downloads: 1987,
    },
  ];

  const carouselImages = sampleImages.slice(0, 5);

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    console.log('Clicked image:', image.title, 'Index:', index);
  };

  const handleLike = (image: GalleryImage) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(image.id)) {
      newLiked.delete(image.id);
    } else {
      newLiked.add(image.id);
    }
    setLikedImages(newLiked);
    console.log('Liked image:', image.title);
  };

  const handleDownload = (image: GalleryImage) => {
    console.log('Downloading image:', image.title);
    // In a real app, you would trigger download here
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (image: GalleryImage) => {
    console.log('Sharing image:', image.title);
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: image.description,
        url: image.src,
      });
    } else {
      navigator.clipboard.writeText(image.src);
      alert('Image URL copied to clipboard!');
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Image Gallery</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Interactive image galleries with multiple layouts, lightbox view, and social features.
        </p>
      </div>

      {/* Grid Layout */}
      <ComponentPreview
        title="Grid Gallery"
        description="Responsive grid layout with hover effects and interactive overlays."
        code={`const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    alt: 'Mountain landscape',
    title: 'Mountain Majesty',
    tags: ['Nature', 'Mountains'],
  },
  // ... more images
];

<ImageGallery
  images={images}
  layout="grid"
  columns={4}
  gap={4}
  showOverlay={true}
  showCaptions={true}
  enableLike={true}
  enableDownload={true}
  enableShare={true}
  onImageClick={handleImageClick}
  onLike={handleLike}
  onDownload={handleDownload}
  onShare={handleShare}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Photo Gallery ({sampleImages.length} images)
            </h3>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={currentLayout === 'grid' ? 'primary' : 'outline'}
                onClick={() => setCurrentLayout('grid')}
              >
                <Grid size={16} className="mr-2" />
                Grid
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentLayout('masonry')}
              >
                <List size={16} className="mr-2" />
                Masonry
              </Button>
            </div>
          </div>
          
          <ImageGallery
            images={sampleImages}
            layout={currentLayout}
            columns={4}
            gap={4}
            showOverlay={true}
            showCaptions={true}
            enableLike={true}
            enableDownload={true}
            enableShare={true}
            onImageClick={handleImageClick}
            onLike={handleLike}
            onDownload={handleDownload}
            onShare={handleShare}
            maxHeight={300}
          />
          
          {selectedImage && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-50">
                    Selected: {selectedImage.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {selectedImage.description}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedImage(null)}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          )}
        </div>
      </ComponentPreview>

      {/* Carousel/Slideshow */}
      <ComponentPreview
        title="Carousel & Slideshow"
        description="Interactive carousel with autoplay, navigation controls, and thumbnails."
        code={`<ImageGallery
  images={carouselImages}
  layout="carousel"
  mode="slideshow"
  showControls={true}
  showThumbnails={true}
  showCaptions={true}
  autoPlay={true}
  autoPlayInterval={3000}
  onImageClick={handleImageClick}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Featured Images Slideshow
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Auto-playing carousel with navigation controls
            </p>
          </div>
          
          <ImageGallery
            images={carouselImages}
            layout="carousel"
            mode="slideshow"
            showControls={true}
            showThumbnails={true}
            showCaptions={true}
            autoPlay={true}
            autoPlayInterval={3000}
            onImageClick={handleImageClick}
            maxHeight={500}
          />
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {carouselImages.length}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Featured Images</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                3s
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Auto-play Interval</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {likedImages.size}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Liked Images</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                HD
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Image Quality</div>
            </Card>
          </div>
        </div>
      </ComponentPreview>

      {/* Lightbox Gallery */}
      <ComponentPreview
        title="Lightbox Gallery"
        description="Click images to open full-screen lightbox with zoom, download, and social features."
        code={`<ImageGallery
  images={sampleImages.slice(0, 6)}
  layout="grid"
  mode="lightbox"
  columns={3}
  showOverlay={true}
  enableZoom={true}
  enableDownload={true}
  enableLike={true}
  enableShare={true}
  onImageClick={handleImageClick}
  onLike={handleLike}
  onDownload={handleDownload}
  onShare={handleShare}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Lightbox Gallery
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Click on any image to open full-screen lightbox view
            </p>
          </div>
          
          <ImageGallery
            images={sampleImages.slice(0, 6)}
            layout="grid"
            mode="lightbox"
            columns={3}
            showOverlay={true}
            enableZoom={true}
            enableDownload={true}
            enableLike={true}
            enableShare={true}
            onImageClick={handleImageClick}
            onLike={handleLike}
            onDownload={handleDownload}
            onShare={handleShare}
            maxHeight={250}
          />
          
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-4">
              <Camera className="text-slate-400" />
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-50">Lightbox Features</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Full-screen view • Keyboard navigation • Zoom in/out • Social sharing • Download options
                </p>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Justified Grid */}
      <ComponentPreview
        title="Justified Grid (Masonry)"
        description="Masonry-style layout that adjusts to fill available space efficiently."
        code={`<JustifiedGrid
  images={sampleImages}
  targetHeight={200}
  gap={4}
  onImageClick={handleImageClick}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Justified Grid Layout
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Masonry-style layout that fills space efficiently
            </p>
          </div>
          
          <JustifiedGrid
            images={sampleImages}
            targetHeight={200}
            gap={4}
            onImageClick={handleImageClick}
          />
          
          <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 text-center">
            Images automatically adjust to create balanced rows
          </div>
        </div>
      </ComponentPreview>

      {/* Interactive Controls Example */}
      <ComponentPreview
        title="Interactive Controls"
        description="Gallery with custom controls for layout, sorting, and filtering."
        code={`const [layout, setLayout] = useState('grid');
const [columns, setColumns] = useState(4);
const [sortBy, setSortBy] = useState('default');

<div className="space-y-4">
  {/* Control toolbar */}
  <div className="flex flex-wrap gap-4">
    <Button onClick={() => setLayout('grid')}>Grid</Button>
    <Button onClick={() => setLayout('masonry')}>Masonry</Button>
    <Select options={sortOptions} onChange={setSortBy} />
  </div>
  
  {/* Gallery */}
  <ImageGallery
    images={sortedImages}
    layout={layout}
    columns={columns}
  />
</div>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Gallery with Custom Controls
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Layout:</span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={currentLayout === 'grid' ? 'primary' : 'outline'}
                    onClick={() => setCurrentLayout('grid')}
                  >
                    <Grid size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant={currentLayout === 'masonry' ? 'primary' : 'outline'}
                    onClick={() => setCurrentLayout('masonry')}
                  >
                    <List size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Columns:</span>
                <div className="flex gap-1">
                  {[2, 3, 4, 6].map((col) => (
                    <Button
                      key={col}
                      size="sm"
                      variant="outline"
                      onClick={() => console.log('Set columns to:', col)}
                    >
                      {col}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Actions:</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline">
                    <Download size={14} className="mr-1" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 size={14} className="mr-1" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline">
                    <Heart size={14} className="mr-1" />
                    {likedImages.size} Likes
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <ImageGallery
            images={sampleImages.slice(0, 8)}
            layout={currentLayout}
            columns={4}
            showOverlay={true}
            maxHeight={currentLayout === 'masonry' ? undefined : 250}
          />
        </div>
      </ComponentPreview>

      {/* Photo Album Example */}
      <ComponentPreview
        title="Photo Album Example"
        description="Complete photo album implementation with stats and social features."
        code={`<Card className="p-6">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-xl font-bold">Nature Photography</h3>
      <p className="text-slate-500">12 stunning landscape photos</p>
    </div>
    <Button variant="outline">
      <Download className="mr-2" />
      Download All
    </Button>
  </div>
  
  <ImageGallery
    images={albumImages}
    layout="grid"
    columns={3}
    showOverlay={true}
    enableLike={true}
    enableDownload={true}
  />
  
  <div className="mt-6 pt-6 border-t">
    <div className="flex items-center justify-between text-sm text-slate-500">
      <span>Album by: John Doe</span>
      <span>Last updated: Today</span>
    </div>
  </div>
</Card>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  Nature Photography Collection
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  {sampleImages.length} stunning landscape and nature photos
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Heart size={16} className="mr-2" />
                  {likedImages.size} Likes
                </Button>
                <Button size="sm">
                  <Download size={16} className="mr-2" />
                  Download Album
                </Button>
              </div>
            </div>
            
            <ImageGallery
              images={sampleImages.slice(0, 9)}
              layout="grid"
              columns={3}
              showOverlay={true}
              enableLike={true}
              enableDownload={true}
              enableShare={true}
              onLike={handleLike}
              onDownload={handleDownload}
              onShare={handleShare}
              maxHeight={220}
            />
            
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <Camera className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-50">
                      Photography Studio
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Professional nature photography
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                  <div className="text-center">
                    <div className="font-semibold text-slate-900 dark:text-slate-50">
                      {sampleImages.length}
                    </div>
                    <div>Photos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-900 dark:text-slate-50">
                      {sampleImages.reduce((sum, img) => sum + (img.downloads || 0), 0).toLocaleString()}
                    </div>
                    <div>Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-900 dark:text-slate-50">
                      Today
                    </div>
                    <div>Updated</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </ComponentPreview>

      {/* Implementation Example */}
      <ComponentPreview
        title="Implementation Example"
        description="Complete code example showing how to implement the image gallery in your application."
        code={`import { ImageGallery, GalleryImage } from '../components/ui/ImageGallery';
import { useState } from 'react';

const MyPhotoGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      src: '/photos/photo1.jpg',
      alt: 'Beautiful sunset',
      title: 'Golden Sunset',
      description: 'Sunset over the mountains',
      tags: ['Sunset', 'Nature', 'Mountains'],
    },
    // ... more images
  ]);

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    console.log('Selected image:', image.title);
  };

  const handleLike = (image: GalleryImage) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(image.id as number)) {
      newLiked.delete(image.id as number);
    } else {
      newLiked.add(image.id as number);
    }
    setLikedImages(newLiked);
  };

  const handleDownload = (image: GalleryImage) => {
    // Implement download logic
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.title || 'image';
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Photo Gallery</h1>
        <p className="text-slate-500">
          {images.length} photos • {likedImages.size} liked
        </p>
      </div>

      <ImageGallery
        images={images}
        layout="grid"
        columns={4}
        mode="lightbox"
        showOverlay={true}
        showCaptions={true}
        enableLike={true}
        enableDownload={true}
        enableShare={true}
        onImageClick={handleImageClick}
        onLike={handleLike}
        onDownload={handleDownload}
      />

      {selectedImage && (
        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-2">Currently viewing: {selectedImage.title}</h3>
          <p className="text-slate-600">{selectedImage.description}</p>
        </div>
      )}
    </div>
  );
};`}
      >
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-3">
            <div className="h-10 w-10 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <ImageIcon className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50">Feature-Rich Image Gallery</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              The Image Gallery component supports multiple layouts, lightbox view, zoom functionality,
              social features, keyboard navigation, and responsive design.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Lightbox</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Carousel</span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Masonry</span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Zoom</span>
              <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">Social</span>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">Keyboard Nav</span>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default ImageGalleryView;