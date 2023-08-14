import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class BlogController {    
   
    async login({view}: HttpContextContract) {
        return view.render('auth/login')

    }

    async doLogin({request, auth, response, session}: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            await auth.use('web').attempt(email, password)
            response.redirect().toRoute('home')
        } catch {
            session.flash({error:'Identifiants incorrects'})
            response.redirect().toRoute('login')
        }
        
    }

   
}