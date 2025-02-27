<template>
    <form method="post">
        <Form />
        <button @click="signup">登録</button>
    </form>
</template>

<script setup>
import  Form  from '~/components/form.vue'
</script>