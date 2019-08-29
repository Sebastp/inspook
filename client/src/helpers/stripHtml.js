export function stripHtml(txt){
  var div = document.createElement("div");
  div.innerHTML = txt;
  return(div.innerText)
}
