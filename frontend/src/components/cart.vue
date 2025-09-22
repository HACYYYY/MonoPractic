<template>
    <div class="cartBox" @click="handleClick">
        <div class="backgroundColor">
            <div class="cartBox--content">
                <img :src="getImageUrl" :alt="serviceData?.name || altTextCard" class="imgCart">
                <div class="cartBox--text">
                    <h1>{{ displayTitle }}</h1>
                    <h2>{{ displayDescription }}</h2>
                    <div v-if="serviceData?.price" class="price">{{ serviceData.price }} ₽</div>
                    <hr class="palka"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'Cart',
    props:{
        ImageCart:{
            type: String,
            default: ""
        },
        altTextCard:{
            type: String,
            default: "IT услуга"
        },
        textOne:{
            type: String,
            default: ""
        },
        textTwo:{
            type: String,
            default: ""
        },
        serviceData: { // Новый prop для данных из бэкенда
            type: Object,
            default: null
        },
        price: { // Цена услуги
            type: Number,
            default: 0
        }
    },
    emits:['cak'],
    
    computed: {
        // Используем данные из бэкенда или fallback из props
        displayTitle() {
            return this.serviceData?.name || this.textOne || "IT Услуга"
        },
        
        displayDescription() {
            return this.serviceData?.description || this.textTwo || "Описание услуги"
        },
        
        // Генерируем URL изображения
        getImageUrl() {
            if (this.serviceData?.image_url) {
                return this.serviceData.image_url
            }
            return this.ImageCart || '/1.svg' // fallback изображение
        }
    },
    
    methods: {
        handleClick() {
            // Если есть данные услуги - передаем их, иначе только текст
            const clickData = this.serviceData || { 
                name: this.textOne, 
                description: this.textTwo 
            }
            this.$emit('cak', clickData)
        }
    }
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
    cursor: pointer;
    transition: transform 0.3s ease;
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
    padding: 1.5vw;
}

h1 {
    font-size: 1.2vw;
    color: #0dff00;
    font-family: "HACK";
    text-align: center;
    margin-bottom: 0.5vw;
}

h2 {
    color: #296300;
    font-size: 1vw;
    font-family: "HACK";
    text-align: center;
    line-height: 1.3;
}

.price {
    color: #0dff00;
    font-size: 1.3vw;
    font-weight: bold;
    font-family: "HACK";
    margin: 0.5vw 0;
    text-shadow: 0 0 5px #0dff00;
}

.cartBox--text{
    padding: 0 1vw;
    justify-content: space-between;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
}

.imgCart{
    width: 7.542vw;
    height: 7.542vw;
    object-fit: contain;
    margin-bottom: 1vw;
}
</style>