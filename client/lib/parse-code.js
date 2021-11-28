const parseCode = (htmlInput, cssInput, javascriptInput) => {
  cssInput = `<style>${cssInput}</style>`;
  javascriptInput = `<script>${javascriptInput}</script>`;

  htmlInput = htmlInput.replace('<head>', '');
  htmlInput = htmlInput.replace('</head>', '');
  htmlInput = htmlInput.replace('<body>', '');
  htmlInput = htmlInput.replace('</body>', '');

  htmlInput += cssInput;
  htmlInput += javascriptInput;

  return htmlInput;
};

export default parseCode;
