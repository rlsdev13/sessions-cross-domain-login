<script lang="ts">
    const envDomains : string = import.meta.env.VITE_DOMAINS;
    const domains : string[] = envDomains.split(", ");

    window.addEventListener("message" , messageHandler, true);

    function messageHandler( event : MessageEvent ){
        if(!domains.includes(event.origin)){
            return;
        }

        window.localStorage.setItem('token',JSON.stringify(event));

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
</script>

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
                    <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                </div>
            </div>
        </form>
    </div>
</div>
