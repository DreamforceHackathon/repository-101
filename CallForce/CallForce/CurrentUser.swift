class CurrentUser {
  class var sharedInstance:CurrentUser {
  struct Singleton {
    static let instance = CurrentUser()
    }
    return Singleton.instance
  }
  
  var loggedIn = false
}
