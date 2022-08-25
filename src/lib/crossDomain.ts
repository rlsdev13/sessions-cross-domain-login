


function messageHandler( event : MessageEvent, domains : string[], process : Function ){
        
    if(!domains.includes(event.origin)){
        return;
    }

    const { action, correo, password } = event.data;

    if( action === 'login' ){
        process(correo,password);
    }else if(action === 'get'){
        const item = window.localStorage.getItem('token');
        if(item){
            parent.postMessage({
                type : 'returnToken',
                token : item
            },'*');
        }
    }
}

export default {
    messageHandler
}