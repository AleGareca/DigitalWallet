package Validators


import Controller.*
import io.javalin.core.validation.Validator
import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.ExceptionMapper
import io.javalin.http.HttpResponseException
import wallet.CreditCard
import wallet.DebitCard
import wallet.DigitalWallet
import java.time.LocalDate



class Validator(ctx: Context) {
    val context = ctx


    fun validationRegister(): UserRegister {


        val newUser = context.bodyValidator(UserRegister::class.java)
                .check({ it.email!!.isNotBlank() }, "Email can't be empty")
                .check({ it.email!!.matches(Regex("^[_a-z0_9-]+(.[_a-z0_9-]+)*@[_a-z0_9-]+(.[_a-z0_9-]+)*(.[a-z]{2,4})$")) }, "You must enter a valid email.Example tp2@gmail.com or tp2@hotmail.com ")
                .check({ it.firstName!!.isNotBlank() }, "Name can't be empty ")
                .check({ it.firstName!!.matches(Regex("^[a-zA-Z*]*$")) }, "The first name can only be composed of latters")
                .check({ it.lastName!!.isNotBlank() }, "Lastname can't be empty ")
                .check({ it.lastName!!.matches(Regex("^[a-zA-Z*]*$")) }, "The last name can only be composed of latters  ")
                .check({ it.password!!.isNotBlank() }, "Password can't be empty")
                .check({ it.idCard!!.isNotBlank() }, "idCard is empty")
                .check({ it.idCard!!.matches(Regex("\\d*")) }, "The Id card can only be composed positive numbers without points")
                .get()

        return newUser
    }

    fun validatoruserCashin(): UserCashIn {
        val userCashIn = context.bodyValidator(UserCashIn::class.java)

                .check({ it.fromCVU.isNotBlank() }, "From cvu can't be empty ")
                .check({ it.fromCVU.matches(Regex("""\d+""")) }, "FromCvu Invalid Format")
                .check({ it.amount.toString().isNotBlank() }, "Amount can't be empty")
                .check({ it.amount.toString().matches(Regex("^\\d+(?:.\\d+)?\$")) }, "Cannot be a negative amount")
                .check({ it.cardNumber.isNotBlank() }, "Card number can't be empty ")
                .check({ it.cardNumber.matches(Regex("^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$")) }, "CardNumber Invalid Format")
                .check({ it.fullName.isNotBlank() }, "Fullname can't be empty ")
                .check({ it.fullName.matches(Regex("^[a-zA-Z*]*$")) }, "FullName Invalid Format ")
                .check({ it.endDate.matches(Regex("[0-9]{0,2}\\/?[0-9]{0,2}\\/?[0-9]{0,4}")) }, "Date Invalid Format")
                .check({ it.securityCode.isNotBlank() }, "Security code can't be empty")
                .check({ it.securityCode.matches(Regex("[0-9]{3}")) }, "Invalid security code")
                .check({ it.typeCard.isNotBlank() }, "Type Card can't be empty").get()

        return userCashIn

    }

    fun validatorCard(cashUser: UserCashIn, date: LocalDate, dwc: DigitalWalletController) {

        try {
            if (cashUser.typeCard == "CreditCard") {
                var card = CreditCard(cashUser.cardNumber, cashUser.fullName, date, cashUser.securityCode)
                dwc.transferMoneyFromCard(cashUser.fromCVU, card, cashUser.amount)
                context.status(201)
                context.json(Handler(201, "Ok", "Transaction Cash in realized"))

            }
            if (cashUser.typeCard == "DebitCard") {

                var card = DebitCard(cashUser.cardNumber, cashUser.fullName, date, cashUser.securityCode)
                dwc.transferMoneyFromCard(cashUser.fromCVU, card, cashUser.amount)
                context.status(201)
                context.json(Handler(201, "Ok", " Transaction Cash in realized"))
            } else {

                context.status(400)
                context.json(Handler(400, "Bad Request", "TypeCard is incorrect"))

            }
        } catch (exception: NoSuchElementException) {
            context.status(400)
            context.json(Handler(400, "Bad Request", "TypeCard is incorrect"))
        }

    }

    fun validatorLoginUser(): UserLogin {
        val userLogin = context.bodyValidator(UserLogin::class.java)
            .check({ it.email.isNotBlank() }, "Email can't be empty ")
            .check({ it.password.isNotBlank() }, "Password can't be empty")
            .check({ it.password.matches(Regex("^[a-zA-Z*]*$")) }, "Password Invalid Format ")
            .get()
        return userLogin
    }

    fun validatorTransfer(): UserTransfer {
        val userTransfer = context.bodyValidator(UserTransfer::class.java)

            .check({ it.fromCVU.isNotBlank() }, "From cvu can't be empty ").check({ it.fromCVU.matches(Regex("""\d+""")) }, "FromCvu Invalid Format")
            .check({ it.toCVU.isNotBlank() }, "To cvu can't be empty ")
            .check({ it.toCVU.matches(Regex("""\d+""")) }, "ToCvu Invalid Format")
            .check({ it.amount > 0 }, "Amount should be greater than zero")
            .check({ it.amount.toString().matches(Regex("^\\d+(?:.\\d+)?\$")) }, "Cannot be a negative amount").get()

        return userTransfer
    }

    fun validatorProfile(): UserProfile {
        val userProfile = context.bodyValidator(UserProfile::class.java)

                .check({ it.email!!.isNotBlank() }, "Email can't be empty")
                .check({ it.email!!.matches(Regex("^[_a-z0_9-]+(.[_a-z0_9-]+)*@[_a-z0_9-]+(.[_a-z0_9-]+)*(.[a-z]{2,4})$")) }, "You must enter a valid email.Example tp2@gmail.com or tp2@hotmail.com ")
                .check({ it.firstName.isNotBlank() }, "Fullname can't be empty ")
                .check({ it.firstName.matches(Regex("^[a-zA-Z*]*$")) }, "FullName Invalid Format ")
                .get()

        return userProfile

    }


}