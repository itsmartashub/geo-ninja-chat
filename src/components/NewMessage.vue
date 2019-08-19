<template>
    <div class="new-message">
        <form @submit.prevent="addMessage">
            <label for="new-message">New Message (enter to add): </label>
            <input type="text" name="new-message" v-model="novaPoruka">
            <p class="red-text" v-if="feedback">{{ feedback }}</p>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'NewMessage',
    props: ['imeChat'], // NE ZABORAVI, PRIHVATAMO PROPS IZ PARENT COMPONENT (parent je Chat.vue, a tamo smo bajdovali kao :imeChat tj :imeChat="imeProps")


    data() {
        return {
            novaPoruka: null,
            feedback: null
        }
    },

    methods: {
        addMessage() { // zelimo da posaljem oove podatke (dakle poruka, ime i timestamp kada je poruka kreirana) u bazu. Timestamp kreiramo sa Date.now( )
            // console.log(this.novaPoruka, this.imeChat, Date.now());
            if (this.novaPoruka) {
                db.collection('messages').add({ // inace, nismo napravili bazu tj kolekciju sa imenom messages, ali ona ce se ovako sama automatski napraviti
                    sadrzaj: this.novaPoruka,
                    ime: this.imeChat,
                    timestamp: Date.now()
                }).catch(err => console.log(err))

                this.novaPoruka = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a message in order to send one'
            }
        }
    }
}
</script>

<style>

</style>