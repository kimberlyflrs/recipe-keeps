export function getFromStorage(key){
    if(!key){//no key
        return null;
    }

    try{
        const tokenValue = localStorage.getItem(key);
        if (tokenValue){//if token present 
            return JSON.parse(tokenValue);
        }
        return null;
    }
    catch (err){
        return null;
    }
}

export function setInStorage(key, obj){
    if(!key){
        console.log('Error: Missing key');
    }

    try{
        localStorage.setItem(key, JSON.stringify(obj))
    }
    catch(err){
        console.log(err);
    }
}