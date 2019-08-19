<template>
  <!-- <h2>Chat {{ this.imeProps }}</h2> -->
  <!-- kada zelimo da pozovemo ovde taj props, pristupamo mu sa THIS -->
    <div class="chat container">
        <h2 class="center teal-text">Hi <span class="blue-grey-text text-darken-3 ime-caption">{{ imeProps }}</span>, be talkative</h2>
        <div class="card">

            <div class="card-content">
                <ul class="messages" v-chat-scroll>
                    <!-- KASNIJE CEMO ICI SA V-FOR U OVOM LI LUPOVATI I OUTPUTOVAATI SVAKO OVO IME I PORUKU I VREME -->
                    <li v-for="poruka in arrPoruke" :key="poruka.id">
                        <span class="teal-text">{{ poruka.ime }} </span>
                        <span class="grey-text text-darken-3">{{ poruka.sadrzaj }} </span>
                        <span class="grey-text time">{{ poruka.timestamp }} </span>
                    </li>
                </ul>
            </div>

        
            <div class="card-action">
            <!-- OVO CEMO IZDVOJITI U DRUGI COMPONENT -->
                <!-- <input type="text"> -->
                <NewMessage :imeChat="imeProps" />
                <!-- ovde cemo dohvatati poruku korisnika koji cemo slati na bazu, ali isto tako i ime korisnika, pa cemo da bajndujemo imeProps -->
            </div>

        </div> 
    </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'Chat',
    props: ['imeProps'], // u router.js smo naveli u chat delu da je props: true, tj da ocekujemo neki props da nam bude prosledjen iz nekog drugog componenta, a ovde ga ovako prihvatamo i cuvamo u 'promenljivoj' imeProps. imeProps ima vrednost this.ime iz Welcome componenta

    components: {
        NewMessage
    },

    data() {
        return {
            arrPoruke: []
        }
    },

    created() { // kada se kreira component, postavicemo event listener za osluskivanje poruka, prvo da se iz baze printaju sve poruke koje se nalaze u bazi, real time
        // 1. postavljamo referencu za bazu koju zelimo da osluskujemo, u nasem slucaju to je messages
        let ref = db.collection('messages').orderBy('timestamp') // ovo orderBy(timestamp) je da redosled bude realan, tj poredjali smo poruke po vremenu

        // 2. sada zelimo da stavimo listenter za osluskivanje tih poruka. Elem, listener se zove onSnapshot, odnosno kad god se desi neka promena u nasoj ref tj u nasoj bazi messages. Dakle kad se doda, apdejtuje, obrise, edituje, bilo koja promena, uzima se current snapshot baze
        ref.onSnapshot(snapshot => {
            // u snapshot promenkjivoj se sada nalazi sve sto je u bazi messages, ali nas ne zanima trenutno bas sve, vec samo trenutno promene. Mozemo dohvatiti te promene sa:
            console.log(snapshot.docChanges()); // docChanges() momentalno dohvata trenutne promene u bazi. recimo ako dodam novu poruku (type: added), ako obrisem (type: removed) itd,tj te vrste promena se nalaze u type
            
            // kada se nasa aplikacija prvi put startuje, automastki saljemo initial snapshot nase baze, tako da mozemo da izlistamo docse i lupujemo kroz fields i outputujemo ih 
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added') { // ako je type promene 'added' znaci da je dodata nova poruka, i zelimo da je pushujemo u niz arrPoruke koju smo sada formirali gore u data
                    let dok = change.doc
                    // console.log(dok);
                    this.arrPoruke.push({
                        id: dok.id,
                        ime: dok.data().ime, // ne zaboravi data(), jer id se nalazi direkt na doku, a polja (ime, sadrzaj, timestamp) se nalaze u doku, u podacima doka
                        sadrzaj: dok.data().sadrzaj,
                        timestamp: moment(dok.data().timestamp).format('lll')
                    }) // sada mozemo da outputujemo ove poruke u chat component
                }
            })
        })
    }
}
</script>

<style lang="scss">
.chat {
    h2 {
        font-size: 2.6em;
        margin-bottom: 40px;
    }

    li {
        margin-bottom: 12px;
        // background: #f4f4f4;
        padding: 5px 3px;

    }

    span {
        font-size: 1em;
    }

    .time {
        display: block;
        font-size: .5em;
    }

    ul.messages {
        max-height: 50vh;
        overflow: auto;
    }

    ul.messages::-webkit-scrollbar {
        width: 3px;
    }

    ul.message::-webkit-scrollbar-track {
        background: #ddd;
    }

    ul.messages::-webkit-scrollbar-thumb {
        background: #aaa; 
    }

    .ime-caption {
        text-transform: capitalize;
    }
}
</style>