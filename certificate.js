class CertificateRenderer {
  constructor({
    canvasId,
    heading,
    mainFirst,
    mainLast,
    recipientName,
    signature,
    post,
    imgUrl,
    fonts,
  }) {
    this.canvasId = canvasId || "";
    this.heading = heading || "";
    this.mainFirst = mainFirst || "";
    this.mainLast = mainLast || "";
    this.recipientName = recipientName || "";
    this.signature = signature || "";
    this.post = post || "";
    this.imgUrl =
      imgUrl ||
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    this.canvas = "Not yet rendered";
    this.fonts = fonts || {};
    this.fonts.heading =
      fonts?.heading ||
      "https://fonts.gstatic.com/s/cormorantgaramond/v10/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEO7uj-KzhM.woff2";
    this.fonts.main =
      fonts?.main ||
      "https://fonts.gstatic.com/s/imperialscript/v1/5DCPAKrpzy_H98IV2ISnZBbGrVNfOuPk.woff2";
    this.fonts.recipient =
      fonts?.recipient ||
      "https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5fBBc4.woff2";
    this.fonts.signature =
      fonts?.signature ||
      "https://fonts.gstatic.com/s/tangerine/v12/IurY6Y5j_oScZZow4VOxCZZM.woff2";
  }

  renderCertificate = async (forDownload) => {
    var headingFont = new FontFace("HeadingFont", `url(${this.fonts.heading})`);
    var mainFont = new FontFace("NameFont", `url(${this.fonts.main})`);
    var nameFont = new FontFace("MainFont", `url(${this.fonts.recipient})`);
    var signatureFont = new FontFace(
      "SignatureFont",
      `url(${this.fonts.signature})`
    );

    const font1 = await headingFont.load();
    document.fonts.add(font1);

    const font2 = await mainFont.load();
    document.fonts.add(font2);

    const font3 = await nameFont.load();
    document.fonts.add(font3);

    const font4 = await signatureFont.load();
    document.fonts.add(font4);

    this.certificateBackground = new Image();
    this.certificateBackground.crossOrigin = "anonymous";
    this.certificateBackground.src = this.imgUrl;
    this.certificateBackground.onload = () => {
      this.afterFontLoad(forDownload);
    };
  };

  download = function () {
    let link = document.createElement("a");
    link.download = `${this.heading ? this.heading : "certificate"}.png`;
    link.href = document.getElementById(this.canvasId).toDataURL();
    link.click();
    link.remove();
  };

  afterFontLoad = (forDownload) => {
    this.canvas =
      document.getElementById(this.canvasId) || "Please add a canvas id";
    let ctx = this.canvas.getContext("2d");
    if (!forDownload) {
      this.canvas.width = window.innerWidth * 0.98;
    } else {
      this.canvas.width = 1920;
    }

    this.canvas.height = (this.canvas.width / 16) * 9;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.drawImage(
      this.certificateBackground,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    ctx.font = `${this.canvas.width * (90 / 1920)}pt HeadingFont`;
    ctx.textAlign = "center";
    this.wrapText(
      ctx,
      this.heading.slice(0, 33),
      this.canvas.width / 2,
      this.canvas.width * (284 / 1920),
      this.canvas.width * 0.8875,
      this.canvas.width * (128 / 1920)
    );

    ctx.font = `${this.canvas.width * (28 / 1920)}pt MainFont`;

    this.wrapText(
      ctx,
      this.mainFirst.slice(0, 99),
      this.canvas.width / 2,
      this.canvas.width * (460 / 1920),
      this.canvas.width * 0.8,
      this.canvas.width * (64 / 1920)
    );

    ctx.font = `${this.canvas.width * (64 / 1920)}pt SignatureFont`;

    this.wrapText(
      ctx,
      this.recipientName.slice(0, 80),
      this.canvas.width / 2,
      this.canvas.width * (582 / 1920),
      this.canvas.width * 0.8875,
      this.canvas.width * (64 / 1920)
    );

    ctx.font = `${this.canvas.width * (28 / 1920)}pt MainFont`;

    this.wrapText(
      ctx,
      this.mainLast.slice(0, 188),
      this.canvas.width / 2,
      this.canvas.width * (675 / 1920),
      this.canvas.width * 0.8,
      this.canvas.width * (64 / 1920)
    );

    ctx.font = `${this.canvas.width * (42 / 1920)}pt NameFont`;

    this.wrapText(
      ctx,
      this.signature.slice(0, 50),
      this.canvas.width / 2,
      this.canvas.width * (888 / 1920),
      this.canvas.width * 0.8875,
      this.canvas.width * (64 / 1920)
    );

    ctx.font = `300 ${this.canvas.width * (18 / 1920)}pt MainFont`;

    this.wrapText(
      ctx,
      this.post.slice(0, 160),
      this.canvas.width / 2,
      this.canvas.width * (934 / 1920),
      this.canvas.width * 0.8875,
      this.canvas.width * (64 / 1920)
    );
  };

  wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    var cars = text.split("\n");
    var yOriginal = y;

    for (var ii = 0; ii < cars.length; ii++) {
      var line = "";
      var words = cars[ii].split(" ");

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (cars.length === 1 && testWidth < 856) {
        } else {
        }
        if (testWidth > maxWidth) {
          context.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }

      context.fillText(line, x, y);
      y += lineHeight;
    }
    let textHeight = y - yOriginal;
    let startPoint = (1080 - textHeight + 1.5 * lineHeight) / 2;
    return startPoint;
  };
}
