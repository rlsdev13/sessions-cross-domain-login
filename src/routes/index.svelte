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

        const { action, type, message } = event.data;

        if( action === 'login' ){
            const { correo, password } = message;
            handleLogin( correo, password );
        }else if( action === 'logout' ){
            window.localStorage.clear();
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
                parent.postMessage({
                    action : "error",
                    type : "string",
                    message: "Credenciales invalidas",
                },'*'); 
                throw new Error('Unauthorized') 
            }

            const token : string = body.access_token

            window.localStorage.setItem( 'token', token );
            
            parent.postMessage({
                action : "session",
                type : "string",
                message: window.localStorage.getItem('token'),
            },"*");    

        } catch (error) {
            return error;
        }
    }

    onMount(() => {
        console.log("login loaded");
        // window.localStorage.setItem('token','pruebaTokenFirefox');
        parent.postMessage({
            action: "loaded",
            type: "existToken",
            message : window.localStorage.getItem('token')
        },"*");
    });

</script>
