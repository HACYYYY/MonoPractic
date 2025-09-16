<template>
    <RouterLink to="" class="cartBox" @click="$emit('cak', textOne)">
        <div class="backgroundColor">
            <div class="cartBox--content">
                <img   :src="ImageCart" :alt="altTextCard" class="imgCart">
                <div class="cartBox--text">
                    <h1 >{{textOne}}</h1>
                    <h2>{{textTwo}}</h2>
                    <hr class="palka"/>
            </div>
        </div>

        </div>
        
    </RouterLink>

</template>

<script>
import { RouterLink } from 'vue-router';
export default{
    props:{
        ImageCart:{
            type: String,
            default: ""
        },
        altTextCard:{
            type: String,
            default:""
        },
        textOne:{
            type: String,
            default:""
        },
        textTwo:{
            type: String,
            default:""
        }

    },
    emits:['cak'] 
}
</script>

<style scoped>
.palka {
    visibility: hidden;
    width: 80%;
  margin-top: 1.042vw;
  background: linear-gradient(90deg, rgba(10, 204, 0, 0%) 0%, #0dff00 50%, rgba(8, 153, 0, 0%) 100%);
  height: 3px;
  border: 0;
}
    .cartBox{
        margin: 0;
        text-decoration: none;
        width: 19.792vw;
        border: none;
        margin-top: 3.625vw;
        align-items: center;
        
        background: linear-gradient(-179.914deg, rgba(10, 204, 0, 0%) 0%, #0DFF00 50%, rgba(8, 153, 0, 0%) 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        
    }
    .cartBox:hover{
        transform: translateY(-70px);
         
        >.backgroundColor{
             
            >.cartBox--content{
                
                >.cartBox--text{
                    >hr{
                        visibility: visible;
                        box-shadow: 0 0 50px #0dff00; 
                    }
                }
            }

        }
    }
    .backgroundColor{
        color: azure;
        background-color: black;
        width: calc(100% - 2px);
        height: max-content;
    }
    .cartBox--content{
        
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1 {
  font-size: 1.2vw;
  color: #0dff00;
  font-family: "HACK";
  
}
h2 {
  color: #296300;
  font-size: 1vw;
  font-family: "HACK";
  text-align: center;
}
.cartBox--text{
    padding: 0 2vw;
    justify-content: space-between;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.imgCart{
    width: 7.542vw;
}
</style>