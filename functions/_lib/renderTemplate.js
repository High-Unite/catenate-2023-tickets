const QRCode = require("qrcode-svg");

module.exports = async function renderTemplate({ id, name }) {
    // const qrDataUrl = await QRCode.toDataURL(
    //     JSON.stringify({ id, name })
    //   )
    const svg = new QRCode(JSON.stringify({ id, name })).svg("g");
  return `
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Catenate Ticket Template</title>

    <style>
        :root {
        --color-bg: #69f7be;
        --color-text-main: #000000;
        --color-primary: #ffff00;
        --wrapper-height: 100vh;
        --font-family: "Albert Sans", -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
        --font-family-header: "Albert Sans", -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
        }

        /* Basic page style resets */
        * {
        box-sizing: border-box;
        }
        [hidden] {
        display: none !important;
        }

        body,
        html {
        margin: 0;
        padding: 0;
        }

        body {
        font-family: var(--font-family);
        background-color: var(--color-bg);
        }

        /* Page structure */
        .wrapper {
        min-height: var(--wrapper-height);
        display: flex;
        flex-direction: column;
        }

        .content {
        padding: 0 4em;
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        }

        .footer {
        padding: 1em;
        background-color: white;
        display: flex;
    justify-content: space-between;
        }
        .person {
            padding-right: 2em;
        }
        
        .person__name {
        font-size: 2.5rem;
        font-weight: bold;
        }
        
        .person__id {
        font-size: 1.5rem;
        margin-top: 0.5rem;
        }

        .qr-code__image {
        border-radius: 1em;
        overflow: hidden;
        width: 100%; 
        height: auto;
        }
        .qr-code {
            width: 180px;
        }
    </style>
    </head>
    <body>
    <div class="wrapper">
        <main class="content">
        <div class="person">
            <div class="person__name name">
            ${name}
            </div>
            ${
              id
                ? `
            <div class="person__id id">
            ${id}
            </div>
            `
                : ``
            }
        </div>
        <div class="qr-code">
            <svg class="qr-code__image" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                ${svg}
            </svg>
        </div>
        </main>
        <footer class="footer">
        <div class="footer__logo logo">CATENATE</div>
        <div class="footer__admit-one">Admit One</div>
        <div class="footer__date date">August 29, 2020</div>
        </footer>
    </div>
    </body>
</html>`;
};
