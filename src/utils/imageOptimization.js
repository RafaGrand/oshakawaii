export const imgOptm = (image) => {
  return image.indexOf('.jpg') !== -1 ? image.replace('.jpg', '_125x.jpg') : image
}