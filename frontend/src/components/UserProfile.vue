<template>
     
            <div class="user-profile">
                
                <div class="user-profile__info">
                    <Avatar
                    :ImageUrl="avatarUrl"
                    :altText="userName"
                    size="medium"
                    class="user-profile__avatar"
                    
                    />
                    <div class="user-profile__nameBalance">
                        <span class="user-profile__name">{{ userName }}</span>
                        <span class="balance-amount">{{ balance }} ₽ </span>

                    </div>
                    
                
                </div>
            </div>
            
</template>

<script>
    import Avatar from '@/components/avatar.vue';
    export default{
    components: {
        Avatar
    },
    props:{
        userName: {
            type: String,
            default: 'Пользователь'
        },
        balance:{
            type: [Number, String],
            default: '0'
        },
        avatarUrl:{
            type: String,
            default:''
        }
    }
}
</script>

<style>
    .user-profile{
        display: flex;
        align-items: center;
        gap: 12px;
        color: #ffffff;
    }
    .user-profile__nameBalance{
        display: flex;
        flex-direction: column;
    }
    .balance-amount{
        color: #0DFF00;
        text-shadow: 0px 0px 5px #0DFF00,
        0px 0px 10px #0DFF00,
        0px 0px 15px #0DFF00,
        0px 0px 20px #0DFF00 ;
        font-family: "HACK";
        font-size: 24px;
    }
    
    .user-profile__info{
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .user-profile__name{
        font-family: "HACK";
        font-size: 24px;
    }
</style>