package Controller


import Validators.Validator
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import wallet.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter

class ControllerTransaction(val dwc:DigitalWalletController){


    fun getTransaccionsCvu(ctx: Context) {
        val cvu = ctx.pathParam("cvu")
       try {
           val account = dwc.accountByCVU(cvu)
           ctx.status(200)
           ctx.json(account.transactions.map { t->
               TransactionView(
                       t.amount,
                       t.dateTime,
                       t.fullDescription()) })
       }catch (e:NoSuchElementException){
           ctx.status(400)
           ctx.json(Handler(400,"Bad_Request",e.message!!))
       }

    }

    fun getAccountCvu(ctx: Context) {
        val cvu = ctx.pathParam("cvu")
        try {
            val account = dwc.accountByCVU(cvu)
            ctx.status(200)
            ctx.json(AccountView(account))
        }catch (e:NoSuchElementException) {
            ctx.status(400)
            ctx.json(Handler(400,"Bad_Request",e.message!!))
        }
    }

    fun transferUser(ctx: Context) {
        val transaction = Validator(ctx)
        val transferUser = transaction.validatorTransfer()

        try {

         dwc.transfer(transferUser.fromCVU, transferUser.toCVU, transferUser.amount)
            ctx.status(201)
            ctx.json(Handler(201,"ok","Transfer successful from cvu ${transferUser.fromCVU}"))
        }
        catch (exception : NoMoneyException) {
            ctx.status(400)
            ctx.json(Handler(400, "Bad Request", "Transfer can't be made no money"))
        }
    }

    fun cashInUser(ctx: Context) {
        val transaction = Validator(ctx)
        val cashUser =transaction.validatoruserCashin()

        try {


            var formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
            val date = LocalDate.parse((cashUser.endDate.toString()), formatter)

            if (cashUser.typeCard == "CreditCard") {
                var card = CreditCard(cashUser.cardNumber, cashUser.fullName, date, cashUser.securityCode)
                dwc.transferMoneyFromCard(cashUser.fromCVU, card, cashUser.amount)
                ctx.status(201)
                ctx.json(Handler(201, "Ok", "Transaction Cash in realized"))

            }
            if (cashUser.typeCard == "DebitCard") {

                var card = DebitCard(cashUser.cardNumber, cashUser.fullName, date, cashUser.securityCode)
                dwc.transferMoneyFromCard(cashUser.fromCVU, card, cashUser.amount)
                ctx.status(201)
                ctx.json(Handler(201, "Ok", " Transaction Cash in realized"))

            }
           // transaction.validatorCard(cashUser,date,dwc)// lo quise hacer mas chico en este msj pero no me anda
        }
        catch (exception: NoSuchElementException) {
            //BlockedAccountException
            ctx.status(400)
            ctx.json(Handler(400, "Bad Request", "Transaction Cash in can't be made"))
        }
    }
    fun profileUser(ctx:Context){

        val profile = Validator(ctx)
        val user = profile.validatorProfile()

           try{
         
              for(usuario in dwc.users){

                 if(usuario.account!!.cvu == user.cvu){

                   usuario.firstName = user.firstName;
                   usuario.lastName = user.lastName;
                   usuario.email = user.email;
                   usuario.account!!.balance = user.amount
                
                 }
              }
              ctx.status(201)
                ctx.json(Handler(201, "Ok", " the user ${user.firstName} fue modificado "))

          }
           catch(exception: NoSuchElementException ){

               ctx.status(400)
               ctx.json(Handler(400, "Bad Request", "No se puede modificar el user"))
            
          }
        
        }
}


