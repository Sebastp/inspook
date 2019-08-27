import model from '~/helpers/model'

export const Reader = model({
  name: 'Reader',
  schema: {
    uid: String,//url
    displayName: String,
    avatar: String, // Profile picture
    desc: String, // reader description
    tag: String, // Entrepreneur, Politician etc.
    books: Array, // used cupon ids
    official: Boolean, // if user is authorized to be a support operator
  }
})
