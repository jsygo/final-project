const parseCode = (htmlInput, cssInput, javascriptInput) => {
  cssInput = `<style>${cssInput}</style>`;
  javascriptInput = `<script>${javascriptInput}</script>`;

  htmlInput += cssInput;
  htmlInput += javascriptInput;

  return htmlInput;
};

export default parseCode;
