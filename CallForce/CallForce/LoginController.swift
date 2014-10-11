import UIKit

class LoginController : UIViewController {
  @IBOutlet weak var gradientView: GradientView!
  
  
  let blueColor = UIColor(red: 122/255, green: 103/255, blue: 175/255, alpha: 0.6).CGColor
  let orangeColor = UIColor(red: 84/255, green: 0.502, blue: 0.667, alpha: 0.6).CGColor

  override func viewDidLoad() {
    super.viewDidLoad()
    
    let colors:[AnyObject] = [blueColor, orangeColor]
    gradientView.drawGradient(colors)
  }
  
  override func prefersStatusBarHidden() -> Bool {
    return true
  }
}