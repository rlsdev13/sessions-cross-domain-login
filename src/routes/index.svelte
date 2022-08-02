<script lang="ts">
    const domains = [
        "http://localhost:3001",
        "http://localhost:3002"
    ]
    import { onMount } from 'svelte';

    onMount( async () => {
    })

    window.addEventListener("message" , messageHandler, false);

    function messageHandler( event:any ){
        console.log(typeof event);
        if(!domains.includes(event.origin)){
            return;
        }
        window.localStorage.setItem('token',JSON.stringify(event));

        // const { action, key, value } = event.data;

        // if( action == 'save' ){
        //     window.localStorage.setItem(key, JSON.stringify(value))
        // }else if(action == 'get'){
        //     const localSItem = window.localStorage?.getItem(key);
        //     const item = JSON.parse(localSItem || '');
        //     event.source.postMessage({
        //         action : 'returnData',
        //         key,
        //         item
        //     },'*');
        // }
    }

     const handleClick = () => {
        console.log("ok")
        window.localStorage.setItem('pruebaClick',JSON.stringify("holsa"));

    }

</script>

<!-- <svelte:window on:/> -->

<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 class="text-2xl font-bold text-center">Login</h3>
        <form action="" on:submit|preventDefault>
            <div class="mt-4">
                <div>
                    <label class="block" for="email">Email<label>
                    <input 
                        type="text" 
                        placeholder="Email"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <div class="mt-4">
                    <label class="block" for="password">Password<label>
                    <input 
                        type="password" 
                        placeholder="Password"
                        name="password"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                    />
                </div>
                <div class="flex items-baseline justify-between">
                    <button on:click={handleClick} class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                </div>
            </div>
        </form>
    </div>
</div>
