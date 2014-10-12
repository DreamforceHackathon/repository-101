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
  var phone:Phone!

  @IBAction func callButtonPressed(sender: AnyObject) {
    infoBottomView.hidden = true
    let callView = NSBundle.mainBundle().loadNibNamed("CallView", owner: self, options: nil).first as? CallView
    callView?.delegate = self
    
    callView?.notesField.layer.borderColor = UIColor.grayColor().CGColor
    callView?.notesField.layer.borderWidth = 1.0

    callView?.bounds.size.width = 320

    
    bottomView.addSubview(callView!) 
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
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
    
  }
  
  func closedButtonPressed(sender: AnyObject) {
  //    change color of button
  }
  
  func notClosedButtonPressed(sender: AnyObject) {
  //    change color of button
  }
  
  func endCallButtonPressed(callView: CallView, sender: AnyObject) {
  // Load normal view with next LEAD
  }
}