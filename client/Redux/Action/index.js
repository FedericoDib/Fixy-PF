
import axios from 'axios'
const GOOGLE_SIGN_UP = 'GOOGLE_SIGN_UP'

const googleSignUp = ()=>{
  return function(dispatch) {
    return axios.get('https://localhost:3000/google')
    .then((response)=> console.log(response))
  }
}