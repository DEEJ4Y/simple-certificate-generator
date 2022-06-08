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
    this.canvasId = canvasId;
    this.heading = heading;
    this.mainFirst = mainFirst;
    this.mainLast = mainLast;
    this.recipientName = recipientName;
    this.signature = signature;
    this.post = post;
    this.imgUrl = imgUrl;
    this.canvas = "Not yet rendered";
    this.fonts = fonts;
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
    this.certificateBackground.src = this.imgUrl;
    this.certificateBackground.onload = () => {
      this.afterFontLoad(forDownload);
    };
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

    ctx.font = `italic ${this.canvas.width * (90 / 1920)}pt HeadingFont`;
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
