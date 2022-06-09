const myCertificateRenderer = new CertificateRenderer({
  //
  canvasId: "certificate-renderer",
  heading: "Certificate of Participation",
  beforeName:
    "This is to certify that this student has participated in this event. This student has successfully completed this thing that he/she was supposed to complete. This student was successful in doing so. This is to certify that this student has participated in this event. This student has successfully completed this thing that he/she was supposed to complete. This student was successful in doing so.",
  recipientName: "John Doe",
  afterName:
    "This is to certify that this student has participated in this event. This student has successfully completed this thing that he/she was supposed to complete. This student was successful in doing so. This is to certify that this student has participated in this event. This student has successfully completed this thing that he/she was supposed to complete. This student was successful in doing so.",
  signature: "Full Name",
  post: "CEO, The World",
  // Ensure CORS is enabled for other site images
  imgUrl:
    "https://deej4y.github.io/simple-certificate-generator/certificate-background.png",
  fonts: {
    heading:
      "https://fonts.gstatic.com/s/cormorantgaramond/v10/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEO7uj-KzhM.woff2",
    main: "https://fonts.gstatic.com/s/imperialscript/v1/5DCPAKrpzy_H98IV2ISnZBbGrVNfOuPk.woff2",
    recipient:
      "https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5fBBc4.woff2",
    signature:
      "https://fonts.gstatic.com/s/tangerine/v12/IurY6Y5j_oScZZow4VOxCZZM.woff2",
  },
});

myCertificateRenderer.renderCertificate();

document.getElementById("download").addEventListener("click", () => {
  myCertificateRenderer.renderCertificate(true);
  myCertificateRenderer.download();
});
