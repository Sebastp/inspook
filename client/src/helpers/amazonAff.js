import {amazonAccount} from '../env'


export function getLink(isbn){
  var url = "https://www.amazon.com/s?k="+isbn+"&tag="+amazonAccount.assTag;
  return url
}
