<script lang="ts">
    import { onMount } from 'svelte';

    const envDomains : string = import.meta.env.VITE_DOMAINS;
    const urlBackend : string = import.meta.env.VITE_LOGIN_BACKEND;
    const domains : string[] = envDomains.split(", ");

    window.addEventListener("message" , messageHandler, true);

    function messageHandler( event : MessageEvent ){
        
        if(!domains.includes(event.origin)){
            return;
        }

        const { action, correo, password } = event.data;

        if( action === 'login' ){
            handleLogin(correo,password);
        }else if(action === 'get'){
            const item = window.localStorage.getItem('token');
            // if(item){
                parent.postMessage({
                    type : 'returnToken',
                    token : item
                },'*');
            // }
        }else if(action === 'logout'){
            window.localStorage.clear();
            console.log("logout 8080");
            parent.postMessage({
                type : 'logout',
            },'*');
        }else if( action === 'isToken'){
            const token = !!window.localStorage.getItem('token');
            console.log('Exist token');
            parent.postMessage({
                type : 'isToken',
                exist : token,
                token : window.localStorage.getItem('token')
            },'*')
        }
    }

    const handleLogin = async ( correo : string, password : string ) => {
        try {
            const resp = await fetch(`${urlBackend}/auth`,{
                headers: {
                    'Content-Type': 'application/json',
                },
                method : 'POST',
                body : JSON.stringify({ email : correo, password })
            });

            const body = await resp.json();

            if(resp.status != 201){
                throw new Error('Unauthorized')    
            }

            window.localStorage.setItem('token',body.access_token);
            
            parent.postMessage({
                type:"session.loaded",
                token: window.localStorage.getItem('token'),
                user : body
            },"*");    

        } catch (error) {
            return error;
        }
    }

    onMount(() => {
        parent.postMessage({
            type:"iframe.loaded",
        },"*");
    });

</script>
