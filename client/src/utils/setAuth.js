import axios from "axios";

function setAuth(token){
  if (token) {
    console.log('adding token: '+token);
    axios.defaults.headers.common = {'Authorization': `bearer `+token};
    //console.log('added the token');
  } else {
    console.log('deleting token: '+token);
    delete axios.defaults.headers.common;
  }
};

export default setAuth;