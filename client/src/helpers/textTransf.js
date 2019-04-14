export function onShelves(nr){
  if (nr>1) {
    return 'on '+nr+' shelves'
  }else {
    return 'on '+nr+' shelve'
  }
}

export function friendlyBookUrl(title, ISBN){
  return (title.replace(/ /g,"-") + '_' + ISBN).replace(/[^a-zA-Z0-9-_]/g, '')
}
