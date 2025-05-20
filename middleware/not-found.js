const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Page Not Found</title>
      <style>
        body {
          background: #f4f4f9;
          color: #444;
          font-family: 'Segoe UI', Tahoma, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .wrapper {
          text-align: center;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          max-width: 400px;
        }
        h1 { font-size: 4rem; margin-bottom: 0.5rem; }
        p { margin: 1rem 0; }
        a.button {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          background: #4a90e2;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
        }
        a.button:hover { background: #357abd; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <h1>404</h1>
        <p>Sorry, we can’t find that page.</p>
        <a href="/" class="button">Back to Home</a>
      </div>
    </body>
    </html>
  `;
const notFoundMiddleware = (req, res) => {
  res.status(404).send(html);
};

module.exports = notFoundMiddleware;
