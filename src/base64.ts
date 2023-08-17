export const Extension = {
  PNG: 'png',
  WEBP: 'webp',
} as const;

export type Extension = (typeof Extension)[keyof typeof Extension];

/**
 *
 * @param base64
 * @param type
 * @returns
 */
// export const base64ToPng = (base64: string, type: Extension): Buffer => {
//     const binary = atob(base64)
//     const array = []
//     for (let i = 0; i < binary.length; i++) {
//         array.push(binary.charCodeAt(i))
//     }
//     return new Blob([new Uint8Array(array)], { type })
// }
export const base64ToPng = (base64: string): Buffer => {
  return Buffer.from(base64, 'base64');
};
