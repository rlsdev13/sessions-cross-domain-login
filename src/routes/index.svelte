<script lang="ts">
    import Swal2 from 'sweetalert2';

    let correo : string = '';
    let password : string = '';

    const envDomains : string = import.meta.env.VITE_DOMAINS;
    const domains : string[] = envDomains.split(", ");
    const urlBackend : string = import.meta.env.VITE_LOGIN_BACKEND;

    window.addEventListener("message" , messageHandler, true);

    function messageHandler( event : MessageEvent ){
        
        if(!domains.includes(event.origin)){
            return;
        }

        const { action, key, value } = event.data;

        if( action === 'save' ){
            window.localStorage.setItem(key, JSON.stringify(value));
        }else if(action == 'get'){
            const localSItem = window.localStorage.getItem(key)!;
            const item = JSON.parse(localSItem);
            event.source!.postMessage({
                action : 'returnData',
                key,
                item
            });
        }
    }

    const handleLogin = async () => {
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

            Swal2.fire({
                icon : 'success',
                timer : 1000,
                title : 'Sesion iniciada',
                showConfirmButton : false
            });

            window.localStorage.setItem('token',body.access_token);

        } catch (error) {
            Swal2.fire({
                icon : 'error',
                timer : 1200,
                title : 'Correo o contraseña incorrectos',
                showConfirmButton : false
            });
        }
        
                
        
    }

</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 class="text-2xl font-bold text-center">Login</h3>
        <form action="" on:submit|preventDefault={ handleLogin }>
            <div class="mt-4">
                <div>
                    <label class="block" for="email">Email<label>
                    <input 
                        type="text" 
                        placeholder="Email"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        bind:value={ correo }
                    >
                </div>
                <div class="mt-4">
                    <label class="block" for="password">Password<label>
                    <input 
                        type="password" 
                        placeholder="Password"
                        name="password"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                        bind:value={ password }
                    />
                </div>
                <div class="flex items-baseline justify-between">
                    <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                </div>
            </div>
        </form>
    </div>
</div>
