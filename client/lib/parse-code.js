const parseCode = (htmlInput, cssInput, javascriptInput) => {
  // i need to check for <style>, <script>
  // i need to go from the inside, out
  // i dont think im gonna check fro these right now, just <script> and <style>
  // the iframe should deal with the rest but i can deal with it if i run into a problem

  if (!htmlInput.includes('<style>')) {
    htmlInput = `<style>\n${cssInput}\n</style>\n${htmlInput}`;
  } else {
    const htmlComponents = htmlInput.split('<style>');
    htmlComponents[2] = htmlComponents[1].split('</style>')[1];
    htmlComponents[1] = htmlComponents[1].split('</style>')[0];
    htmlComponents[1] = `<style>\n${cssInput}\n${htmlComponents[1]}\n</style>`;

    htmlInput = '';
    for (let i = 0; i < htmlComponents.length; i++) {
      htmlInput += htmlComponents[i];
    }
  }

  if (!htmlInput.includes('<script>')) {
    htmlInput = `${htmlInput}\n<script>\n${javascriptInput}\n</script>`;
  } else {
    const htmlComponents = htmlInput.split('<script>');
    htmlComponents[2] = htmlComponents[1].split('</script>')[1];
    htmlComponents[1] = htmlComponents[1].split('</script>')[0];
    htmlComponents[1] = `<script>\n${javascriptInput}\n${htmlComponents[1]}\n</script>`;

    htmlInput = '';
    for (let i = 0; i < htmlComponents.length; i++) {
      htmlInput += htmlComponents[i];
    }
  }

  return htmlInput;
};

export default parseCode;
