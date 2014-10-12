//
//  ProductView.h
//  CallForce
//
//  Created by henrythe9th on 10/12/14.
//  Copyright (c) 2014 CallForce. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ProductView : UIView
@property (weak, nonatomic) IBOutlet UIImageView *productImageView;
@property (weak, nonatomic) IBOutlet UILabel *productName;
@property (weak, nonatomic) IBOutlet UILabel *companyName;
@property (weak, nonatomic) IBOutlet UITextView *productSummary;
@property (weak, nonatomic) IBOutlet UILabel *numCalls;
@property (weak, nonatomic) IBOutlet UILabel *price;
@property (weak, nonatomic) IBOutlet UILabel *earning;
@end