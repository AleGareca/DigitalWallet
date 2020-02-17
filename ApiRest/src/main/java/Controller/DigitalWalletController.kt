package Controller

import wallet.*

class DigitalWalletController(val digitalWallet: DigitalWallet) {

    val users= digitalWallet.users
    val controllerTransaccion: ControllerTransaction = ControllerTransaction(this)
    val controllerAutentication: ControllerAuthentications=ControllerAuthentications(this)

    fun accountByCVU(cvu: String): Account = digitalWallet.accountByCVU(cvu)
    fun transfer(fromCVU: String, toCVU: String, amount: Double): Any =digitalWallet.transfer(fromCVU, toCVU, amount)
    fun transferMoneyFromCard(fromCVU: String, card: Card, amount: Double) = digitalWallet.transferMoneyFromCard(fromCVU, card, amount)
    fun register(user: User)=digitalWallet.register(user)
    fun assignAccount(user: User, account: Account) =digitalWallet.assignAccount(user, account)
    fun login(email: String, password: String) = digitalWallet.login(email, password)
    fun deleteUser(user: User)=digitalWallet.deleteUser(user)
    fun profileUser(user: User) =   digitalWallet.users

}