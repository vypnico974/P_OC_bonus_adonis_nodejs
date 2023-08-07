import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from '../../Models/Post'
// import View from '@ioc:Adonis/Core/View'

export default class BlogController {    
    // async index () {
    //     // return {
    //     //     a:3
    //     // }

    //     return View.render('blog/index')
    // } 
    async index({view }: HttpContextContract) {
        const posts = await Post.all()
        return view.render('blog/index', {
            posts
        })
    }

    async show ({params, view}: HttpContextContract){
        const post = await Post.findOrFail(params.id)
        return view.render('blog/show', {
            post
        })
    }
}
