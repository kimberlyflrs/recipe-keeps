import axios from "axios";

function setAuth(token){
  if (token) {
    axios.defaults.headers.common = {'Authorization': `bearer `+token};
    console.log('added the token');
  } else {
    delete axios.defaults.headers.common;
  }
};

export default setAuth;