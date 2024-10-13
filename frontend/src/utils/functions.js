export const validImageCheck = (file) => {
  const img = new Image();
  return new Promise((resolve) => {
    // Check if file type is PNG or JPEG
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      resolve('Only PNG and JPEG images are allowed.');
    }

    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < 1024 && img.height < 1024) {
        resolve('');
      } else {
        resolve('Image must be below 1024x1024px');
      }
    };
  });
};

// export const validImageCheck = (file) => {
//   const img = new Image();
//   let message = '';
//   // Check if file type is PNG or JPEG
//   if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
//     message = 'Only PNG and JPEG images are allowed.';
//     return message;
//   }

//   img.src = URL.createObjectURL(file);
//   img.onload = () => {
//     if (img.width < 1024 && img.height < 1024) {
//       message = '';
//     } else {
//       message = 'Image must be below 1024x1024px';
//     }
//     return message;
//   };

//   return message;
// };
