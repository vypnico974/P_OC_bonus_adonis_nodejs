import { Ioc } from '@adonisjs/fold'
import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ContactService } from '../app/Services/ContactService'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    this.app.container.singleton('ContactService', (ioc: Ioc) =>{
      return new ContactService('vypnicolas@gmail.com', ioc.resolveBinding('Adonis/Addons/Mail'), 
      ioc.resolveBinding('Adonis/Core/Validator') )
    })
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
