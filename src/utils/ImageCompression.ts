import imageCompression from 'browser-image-compression'

// interface CompressOptions {
//   maxSizeMB?: number
//   maxWidthOrHeight?: number
//   quality?: number
// }

export const compressImage = async (
  file: File
): Promise<File> => {
  const imageInfo = await getImageInfo(file)
  const fileSizeMB = file.size / (1024 * 1024)

  let maxSizeMB = 1
  let maxWidthOrHeight = 1280

  if (imageInfo.width > 2024 || imageInfo.height > 2024 || fileSizeMB > 5) {
    // Larger images → allow more size but reduce dimensions a bit
    maxSizeMB = 5
    maxWidthOrHeight = 2024
  } else if (fileSizeMB > 10 || imageInfo.width > 3000) {
    // Extremely large → reduce more, but maintain better dimension
    maxSizeMB = 8
    maxWidthOrHeight = 2560
  }

  const options = {
    maxSizeMB,
    maxWidthOrHeight,
    initialQuality: 0.8,
    useWebWorker: true,
  }

  try {
    const compressedFile = await imageCompression(file, options)
    console.error("image compressed successfully", compressedFile);
    return compressedFile
  } catch (error) {
    console.error('❌ Image compression failed:', error)
    return file // fallback: return original file if compression fails
  }
}

// Helper function to get width and height of image
const getImageInfo = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject

    const reader = new FileReader()
    reader.onload = (e) => {
      img.src = e.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
