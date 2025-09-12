<template>
    <div class="avatar">
        <img 
        :src="ImageUrl" 
        :alt="altText" 
        @error="handleImageError"
        class="Avatar__image">
    
    </div>

</template>

<script>

    export default {
        props: {
            ImageUrl:{
                type: String,
                default: ''
            },
            altText: {
                type: String,
                default: 'Аватар пользователя'
            },
            size: {
                type: String,
                default: 'small',
                validator: (value) => ['small', 'medium', 'large'].includes(value)
            }
        },
        methods:{
            handleImageError(event){
                console.error('Ошибка загрузки аватарки')
                console.log(event)
            }
        }
    }
</script>

<style scoped>
    .avatar{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
        
        border: 2px solid #0DFF00;
        background-color: #2C2C2C;
        width: 70px;
        height: 70px;
    }
    .Avatar__image{
        display: block;
        object-fit: contain;
        width: 100%;
        height: 100%;
        
        object-position: center;
    }
    .Avatar.small{
        width: 32px;
        height: 32px;
    }
    .Avatar.medium{
        width: 48px;
        height: 48px;
    }
    .Avatar.large {
        width: 64px;
        height: 64px;
    }
</style>