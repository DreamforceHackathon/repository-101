import UIKit

class SideMenuController : UIViewController, UITableViewDataSource, UITableViewDelegate {
  @IBOutlet weak var gradientView: GradientView!
  @IBOutlet weak var profileImage: UIImageView!
  
  let blueColor = UIColor(red: 122/255, green: 103/255, blue: 175/255, alpha: 0.6).CGColor
  let purpleColor = UIColor(red: 84/255, green: 0.502, blue: 0.667, alpha: 0.6).CGColor
  
  let cellIdentifier = "Navigation"
  let navigation = ["Call": "icon-nav-phone", "Explore": "icon-nav-basket", "Profile": "icon-nav-person"]
  
  var leadController:UINavigationController!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    let colors:[AnyObject] = [blueColor, purpleColor]
    gradientView.drawGradient(colors)
    
    profileImage.layer.cornerRadius = profileImage.frame.size.width / 2
    profileImage.clipsToBounds = true
  }
  
  override func preferredStatusBarStyle() -> UIStatusBarStyle {
    return UIStatusBarStyle.LightContent
  }
  
  // UITableViewDataSource methods
  func numberOfSectionsInTableView(tableView: UITableView) -> Int {
    return 1
  }
  
  func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return navigation.count
  }
  
  func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
    var cell = tableView.dequeueReusableCellWithIdentifier(self.cellIdentifier, forIndexPath: indexPath) as NavigationTableViewCell
    let key = Array(navigation.keys)[indexPath.row]
    let icon = navigation[key]!
    
    cell.navLabel?.text = key
    cell.navImageView.image = UIImage(named: icon)
    
    
    return cell
  }
  
  
  //  UITableViewDelegate Methods
  func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath!) {
    var newFrontController:UIViewController
    let selectedNav:String = Array(navigation.keys)[indexPath.row]
    
    switch selectedNav {
    case "Call":
      let storyboard = UIStoryboard(name: "LeadController", bundle: nil)
      newFrontController = storyboard.instantiateInitialViewController() as UINavigationController
      
    case "Explore":
      let storyboard = UIStoryboard(name: "ProductViewController", bundle: nil)
      newFrontController = storyboard.instantiateInitialViewController() as UINavigationController
      
    case "Profile":
      let storyboard = UIStoryboard(name: "ProfileController", bundle: nil)
      newFrontController = storyboard.instantiateInitialViewController() as UINavigationController
      
    default:
      let storyboard = UIStoryboard(name: "LeadController", bundle: nil)
      newFrontController = storyboard.instantiateInitialViewController() as UINavigationController
    }
    self.revealViewController().pushFrontViewController(newFrontController, animated: true)
    
  }

}