package Controller


import wallet.Account
import wallet.Transactional
import wallet.User
import java.time.LocalDateTime

open class Handler(val code: Int, val type: String, open val message: String)

data class UserRegister(val idCard: String, val firstName: String,val lastName: String, val email: String,
                        val password: String, val isAdmin : Boolean) {

    constructor(user: User) : this(user.idCard,user.firstName,user.lastName,user.email,user.password, isAdmin = false)

}
data class UserViewAdapter(val email: String?, val firstName: String?, val lastName: String?,val pasword:String?, val idCard: String?, val account: AccountViewAdapter)

data class UserProfile(val firstName: String,val lastName: String, val email: String,
                       val cvu: String, val amount: Double) {

    constructor(user: User) : this(user.firstName, user.lastName, user.email, user.account!!.cvu,user.account!!.balance)
}

data class UserLogin(val email: String, val password: String)
data class UserTransfer(val fromCVU: String, val toCVU: String, val amount: Double)
data class AccountViewAdapter(val cvu:String?, val balance: Double,val transactions:List<TransactionView>)
data class AccountView(val balance: Double){
    constructor(account : Account) : this(account.balance)
}

data class TransactionView(val amount: Double, val dateTime: LocalDateTime, val fullDescription:String)
data class UserView(val email: String?, val firstName: String?, val lastName: String?,val pasword:String?, val idCard: String?)
{
    constructor(user: User) : this(user.email,user.idCard,user.firstName, user.lastName, user.password)
}

data class UserCashIn(val fromCVU: String, val amount: Double,val cardNumber: String, val fullName:String, val endDate: String, val securityCode: String,val typeCard: String)

