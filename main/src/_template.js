const scripts = files =>
  files.map(src => `<script src="${src}" ></script>`).join('');

export const header = () => `
<!DOCTYPE html>
<html lang="de-DE">
    <head>
        <base href="/">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <title>POC</title>       
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900" rel="stylesheet">
    </head>
    <body>
        <div id="root"></div>`;

export const footer = () => `
        <script>
          (function () {
            var start = function () {
              if (window.main) {
                window.main();
              } else {
                console.log('"window.main()" does not exist, waiting…');
                setTimeout(start, 500);
              }
            };
            start();
          })();
        </script>
    </body>
</html>`;

export const start = () => header();
export const end = (bundles) => `
      ${scripts(['assets/js/vendor.js', 'assets/js/client.js'])}
      ${scripts(bundles.filter(src => src !== undefined).map(src => src.file))}
      ${footer()}
`;

export default () => `
  ${header()}
  ${footer()}
`;