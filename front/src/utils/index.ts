export const downloadFile = (newBlob: Blob, extension: string) => {
  const blobUrl = window.URL.createObjectURL(newBlob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.setAttribute('download', `downloaded.${extension}`);
  document.body.appendChild(link);
  link.click();
  link?.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);
};
