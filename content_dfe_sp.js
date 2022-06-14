function download(content, filename) {
  const a = document.createElement('a') // Create "a" element
  const blob = new Blob([content], { type: "text/html" }) // Create a blob (file-like object)
  const url = URL.createObjectURL(blob) // Create an object URL from blob
  a.setAttribute('href', url) // Set "a" element link
  a.setAttribute('download', filename) // Set download filename
  a.click() // Start downloading
}

function extractfilename() {
  console.log("test");
  let filename = document.getElementById('conteudo_lblDataEmissao').innerHTML;

  let slash = filename.indexOf("/");
  let dateStr = filename.substring(slash - 2, slash + 8).split('/');
  dateStr = dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0];
  let timeStr = filename.substring(slash + 11, slash + 19).replaceAll(":", "");
  let chave = document.getElementById('conteudo_lblIdCfe').innerHTML.replaceAll(" ", "");
  filename = dateStr + " " + timeStr + " " + chave + ".html";

  return filename;
}

function saveHtml() {
  let content = document.getElementById('conteudo_divMovimento').innerHTML;
  if (!content) return false;

  let filename = extractfilename();

  download(content, filename);

  return true;
}

window.addEventListener('load', (event) => {
  console.log("teste");
  if (saveHtml()) {
    const btnNovaConsulta = document.getElementById('conteudo_btnSair');
    btnNovaConsulta.click();
  }
});