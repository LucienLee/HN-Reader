<template lang="pug">
  #app
    header
      img.logo(src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA75JREFUeAHtWDtrFUEUTnxAfD8a0cJSFP9CwCJ1LCxSXxsxYBdtJGApgthZaGmdQvwB6TRgZSMoCILgG0VIIkIi+s3e2XtnvnmcnXvN3sWZgWHPOfN935k5Ozt7905NlVYqUCqQcwWmefF/0Dj2P/nTaOZ6dplOjnYpQI533VzzHtPx2fzM+DBdjklnWnkEunz32phb2QFtVLnLOcRDsMnkcdCcCOA2cIhuBsYahaF9AMCDPjC0P/viY8XUqWm2JmLAr5gcw15two9hoLVq6JnmSoxXj5kEZdfx4DWZACVwzqJvM1f7c8FkwgD4cwHNLcTPCPRqmPkiJ5mgFcF7yFztr4lJAwDw1wKa9wMUJ8x8B8CBZIIWAO8U+k/ma3+e80g+ePMBrXXEQ2eOI8saDoADyQRDANzbzNf+C1ytrzCD5pgKi644vnbLIUQCLBCB9oeSCYYiuEfRv7GG9hcMaNQEfiGg8Qlx7xshJMg6IdwgnkwYMPsG+NdZQ/uvcN1NcMdVGHSF9bWrDkEIsIgAr050iyMSCADyDPo7S2To9AjuuID2hnDLeg0v+XeLpQDHSciBZAILwIfGZdbR/ltc93ooVUiNoSuMr10K8WJxFoph60lYHJHgAUBAbeOXltDQWfRQ6tyLQ5hlPQtxpLilAkfCq7tnNZEQAEDkoiU0dN7DnGEaYvvQ1ZivzTK+qc9iIi+ZEFGE1lPW0/4S0xBfCmAfMzbFZ02Rm0yIKEJrlvW0/xXXwetM2egqxk39vD4XSSEOseC/JwiKmMATnoT2l2sq/OUA5kGNGfXKuqJOMkFQhN559N+sC/8H+jHdlc1tE4GTgrw4zKJMSH6vsoDk45tdvQ0eAdcj7BH4N3RM2dzugfuRgzvuSxUbZQLQPI3+i7Xhb+jOQ18QODRKLuawMI87fjLBUfAHoHuXtSP+Nb9KepRziArJBFGxD4DucXTfs84p3yAQ/LXYMN0AxuKDAW209q8wnufvyHmHJ+DxbwK75Ym3E5IqNs4soL0f/QPnMPznsBv/b9BkLoZ2ZYqcZIKoaAOgf4VzGP4FGz2+Z2hXJis61VYoE4Tt6GDM8VQb8urV69vi60h1OFVPwkvrae0MqCeKRW7Dtopcj03i2noBJrHIWM5SgFh1chgrOyCHuxxbY9kBserkMFZ2QA53ObbGsgNi1clhLPsdsON/igZ2ke/f3ol8IDmfutLnY2BBnQ1L68n+ESgF6OzebWli2e8A8S3Ah0hLN6a1NNnvgFKA1vZaSVQqUCpQKtDBCvwFqj/5DXLg230AAAAASUVORK5CYII=")
</template>

<script>
export default {
  name: 'app',
  components: {
  },
};
</script>

<style lang="sass">
@import 'sass/variables'

body
  background: $background-color

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  font-family: $text-font-family
  font-size: $font-size

header
  height: $header-height
  background: $primary-color
  text-align: center

.logo
  position: relative
  top: 50%
  transform: translateY(-50%)
  width: $logo-size
  height: $logo-size

</style>
