import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome.vue'
import Chat from './views/Chat'

Vue.use(Router)

// function loadView(view) {
//   return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
// }

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: loadView(Welcome)
      component: Welcome
    },

    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      props: true, // ovim govorimo da kad dodjemo na ovu /chat rutu zelimo da prihvatimo neke props podatke (tipa neki podatak iz drugog componenta), i taj props mu se vodi kao params. Sada idemo u Chat component da taj props nekako PRIHVATIMO
      beforeEnter: (to, from, next) => { // elem, iako korisnik nije uneo ono ime, i props dakle ne postoji samim tim, moze se otici na chat component preko url-a kada rucno ukucamo /chat, sto svakako nije dobro. DA bi to sprecili moramo da postavimo neki od ruter guards. njih ima vise, a mi cemo ovde konretno da koristimo beforeEnter. tu imamo f-ju koja prihvata 3 argumenta:
        // to - gde se redirektujemo, ka kojoj putanji/componenti (ka chat)
        // from - je sa koje url dolazimo,
        // next - je f-ja koju cemo koristiti kada zeimo da kazemo gde sledece zelimo da idemo
        console.log(to.params.imeProps) // dakle zelimo da vidimo da li postoji neki props/params koji saljemo chat-u, i navedemo posle konretan na koji props mislimo, u ovom slucaju na imeProps. I sada ako unesemo ime neko, samo se u konzoli ovo stampa ali se ne redirektuje na Chat component. To je jer moramo da navedemo next() posle ovoga
        next()

        // ali mi zelimo samo ako postoji imeProps da pristupimo/redirektujemo na Chat komponent:
        if(to.params.imeProps) {
          next() // dakle nastavi put do chataa ako psotoji imeProps
        } else {
          next({ name: 'welcome' }) // ako nema imeProps, zelimo da redirektujemo korisnika na Welcome component
        }

      }
    }
  ]
})
