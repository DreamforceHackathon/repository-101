import UIKit


protocol CallViewDelegate {
  func endCallButtonPressed(callView:CallView, sender: AnyObject)
  func notClosedButtonPressed(sender: AnyObject)
  func closedButtonPressed(sender: AnyObject)
//  func datePickerPressed(sender: AnyObject)
  
}

class CallView : UIView {
  @IBOutlet weak var dateLabel: UILabel!
  @IBOutlet weak var notClosedButton: UIButton!
  @IBOutlet weak var closedButton: UIButton!
  @IBOutlet weak var notesField: UITextView!
  
  var delegate: CallViewDelegate?
  
  
  @IBAction func notClosedButtonPressed(sender: AnyObject) {
    delegate?.notClosedButtonPressed(sender)
  }
  @IBAction func closedButtonPressed(sender: AnyObject) {
    delegate?.closedButtonPressed(sender)
  }
  
  @IBAction func endCallButtonPressed(sender: AnyObject) {
    delegate?.endCallButtonPressed(self, sender: sender)
  }
}

