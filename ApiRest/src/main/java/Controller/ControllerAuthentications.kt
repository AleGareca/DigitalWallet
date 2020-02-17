package Controller

import Validators.Validator
import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.javalin.http.UnauthorizedResponse
import wallet.*
import java.lang.IllegalArgumentException



class ControllerAuthentications(val dwc:DigitalWalletController) {


    fun getAll(ctx: Context) {
        ctx.status(200)
        ctx.json(dwc.users)
    }

    fun getUsers(ctx: Context) {
        ctx.status(200)
        ctx.json(dwc.users.map { UserViewAdapter(
                it.email,
                it.firstName,
                it.lastName,
                it.password,
                it.idCard,
                AccountViewAdapter(
                        it.account!!.cvu,
                        it.account!!.balance,
                        getListTransactions(it)
                )
            )
        })
    }

    private fun getListTransactions(user: User):List<TransactionView> {
        return user.account!!.transactions.map{t->
        TransactionView(
                t.amount,
                t.dateTime,
                t.fullDescription())
        }

    }

    fun getUserIdCard(ctx: Context) {
        val idCard = ctx.pathParam("idCard")
        try {
            require(idCard.isNotBlank()) { throw BadRequestResponse("idCard field is empty") }

            val user = dwc.users.firstOrNull { it.idCard == idCard }
                    ?: throw NotFoundResponse("User with IdCard $idCard does not exist")
            ctx.status(200)
            ctx.json( UserViewAdapter(user.email,user.firstName, user.lastName,user.password,user.idCard, AccountViewAdapter(
                    user.account!!.cvu,
                    user.account!!.balance,
                    user.account!!.transactions.map{t->
                        TransactionView(
                                t.amount,
                                t.dateTime,
                                t.fullDescription())
                    })))

        }catch (e:Exception) {
            ctx.status(400)
            ctx.json(Handler(400,"Bad_Request",e.message!!))
        }
    }

    fun createUser(ctx: Context) {
        val authentication = Validator(ctx)
        val newUser =authentication.validationRegister()
        try {
            val user = User(newUser.idCard, newUser.firstName,
                     newUser.lastName, newUser.email,newUser.password, newUser.isAdmin)

            dwc.register(user)
            dwc.assignAccount(user, Account(user, DigitalWallet.Support.generateNewCVU()))
            ctx.status(201)
            ctx.json(Handler(201,"Ok","The user ${user.fullName()} was created"))

      
        } catch (e: IllegalArgumentException) {
            ctx.status(400)
            ctx.json(Handler(400,"Bad_Request","User is already created"))
        }
    }



    fun loginUser(ctx: Context) {

        val authentication = Validator(ctx)
        val loginUser = authentication.validatorLoginUser()
        try {
            dwc.login(loginUser.email, loginUser.password)
            ctx.status(201)
            ctx.json(Handler(201,"ok","login successful"))
        } catch (exception: LoginException) {
            throw UnauthorizedResponse("Email or password is wrong")
        }
    }

    fun deleteUsersCvu(ctx: Context){
        val cvu= ctx.pathParam("cvu")
        try {
            val user = dwc.users.firstOrNull { it.account!!.cvu == cvu }
                    ?: throw NotFoundResponse("User with CVU $cvu does not exist in the system")
            dwc.deleteUser(user!!)
            ctx.status(201)
            ctx.json(Handler(201,"ok","The user ${user.fullName()} with cvu ${user.account!!.cvu} was delete"))
        }catch (e:IllegalArgumentException){
            ctx.status(401)
            ctx.json(Handler(401, "Unable", e.message!!))

        }catch (e:NotFoundResponse){
            ctx.status(401)
            ctx.json(Handler(401, "Bad_Request", e.message!!))

        }

    }
    
}


