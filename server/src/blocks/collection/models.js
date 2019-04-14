import model from '~/helpers/model'

export const Collection = model({
  name: 'Collection',
  schema: {
    uid: String,//url
    title: String,
    desc: String, // description
    cover: String, // book cover
    tags: Array,
    books: Array // NIBNs 13
  }
})
