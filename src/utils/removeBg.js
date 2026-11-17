
export function removeLightBackground(
  src,
  { bright = 180, tolerance = 35, cropBottom = 0 } = {}
) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const w = img.naturalWidth;
      const fullH = img.naturalHeight;
      const h = Math.round(fullH * (1 - cropBottom));

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      
      ctx.drawImage(img, 0, 0, w, fullH, 0, 0, w, fullH);

      const imageData = ctx.getImageData(0, 0, w, h);
      const d = imageData.data;

      const isBg = (p) => {
        const i = p * 4;
        const r = d[i], g = d[i + 1], b = d[i + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        return max - min < tolerance && min > bright;
      };

      const visited = new Uint8Array(w * h);
      const stack = [];

      const tryPush = (x, y) => {
        if (x < 0 || y < 0 || x >= w || y >= h) return;
        const p = y * w + x;
        if (visited[p] || !isBg(p)) return;
        visited[p] = 1;
        stack.push(p);
      };

      for (let x = 0; x < w; x++) {
        tryPush(x, 0);
        tryPush(x, h - 1);
      }
      for (let y = 0; y < h; y++) {
        tryPush(0, y);
        tryPush(w - 1, y);
      }

      while (stack.length) {
        const p = stack.pop();
        d[p * 4 + 3] = 0;
        const x = p % w;
        const y = Math.floor(p / w);
        tryPush(x + 1, y);
        tryPush(x - 1, y);
        tryPush(x, y + 1);
        tryPush(x, y - 1);
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => reject(new Error(`Image not load: ${src}`));
    img.src = src;
  });
}