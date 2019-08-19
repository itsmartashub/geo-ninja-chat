<template>
    <div class="welcome container">
        <div class="card">
            <div class="card-content center-align">
                <h2 class="teal-text">Welcome</h2>

                <form @submit.prevent="enterChat">
                    <label for="ime">Enter ur name:</label>
                    <input type="text" name="ime" v-model="ime">
                    <p v-if="feedback" class="red-text">{{ feedback }}</p>
                    <button class="btn teal">Enter Chat</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Welcome',
    data() {
        return {
            ime: null, // "povezano" sa v-model, dakle koju vrednost korisnik unese u to polje gde je v-model="ime" tu vrednost ce potom ovaj property imati za vrednost. Difolno je ta vrednost null, dok je korisnik 'ne promeni' svojim unosom
            feedback: null
        }
    },

    methods: {
        enterChat() {
            // console.log(this.ime);
            if (this.ime) {
                // kada unesemo ime i kliknemo na submit dugme prvo zelimo da nas redirektuje na chat url
                this.$router.push({ name: 'chat', params: {imeProps: this.ime }}) // a potom uz tu redirekciju i "prosledjujemo" i neki podatak/props koji se vodi kao params, a potom naziv propsa koji sadrzi neku vrednost, ustvari tu vrednost prosledjujemo odavde (this.ime), ovo imeProps mora biti isto kao u chat-u naziv propsa koji prihvatamo. Ovo params nije vidljivo u url-u, kao onaj params druge vrste sa :neki_parametar kada navodimo, ali se pozivaju istim propertyjem params
            } else {
                this.feedback = 'You must enter ur name to join'
            }
        }
    }
}
</script>

<style lang="scss">
.welcome {
    max-width: 400px;
    margin-top: 100px;

    h2 {
       font-size: 3em; 
    }

    button {
        margin: 30px auto;
    }
}
</style>