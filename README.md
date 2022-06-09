# Simple Certificate Generator

Generate canvas certificates easily.

[Homepage](https://deej4y.github.io/simple-certificate-generator/)

## Installation

Add the script to your html

```html
<script
  type="text/javascript"
  src="https://deej4y.github.io/simple-certificate-generator/certificate.js"
  crossorigin="anonymous"
></script>
```

## Usage

1. Add a canvas element with an id in your html

   ```html
   <canvas id="certificate" width="1920" height="1080"></canvas>
   ```

2. Create a `CertificateRenderer` instance.

   ```js
   const myCertificateRenderer = new CertificateRenderer({
     canvasId: "certificate", // id of your canvas
     heading: "Certificate of Participation",
     beforeName:
       "This is to certify that this student has participated in this event. This student has successfully completed this thing that he/she was supposed to complete. This student was successful in doing so. This is to certify that this student has participated in this event. This student has successfully completed this thing that he/she was supposed to complete. This student was successful in doing so.",
     recipientName: "John Doe",
     afterName:
       "This is to certify that this student has participated in this event. This student has successfully completed this thing that he/she was supposed to complete. This student was successful in doing so. This is to certify that this student has participated in this event. This student has successfully completed this thing that he/she was supposed to complete. This student was successful in doing so.",
     signature: "Full Name",
     post: "CEO, The World",
   });
   ```

3. Call the `renderCertificate` function.

   ```js
   myCertificateRenderer.renderCertificate();
   ```

## `CertificateRenderer` Options

> Important: Ensure CORS is enabled for cross site images and font files(`.woff2`).

| Option            | type     | description                                         | limits                    |
| ----------------- | -------- | --------------------------------------------------- | ------------------------- |
| `canvasId`        | `string` | id of your canvas element.                          | -                         |
| `heading`         | `string` | Heading of the certificate.                         | max length 33 characters  |
| `beforeName`      | `string` | Text that appears before the name of the recipient. | max length 99 characters  |
| `recipientName`   | `string` | Name of the recipient of the certificate.           | max length 80 characters  |
| `afterName`       | `string` | Text that appears after the name of the recipient.  | max length 188 characters |
| `signature`       | `string` | Text that should appear as the signature.           | max length 50 characters  |
| `post`            | `string` | Text that should appear below the signature.        | max length 160 characters |
| `imgUrl`          | `string` | URL of the background image.                        | -                         |
| `fonts`           | `object` | Object for different font options.                  | -                         |
| `fonts.heading`   | `string` | URL to font file for the heading.                   | -                         |
| `fonts.main`      | `string` | URL to font file for the body.                      | -                         |
| `fonts.recipient` | `string` | URL to font file for the recipient name.            | -                         |
| `fonts.signature` | `string` | URL to font file for the signature.                 | -                         |

## Download the certificate

```js
myCertificateRenderer.renderCertificate(true);
myCertificateRenderer.download();
```

## Example outputs

![Example Simple White](/certificates/simple-white.png)
![Example Blue Teal](/certificates/blue-teal.png)
![Example Blue White](/certificates/blue-white.png)
![Example Cream Triangles](/certificates/cream-triangles.png)
![Example Green Gold](/certificates/green-gold.png)
