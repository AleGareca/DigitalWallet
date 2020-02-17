package APIs


import Controller.DigitalWalletController
import data.DigitalWalletData
import io.javalin.Javalin
import io.javalin.core.util.RouteOverviewPlugin
import io.javalin.apibuilder.ApiBuilder.*

fun main(args: Array<String>) {

    ApiWallet(7000).init()
}
 class ApiWallet(private val  port:Int){

     fun init():Javalin {
         val app = Javalin.create {
             it.enableCorsForAllOrigins()
             it.registerPlugin(RouteOverviewPlugin("/routes"))

         }.exception(Exception::class.java) { e, ctx ->
             e.printStackTrace()
             ctx.status(500)
             ctx.json("Error fatal")
         }
                 .start(port)
         val digitalWalletController=DigitalWalletController(DigitalWalletData.build())
         val apiControllerAutenticacion = digitalWalletController.controllerAutentication
         val apiControllerTransaccion = digitalWalletController.controllerTransaccion

         app.routes {
             path("register") {
                 post(apiControllerAutenticacion::createUser)
             }
             path("/login") {
                 post(apiControllerAutenticacion::loginUser)
             }
             path("transfer") {
                 post(apiControllerTransaccion::transferUser)
             }
             path("cashIn") {
                 post(apiControllerTransaccion::cashInUser)
             }

             path("/users") {
                 get(apiControllerAutenticacion::getUsers)
             }

             path("/users/idCard/:idCard") {
                 get(apiControllerAutenticacion::getUserIdCard)
             }
             path("/transaccions/:cvu") {
                 get(apiControllerTransaccion::getTransaccionsCvu)
             }
             path("/account/:cvu") {
                 get(apiControllerTransaccion::getAccountCvu)
             }
             path("/users/:cvu") {
                 delete(apiControllerAutenticacion::deleteUsersCvu)
             }
            path("/user"){
                 put(apiControllerTransaccion::profileUser)
             }
         }
         return app
     }
 }
