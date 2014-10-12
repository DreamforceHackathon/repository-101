import UIKit
import QuartzCore

class LeadController : UIViewController, CallViewDelegate {
  @IBOutlet weak var menuButton: UIBarButtonItem!
  @IBOutlet weak var leadImage: UIImageView!
  @IBOutlet weak var productName: UILabel!
  @IBOutlet weak var productPrice: UILabel!
  @IBOutlet weak var leadName: UILabel!
  @IBOutlet weak var leadImageView: UIImageView!
  @IBOutlet weak var bottomView: UIView!
  @IBOutlet weak var infoBottomView: UIView!
  @IBOutlet weak var leadCity: UILabel!
  @IBOutlet weak var leadCompany: UILabel!
  @IBOutlet weak var lastCalled: UILabel!
  var phone:Phone!;

  @IBAction func callButtonPressed(sender: AnyObject) {
    infoBottomView.hidden = true
    globalCallView = NSBundle.mainBundle().loadNibNamed("CallView", owner: self, options: nil).first as? CallView
    globalCallView?.delegate = self
    
    globalCallView?.notesField.layer.borderColor = UIColor.lightGrayColor().CGColor
    globalCallView?.notesField.layer.borderWidth = 1.0
    
    bottomView.addSubview(globalCallView!)
    
    phone.connect("805-469-5940")
    
    MRProgressOverlayView.showOverlayAddedTo(self.view, title: "Dialing...", mode: MRProgressOverlayViewMode.Indeterminate, animated: true)


    var timer = NSTimer.scheduledTimerWithTimeInterval(3, target: self, selector: Selector("dismissHUD"), userInfo: nil, repeats: false)
    
    timer.fire()

  }
  
  
  
  var globalCallView:CallView?

  let url = ""
  var leads:[[String:String]]!
  var leadIndex = 0
  
    
  
  override func viewDidLoad() {
    super.viewDidLoad()
    var showedLogin : NSString? = NSUserDefaults.standardUserDefaults().objectForKey("showedLogin") as? NSString
    if showedLogin == "blah"      //Check for first run of app
    {
        let loginStoryBoard = UIStoryboard(name: "LoginController", bundle: nil)
        let loginController = loginStoryBoard.instantiateInitialViewController() as LoginController
        self.presentViewController(loginController, animated: true, completion: nil)
        
        NSUserDefaults.standardUserDefaults().setObject("true", forKey: "showedLogin")
        NSUserDefaults.standardUserDefaults().synchronize()
    }
    
    println(showedLogin)
    
    menuButton.target = self.revealViewController()
    menuButton.action = Selector("revealToggle:")
    
    view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
    
    let avenirNext:UIFont = UIFont(name: "Avenir Next", size: 20)
    let titleDict:NSDictionary = [NSFontAttributeName: avenirNext,NSForegroundColorAttributeName: UIColor.whiteColor()]
    navigationController?.navigationBar.titleTextAttributes = titleDict

    navigationController?.navigationBar.setBackgroundImage(UIImage(), forBarMetrics: UIBarMetrics.Default)
    navigationController?.navigationBar.shadowImage = UIImage()


    leadImageView.layer.cornerRadius = leadImageView.frame.size.width / 2
    leadImageView.clipsToBounds = true
    
    leads = getData()
    
    setUpView()
    
    self.phone = Phone();
  }
  
  func closedButtonPressed(sender: AnyObject) {
    
  //    change color of button
  }
  
  func notClosedButtonPressed(sender: AnyObject) {
  //    change color of button
  }
  
  func endCallButtonPressed(callView: CallView, sender: AnyObject) {
    globalCallView?.hidden = true
    infoBottomView.hidden = false
    
    leadIndex += 1
    setUpView()
  }
  
 
  
  func getData() -> [[String:String]]{
    var data = [
      [ "name": "John Smith",
        "company" : "Google",
        "city": "San Francisco",
        "lastContacted": "4 days ago",
        "photoUrl" : "www.example.com",
        "otherCompany" : "Tesla",
        "price" : "$60,0000",
        "productName" : "Model S"

      ],
      [ "name": "George Fool",
        "company" : "Yahoo",
        "city" : "San Mateo",
        "lastContacted" : "Never",
        "photoUrl" : "www.example.comn",
        "otherCompany" : "Apple",
        "price" : "$1,000",
        "productName" : "iWatch"
      ]

    ]
    
    return data
  }
  
  func setUpView() {
    if leadIndex < leads.count {
      let lead = leads[leadIndex]
      leadName.text = lead["name"]
      productName.text = lead["productName"]
      productPrice.text = lead["price"]
      leadCity.text = lead["city"]
      leadCompany.text = lead["company"]
      lastCalled.text = lead["lastContacted"]
      navigationController?.navigationBar.topItem?.title = lead["otherCompany"]
    } else {
      leadIndex = 0
      setUpView()
    }
  }
    
    func dismissHUD() {
        MRProgressOverlayView.dismissOverlayForView(self.view, animated: true)
    }
    
    func showSuccess() {
        MRProgressOverlayView.showOverlayAddedTo(self.view, title: "Connected", mode: MRProgressOverlayViewMode.Checkmark, animated: true)
    }
}
