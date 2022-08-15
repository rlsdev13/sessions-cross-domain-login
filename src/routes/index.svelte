<script lang="ts">
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
            const item = window.localStorage.getItem('token')!;
            parent.postMessage({
                type : 'returnToken',
                token : item
            },'*');
        }
    }

    const handleLogin = async ( correo : string, password : string ) => {
        try {
            const resp = await fetch(`${urlBackend}/auth`,{
                headers: {
                    'Content-Type': 'application/json',
                },
                method : 'POST',
                body : JSON.stringify({ correo, password })
            });

            const body = await resp.json();

            if(resp.status != 201){
                throw new Error('Unauthorized')    
            }

            window.localStorage.setItem('token',body.access_token);
            
            parent.postMessage({
                type:"session.loaded",
                token: window.localStorage.getItem('token')
            },"*");    

        } catch (error) {
            return error;
        }
    }

</script>
