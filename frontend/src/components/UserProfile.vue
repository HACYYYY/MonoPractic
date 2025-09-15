<template>
  <div class="user-profile">
    <div class="user-profile__info">
      <Avatar :ImageUrl="avatarUrl" :altText="userName" size="medium" class="user-profile__avatar" />
      <div class="user-profile__nameBalance">
        <span class="user-profile__name">{{ userName }}</span>
        <span class="balance-amount">{{ balance }} ₽ </span>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/avatar.vue";
export default {
  components: {
    Avatar,
  },
  props: {
    userName: {
      type: String,
      default: "Пользователь",
    },
    balance: {
      type: [Number, String],
      default: "0",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.625vw;
  color: #ffffff;
}
.user-profile__nameBalance {
  display: flex;
  gap: 0.5208vw;
  flex-direction: column;
}
.balance-amount {
  color: #0dff00;
  text-shadow: 0px 0px 5px #0dff00, 0px 0px 10px #0dff00, 0px 0px 15px #0dff00, 0px 0px 20px #0dff00;
  font-family: "HACK";
  font-size: 1.25vw;
}

.user-profile__info {
  display: flex;
  align-items: center;
  gap: 1.0417vh;
}
.user-profile__name {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.25vw;
}
</style>
