const { Resvg } = require("@resvg/resvg-js");
const {
  promises: { writeFile },
} = require("fs");
const path = require("path");

module.exports = async function render(
  svg
) {
  // Must be between 3000 and 8500
  // timeout = Math.min(Math.max(timeout, 3000), 60 * 1000);

  // const browser = await chromium.puppeteer.launch({
  //   executablePath:
  //     process.env.CHROME_EXE_PATH || (await chromium.executablePath),
  //   args: process.env.CHROME_EXE_PATH ? undefined : chromium.args,
  //   defaultViewport: {
  //     width: viewport[0],
  //     height: viewport[1],
  //     deviceScaleFactor: parseFloat(dpr),
  //   },
  //   headless: chromium.headless,
  // });

  // const page = await browser.newPage();

  // if (!withJs) {
  //   page.setJavaScriptEnabled(false);
  // }

  // let response = await Promise.race([
  //   await page
  //     .setContent(html, { waitUntil: "domcontentloaded", timeout })
  //     .then(
  //       page.evaluate(async () => {
  //         const selectors = Array.from(document.querySelectorAll("img"));
  //         await Promise.all([
  //           document.fonts.ready,
  //           ...selectors.map((img) => {
  //             // Image has already finished loading, let’s see if it worked
  //             if (img.complete) {
  //               // Image loaded and has presence
  //               if (img.naturalHeight !== 0) return;
  //               // Image failed, so it has no height
  //               throw new Error("Image failed to load");
  //             }
  //             // Image hasn’t loaded yet, added an event listener to know when it does
  //             return new Promise((resolve, reject) => {
  //               img.addEventListener("load", resolve);
  //               img.addEventListener("error", reject);
  //             });
  //           }),
  //         ]);
  //       })
  //     ),
  //   new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(false); // false is expected below
  //     }, timeout - 1500); // we need time to execute the window.stop before the top level timeout hits
  //   }),
  // ]);

  // //   if (!wait) {
  // //       await Promise.race([
  // //         page.setContent(html, {
  // //           waitUntil: wait || ["load"],
  // //           timeout,
  // //         }),
  // //         new Promise((resolve) => {
  // //           setTimeout(() => {
  // //             resolve(false); // false is expected below
  // //           }, timeout - 1500); // we need time to execute the window.stop before the top level timeout hits
  // //         }),
  // //       ]);
  // //   }

  // if (response === false) {
  //   // timed out, resolved false
  //   await page.evaluate(() => window.stop());
  // }

  // // let statusCode = response.status();
  // // TODO handle 4xx/5xx status codes better

  // let options = {
  //   type: format,
  //   encoding: "base64",
  //   fullPage: false,
  //   captureBeyondViewport: false,
  //   clip: {
  //     x: 0,
  //     y: 0,
  //     width: viewport[0],
  //     height: viewport[1],
  //   },
  // };

  // if (format === "jpeg") {
  //   options.quality = 80;
  // }

  // let output = await page.screenshot(options);

  // await browser.close();

  // await sharp(svgBuffer).png().toFile("rawr.png")
  // const pngBuffer = await sharp(svgBuffer).png().toBuffer()
  const resvg = new Resvg(svg, {
    font: {
      fontFiles: ['../_fonts/Inter-Regular.ttf', '../_fonts/Inter-Bold.ttf'], // Load custom fonts.
      // fontFiles: ['../_fonts/Inter-Bold.ttf'], // Load custom fonts.
      loadSystemFonts: false, // It will be faster to disable loading system fonts.
      defaultFontFamily: 'Inter',
    },
    logLevel: 'debug'
  });
  const pngBuffer = resvg.render().asPng();

  const output = bufferToBase64(pngBuffer);

  return output;
};

function bufferToBase64(buf) {
  return buf.toString("base64");
}
