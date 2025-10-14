// preloading modul - work in progress

export function preloadImages(imageUrls: any) {
  return Promise.all(
    imageUrls.map((url: any) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    })
  );
}
