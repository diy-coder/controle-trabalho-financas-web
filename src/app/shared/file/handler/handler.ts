export class ArquivoHandler {
  static downloadFromLink(link: string) {
    const downloadLink = document.createElement('a');
    downloadLink.style.display = 'none';

    document.body.appendChild(downloadLink);
    downloadLink.setAttribute('href', link);
    downloadLink.setAttribute('target', '_blank');
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
