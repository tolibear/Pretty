import { ImageUrls } from "@/lib/image-service"

export default function TestImagesPage() {
  // Generate test URLs
  const testImages = {
    cyberpunkStyle: ImageUrls.styleImage('Cyberpunk Neon Dreams', 'cyberpunk'),
    vintageStyle: ImageUrls.styleImage('Vintage Film Photography', 'vintage'),
    abstractStyle: ImageUrls.styleImage('Abstract Fluid Waves', 'abstract'),
    creatorAvatar: ImageUrls.creatorAvatar('neonartist'),
    userAvatar: ImageUrls.userAvatar('artlover'),
    collectionCover: ImageUrls.collectionCover('Cyberpunk Vibes'),
    generationResult: ImageUrls.generationResult('A cyberpunk cityscape at night', 'cyberpunk', '16:9', 'premium')
  }

  return (
    <div className="container py-16 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Image Service Test</h1>
        <p className="text-muted-foreground mt-2">Testing automatic image generation</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Style Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Cyberpunk Style</h3>
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                <img 
                  src={testImages.cyberpunkStyle} 
                  alt="Cyberpunk style" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load cyberpunk image:', testImages.cyberpunkStyle)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground break-all">{testImages.cyberpunkStyle}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Vintage Style</h3>
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                <img 
                  src={testImages.vintageStyle} 
                  alt="Vintage style" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load vintage image:', testImages.vintageStyle)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground break-all">{testImages.vintageStyle}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Abstract Style</h3>
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                <img 
                  src={testImages.abstractStyle} 
                  alt="Abstract style" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load abstract image:', testImages.abstractStyle)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground break-all">{testImages.abstractStyle}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Avatars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Creator Avatar</h3>
              <div className="w-24 h-24 bg-muted rounded-full overflow-hidden">
                <img 
                  src={testImages.creatorAvatar} 
                  alt="Creator avatar" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load creator avatar:', testImages.creatorAvatar)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground break-all">{testImages.creatorAvatar}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">User Avatar</h3>
              <div className="w-24 h-24 bg-muted rounded-full overflow-hidden">
                <img 
                  src={testImages.userAvatar} 
                  alt="User avatar" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load user avatar:', testImages.userAvatar)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground break-all">{testImages.userAvatar}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Other Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Collection Cover</h3>
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                <img 
                  src={testImages.collectionCover} 
                  alt="Collection cover" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load collection cover:', testImages.collectionCover)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground break-all">{testImages.collectionCover}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Generation Result</h3>
              <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden">
                <img 
                  src={testImages.generationResult} 
                  alt="Generation result" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load generation result:', testImages.generationResult)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground break-all">{testImages.generationResult}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 