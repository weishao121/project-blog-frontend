import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: `https://fathomless-coast-08504.herokuapp.com/` // heroku
    baseURL: 'http://localhost:8081/' // local
  })
}
