import UIKit

class LeadController : UIViewController {
  @IBOutlet weak var menuButton: UIBarButtonItem!
  override func viewDidLoad() {
    super.viewDidLoad()
    
    menuButton.target = self.revealViewController()
    menuButton.action = Selector("revealToggle:")
    
    view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
    
    let avenirNext:UIFont = UIFont(name: "Avenir Next", size: 20)
    let titleDict:NSDictionary = [NSFontAttributeName: avenirNext,NSForegroundColorAttributeName: UIColor.whiteColor()]
    navigationController?.navigationBar.titleTextAttributes = titleDict
  }
}