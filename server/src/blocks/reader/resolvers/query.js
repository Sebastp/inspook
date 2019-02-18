import { Reader } from '../models'

const Query = {
  readers: () => {
    return Reader.find().exec()
  }
}

export default Query
