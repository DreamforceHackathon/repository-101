//
//  ProductViewController.m
//  CallForce
//
//  Created by henrythe9th on 10/11/14.
//  Copyright (c) 2014 CallForce. All rights reserved.
//

#import "ProductViewController.h"
#import <MDCSwipeToChoose/MDCSwipeToChoose.h>
#import "Phone.h"

@interface ProductViewController ()
@property (weak, nonatomic) IBOutlet UIImageView *imageView;
@property (weak, nonatomic) IBOutlet UITextView *summaryText;
@property (weak, nonatomic) IBOutlet UILabel *productNameLabel;
@property (weak, nonatomic) IBOutlet UILabel *companyNameLabel;

@end

@implementation ProductViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    // You can customize MDCSwipeToChooseView using MDCSwipeToChooseViewOptions.
    MDCSwipeOptions *options = [MDCSwipeOptions new];
    options.delegate = self;
    options.onPan = ^(MDCPanState *state){
        if (state.thresholdRatio == 1.f && state.direction == MDCSwipeDirectionLeft) {
            NSLog(@"Let go now to delete the photo!");
        }
    };
    
    [self.view mdc_swipe:options];
    
    [self.summaryText setText:@"asdfasdfsdaf"];
    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - MDCSwipeToChooseDelegate Callbacks

// This is called then a user swipes the view fully left or right.
- (void)view:(UIView *)view wasChosenWithDirection:(MDCSwipeDirection)direction {
    if (direction == MDCSwipeDirectionLeft) {
        NSLog(@"Photo deleted!");
    } else {
        NSLog(@"Photo saved!");
    }
    
    Phone *phone = [[Phone alloc] init];
    [phone connect:@"805-469-5940"];
    
}

@end
