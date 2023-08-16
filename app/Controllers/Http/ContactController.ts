import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { ContactService } from '../../Services/ContactService'
import ContactService from '@ioc:ContactService'
// import { inject } from '@adonisjs/fold'

// @inject()
export default class ContactController {  

    // constructor (private service: ContactService) {
        
    // }
    
    async contact({view}:HttpContextContract){
        return view.render('contact')
    }
 
    async store({request, response, session}:HttpContextContract) {
        // ContactService.send(request.all() as any)
        ContactService.send(request.all() as any) // this.service.send
        session.flash('success', 'Votre demande de contact a bien été envoyé')
        return response.redirect().back()
    }
}
