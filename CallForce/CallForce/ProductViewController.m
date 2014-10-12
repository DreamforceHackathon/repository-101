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

@interface ProductViewController () <MDCSwipeToChooseDelegate>
@property (weak, nonatomic) IBOutlet UIImageView *imageView;
@property (weak, nonatomic) IBOutlet UITextView *summaryText;
@property (weak, nonatomic) IBOutlet UILabel *productNameLabel;
@property (weak, nonatomic) IBOutlet UILabel *companyNameLabel;
@property NSArray *products;
@property UIView *frontView;
@property UIView *backView;

@end

@implementation ProductViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.frontView = [[[NSBundle mainBundle] loadNibNamed:@"ProductView" owner:self options:nil] firstObject];
    // Do any additional setup after loading the view, typically from a nib.
    // You can customize MDCSwipeToChooseView using MDCSwipeToChooseViewOptions.
    MDCSwipeOptions *options = [MDCSwipeOptions new];
    options.delegate = self;
    
    /*
    options.onPan = ^(MDCPanState *state){
        if (state.thresholdRatio == 1.f && state.direction == MDCSwipeDirectionLeft) {
            NSLog(@"Let go now to delete the photo!");
        }
    };
     */
    
    [self addNewProductView:nil];
    
    [self.frontView mdc_swipeToChooseSetup:options];
    [self.view addSubview:self.frontView];
    
    //[self.summaryText setText:@"asdfasdfsdaf"];
    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
- (ProductView *)popProductViewWithFrame:(CGRect)frame {
    if ([self.people count] == 0) {
        return nil;
    }
    
    // UIView+MDCSwipeToChoose and MDCSwipeToChooseView are heavily customizable.
    // Each take an "options" argument. Here, we specify the view controller as
    // a delegate, and provide a custom callback that moves the back card view
    // based on how far the user has panned the front card view.
    MDCSwipeToChooseViewOptions *options = [MDCSwipeToChooseViewOptions new];
    options.delegate = self;
    options.threshold = 160.f;
    options.onPan = ^(MDCPanState *state){
        CGRect frame = [self backCardViewFrame];
        self.backCardView.frame = CGRectMake(frame.origin.x,
                                             frame.origin.y - (state.thresholdRatio * 10.f),
                                             CGRectGetWidth(frame),
                                             CGRectGetHeight(frame));
    };
    
    // Create a personView with the top person in the people array, then pop
    // that person off the stack.
    ChoosePersonView *personView = [[ChoosePersonView alloc] initWithFrame:frame
                                                                    person:self.people[0]
                                                                   options:options];
    [self.people removeObjectAtIndex:0];
    return personView;
}
 */

-(void) addNewProductView:(NSDictionary *)product {
    self.backView = [[[NSBundle mainBundle] loadNibNamed:@"ProductView" owner:self options:nil] firstObject];
    MDCSwipeOptions *options = [MDCSwipeOptions new];
    options.delegate = self;
    
    /*
     options.onPan = ^(MDCPanState *state){
     if (state.thresholdRatio == 1.f && state.direction == MDCSwipeDirectionLeft) {
     NSLog(@"Let go now to delete the photo!");
     }
     };
     */
    
    [self.backView mdc_swipeToChooseSetup:options];
    [self.view addSubview:self.backView];

}


#pragma mark - MDCSwipeToChooseDelegate Callbacks

// This is called then a user swipes the view fully left or right.
- (void)view:(UIView *)view wasChosenWithDirection:(MDCSwipeDirection)direction {
    if (direction == MDCSwipeDirectionLeft) {
        NSLog(@"Photo deleted!");
    } else {
        NSLog(@"Photo saved!");
    }
    
    self.frontView = self.backView;
    [self addNewProductView:nil];
    
}

@end
