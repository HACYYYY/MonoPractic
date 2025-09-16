<template>
    <div class="footerBox">
        <hr class="palka"/>
        <div class="footerContent">
            <div class="footerText--one">
                <span class="leftText--one">Email: kkllovn@gmail.com  
</span>
                <span class="leftText--two">Телефон: +7 (958) 670-70-96  
</span>
                <span class="leftText--three">Адрес: оренбург, ул. чкалова, 11  </span>
            </div>
            <div class="footerText--two">
                <span class="rightText--one">Осторожно! Наши проекты вызывают привыкание</span>
                <span class="rightText--two">© 2024 TOXIN DEV. Все права защищены.</span>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
    span{
        color: #0DFF00;
        font-family: "HACK";
    }
    .leftText--one{
        font-size: 1.25vw;
    }
    .leftText--two{
        font-size: 1.25vw;
    }
    .leftText--three{
        font-size: 1.25vw;
    }
    .rightText--one{
        font-size: 1.25vw;
    }
    .rightText--two{
        font-size: 0.625vw;
    }
    .footerContent{
        display: flex;
        justify-content: space-between;
    }
    .footerText--one{
        display: flex;
        flex-direction: column;
    }
    .footerText--two{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
    }
    .footerBox{
        margin-top: 5vw;
        margin-bottom: 1vw;
        width: 100%;
    }
    .palka {
    width: 80%;
  margin-bottom: 3.042vw;
  background: linear-gradient(90deg, rgba(10, 204, 0, 0%) 0%, #0dff00 50%, rgba(8, 153, 0, 0%) 100%);
  height: 1px;
  border: 0;
}
</style>