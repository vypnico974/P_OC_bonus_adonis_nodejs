import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from '../../Models/Post'
import UpdatePostValidator from '../../Validators/UpdatePostValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from '../../Models/Category'
//import User from '../../Models/User'
//import session from '../../../config/session'
// import View from '@ioc:Adonis/Core/View'

export default class BlogController {    
    // async index () {
    //     // return {
    //     //     a:3
    //     // }

    //     return View.render('blog/index')
    // } 
    async index({view, request }: HttpContextContract) {
       // const posts = await Post.all()
    //    const user = await User.create({
    //         email:'john@doe.fr',
    //         password:'0000'
    //    })
       const page = request.input('page', 1)
       const posts = await Database.from(Post.table).paginate(page, 2)
        return view.render('blog/index', {
            posts
        })
    }

    async create ({ view}: HttpContextContract){
        const post = new Post()
        const categories = await Category.all()
        return view.render('blog/create', {
            post, categories
        })
    }
    
    async store ({params, request,response, session}: HttpContextContract){
        await this.handleRequest(params,request)
        session.flash({success: "L'article a bien été créé"})
        return response.redirect().toRoute('home')
    }

    async show ({params, view}: HttpContextContract){
        const post = await Post.findOrFail(params.id)
      //    const post = await Post.query().preload('category').where('id',params.id).firstOrFail()
        const categories = await Category.all()
        return view.render('blog/show', {
            post, categories
        })
    }

    async update ({ params, request, response, session}: HttpContextContract){
        // return request.all()
        //return await request.validate(UpdatePostValidator)
        //const post = await Post.findOrFail(params.id)        
        // return request.all()
        await this.handleRequest(params,request)
        session.flash({success: "L'article a bien été sauvegardé"})
        return response.redirect().toRoute('home')
    }

    async destroy ({params, session, response}: HttpContextContract){
        const post = await Post.findOrFail(params.id)
        await post.delete()
        session.flash({success: "L'article a bien été supprimé"})
        return response.redirect().toRoute('home')
    }

    private async handleRequest(params: HttpContextContract['params'], request: HttpContextContract['request'] ){

        const post = params.id ? await Post.findOrFail(params.id) : new Post()
        const data = await request.validate(UpdatePostValidator)
        //console.log(post)
        post
            // .merge(await request.validate(UpdatePostValidator))
            .merge({...data, online: data.online || false})
            .save()
    }
}
