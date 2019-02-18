import model from '~/helpers/model'

export const Reader = model({
  name: 'Reader',
  schema: {
    displayName: String,
    avatar: String, // Profile picture
    desc: String, // reader description
    books: Array, // used cupon ids
    official: Boolean, // if user is authorized to be a support operator
  }
})
