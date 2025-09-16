<script>
import { Teleport } from 'vue';

export default {
    props: {
        a:{
            type: String
        }
    },
    emits: ['exit']
}

</script>

<template>
    <Teleport to="body" :disabled="!!a"> 
        <div class="box" @click="$emit('exit')" v-if="a">
            <div class="model">
                <input type="text" :value="a">
                <h1>dadfasgsdfgsef</h1>
                <h2>afawfaw</h2>

            </div>
            
        </div>

    </Teleport>
</template>

<style scoped>
    .box{
        background-color: rgb(0, 0, 0, 20%);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 99;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .model{
        background-color: rgb(0, 0, 0, 90%);
        width: 20vw;
        height: 10vw;
        border: 3px solid #0DFF00;
        border-radius: 30px;
    }
    h1{
        color: white;
    }
    h2{
        color: white;
    }
</style>
