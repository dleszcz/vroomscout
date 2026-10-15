import { CompressedPhoto } from '@/types/scout';

export async function compressImageClientSide(
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.75
): Promise<CompressedPhoto> {
  const originalSizeKb = Math.round(file.size / 1024);

  return new Promise((resolve, reject) => {
    // If not an image file
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Wybrany plik nie jest obrazem.'));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Resize proportionally if dimensions exceed limits
        if (width > maxWidth || height > maxHeight) {
          if (width / maxWidth > height / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Nie udało się utworzyć kontekstu Canvas'));
        }

        // High quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-efficiency JPEG format (100% universal support across iOS Safari, Android, and Desktop)
        // Avoids WebKit Safari canvas fallback to uncompressed 2MB PNG
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('Błąd kompresji obrazu'));
            }

            const compressedSizeKb = Math.round(blob.size / 1024);
            const previewUrl = URL.createObjectURL(blob);
            const id = `photo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

            resolve({
              id,
              blob,
              previewUrl,
              originalSizeKb,
              compressedSizeKb,
              fileName: file.name.replace(/\.[^/.]+$/, '') + '.jpg',
            });
          },
          'image/jpeg',
          quality || 0.8
        );
      };

      img.onerror = () => {
        reject(new Error('Nie udało się wczytać podanego pliku graficznego.'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Błąd podczas odczytu pliku z pamięci urządzenia.'));
    };
  });
}
