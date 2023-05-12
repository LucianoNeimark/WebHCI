<script>
</script>

<template>
    <VFooter
        app
        color="footer"
        dark
    >
            <VCol cols="4">
                Contactenos por <a href="mailto:smart@itba.edu.ar" class="email-link">smart@itba.edu.ar</a>
            </VCol>
            <VCol class="copyright" cols="4">
                &copy; {{ new Date().getFullYear() }} Copyright — Grupo 2
            </VCol>
    </VFooter>
</template>

<style scoped>
.copyright {
    text-align: center;
}
</style>