<template>
    <form method="post">
        <Form />
        <button @click="login">ログイン</button>
    </form>
</template>

<script setup>
import Form from '~/components/form.vue'
</script>