
const but = document.querySelector('button');
const titleInput = document.querySelector('#title');
const urlInput = document.querySelector('#url');
const descInput = document.querySelector('#desc');

but.onclick = async () => {
  let md = `- **[${titleInput.value}](${urlInput.value})**`;
  if (descInput.value) md += `: ${descInput.value}`;
  md += `\n`;
  await navigator.clipboard.writeText(md);
  window.close();
};

async function run () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true });
  if (!tab) alert(`No active tab. Weird.`);

  titleInput.value = tab.title;
  urlInput.value = cleanUpURL(tab.url);
  descInput.value = await browser.tabs.executeScript(tab.id, { file: '/desc.js' });
}

function cleanUpURL (str) {
  const url = new URL(str);
  url.hash = '';
  for (const k of url.searchParams.keys()) {
    if (/^utm/.test(k)) url.searchParams.delete(k);
  }
  return url.toString();
}

run();
