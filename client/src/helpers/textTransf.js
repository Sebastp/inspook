export function onShelves(nr){
  if (nr>1) {
    return 'On '+nr+' Shelves'
  }else {
    return 'On '+nr+' Shelve'
  }
}

export function friendlyBookUrl(title, ISBN){
  return (title.replace(/ /g,"-") + '_' + ISBN).replace(/[^a-zA-Z0-9-_]/g, '')
}
