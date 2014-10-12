import UIKit

class LeadController : UIViewController {
  @IBOutlet weak var menuButton: UIBarButtonItem!
  @IBOutlet weak var leadImage: UIImageView!
  @IBOutlet weak var productName: UILabel!
  @IBOutlet weak var productPrice: UILabel!
  @IBOutlet weak var leadName: UILabel!
  @IBOutlet weak var leadImageView: UIImageView!

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
}