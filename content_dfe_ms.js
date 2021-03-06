function download(content, filename) {
  const a = document.createElement('a') // Create "a" element
  const blob = new Blob([content], { type: "text/html" }) // Create a blob (file-like object)
  const url = URL.createObjectURL(blob) // Create an object URL from blob
  a.setAttribute('href', url) // Set "a" element link
  a.setAttribute('download', filename) // Set download filename
  a.click() // Start downloading
}

function extractfilename() {
  let filename = Array.from(document.querySelectorAll("li")).find(el => el.textContent.match("Protocolo de Autorização:")).textContent;
  let slash = filename.indexOf("/");
  let dateStr = filename.substring(slash - 2, slash + 8).split('/');
  dateStr = dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0];
  let timeStr = filename.substring(slash + 9, slash + 17).replaceAll(":", "");
  let chave = document.getElementsByClassName('chave')[0].textContent.replaceAll(" ", "");
  filename = dateStr + " " + timeStr + " " + chave + ".html";

  return filename;
}

function saveHtml() {
  let content = document.getElementsByClassName('ui-content')[0];
  if (!content) return false;

  content.querySelector("form").remove();
  Array.from(content.querySelectorAll("span"))
    .filter(el => el.textContent.match("click to collapse contents"))
    .forEach(element => element.remove());
  Array.from(content.querySelectorAll("h4"))
    .forEach(el => el.innerHTML = el.querySelector("a").innerHTML);

  content = content.outerHTML;

  let filename = extractfilename();

  download(content, filename);

  return true;
}

window.addEventListener('load', (event) => {
  if (saveHtml()) {
    const btnNovaConsulta = Array.from(document.querySelectorAll("a.btn")).find(el => el.textContent.includes("Nova Consulta"));
    btnNovaConsulta.click();
  }
});