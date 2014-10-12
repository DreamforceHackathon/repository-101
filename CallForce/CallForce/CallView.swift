import UIKit


protocol CallViewDelegate {
  func endCallButtonPressed(callView:CallView, sender: AnyObject)
  func notClosedButtonPressed(sender: AnyObject)
  func closedButtonPressed(sender: AnyObject)
//  func datePickerPressed(sender: AnyObject)
  
}

class CallView : UIView, UITextViewDelegate, UITextFieldDelegate {
  @IBOutlet weak var dateLabel: UILabel!
  @IBOutlet weak var notClosedButton: UIButton!
  @IBOutlet weak var closedButton: UIButton!
  @IBOutlet weak var notesField: UITextView!
  
  var delegate: CallViewDelegate?
  
  override func awakeFromNib() {
    notesField.delegate = self
  }
  
  @IBAction func backgroundTapped(sender: AnyObject) {
    notesField.resignFirstResponder()
  }
  
  @IBAction func notClosedButtonPressed(sender: AnyObject) {
    let button = sender as UIButton
    
    button.backgroundColor = UIColor.grayColor()
    button.setTitleColor(UIColor.whiteColor(), forState: UIControlState.Normal)
    delegate?.notClosedButtonPressed(sender)
  }
  @IBAction func closedButtonPressed(sender: AnyObject) {
    let button = sender as UIButton
    
    
    button.backgroundColor = UIColor(red: 0.494, green: 0.827, blue: 0.129, alpha: 1)
    button.setTitleColor(UIColor.whiteColor(), forState: UIControlState.Normal)
    delegate?.closedButtonPressed(sender)
  }
  
  @IBAction func endCallButtonPressed(sender: AnyObject) {
    delegate?.endCallButtonPressed(self, sender: sender)
  }
  
  func textViewDidBeginEditing(textView: UITextView) {
    if textView.text == "Notes" {
      textView.text = ""
      textView.textColor = UIColor.blackColor()
    }
    
    textView.becomeFirstResponder()
  }
  
  func textViewDidChange(textView: UITextView) {
    if textView.text == "" {
      textView.text = "Notes"
      textView.textColor = UIColor.lightGrayColor()
    }
  }
  
  func textViewDidEndEditing(textView: UITextView) {
    if textView.text == "" {
      textView.text = "Notes"
      textView.textColor = UIColor.blackColor()
    }
    
    textView.resignFirstResponder()
  }
}

