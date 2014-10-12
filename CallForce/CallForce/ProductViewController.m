//
//  ProductViewController.m
//  CallForce
//
//  Created by henrythe9th on 10/11/14.
//  Copyright (c) 2014 CallForce. All rights reserved.
//

#import "ProductViewController.h"
#import <MDCSwipeToChoose/MDCSwipeToChoose.h>
#import "SWRevealViewController.h"
#import "Phone.h"
#import "ProductView.h"


@interface ProductViewController () <MDCSwipeToChooseDelegate>
@property (weak, nonatomic) IBOutlet UIImageView *imageView;
@property (weak, nonatomic) IBOutlet UITextView *summaryText;
@property (weak, nonatomic) IBOutlet UILabel *productNameLabel;
@property (weak, nonatomic) IBOutlet UILabel *companyNameLabel;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *menuButton;
@property NSArray *products;
@property int curProductIndex;
@property ProductView *frontView;
@property ProductView  *backView;
@end

@implementation ProductViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.products = [self createProducts];
    self.curProductIndex = 0;
    
    self.frontView = [[[NSBundle mainBundle] loadNibNamed:@"ProductView" owner:self options:nil] firstObject];
    // Do any additional setup after loading the view, typically from a nib.
    // You can customize MDCSwipeToChooseView using MDCSwipeToChooseViewOptions.
    MDCSwipeOptions *options = [MDCSwipeOptions new];
    options.delegate = self;
  
  self.menuButton.target = self.revealViewController;
  self.menuButton.action = @selector(revealToggle:);
  
  [self.view addGestureRecognizer:(self.revealViewController.panGestureRecognizer)];
  
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
    if (self.curProductIndex >= [self.products count] - 1) {
        self.curProductIndex = 0;
    }
    else {
        self.curProductIndex++;
    }
    self.backView = [[[NSBundle mainBundle] loadNibNamed:@"ProductView" owner:self options:nil] firstObject];
    
    NSDictionary *item = [self.products objectAtIndex:self.curProductIndex];
    
    self.backView.productImageView.image = [UIImage imageNamed:[item objectForKey:@"photoName"]];
    self.backView.productImageView.contentMode = UIViewContentModeScaleAspectFill;
    [self.backView.productImageView setClipsToBounds:YES];
    
    self.backView.productName.text = [item objectForKey:@"name"];
    self.backView.companyName.text = [item objectForKey:@"company"];
    self.backView.productSummary.text = [item objectForKey:@"description"];
    self.backView.price.text = [item objectForKey:@"price"];
    self.backView.numCalls.text = [item objectForKey:@"numLeads"];
    self.backView.earning.text = [item objectForKey:@"commission"];

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

- (NSArray *) createProducts {
    NSMutableArray *array = [[NSMutableArray alloc] init];
    
    NSDictionary *item = @{@"name": @"Renewal Facial Cream",
                           @"company": @"Olay",
                           @"description": @"This non-greasy, Oil-free formula has a Beta-Hydroxy Complex that renews dull, dry surface skin while Olay Moisture replenishes skin’s hydration.",
                           @"numLeads": @"973",
                           @"price": @"$30",
                           @"commission": @"20%",
                           @"photoName": @"olay",
                           };
    [array addObject:item];
    
    item = @{@"name": @"Meeting Knife Set",
                           @"company": @"Deglon",
                           @"description": @"The Deglon Meeting Knife Set is practical, durable and a work of art. Designed by Mia Schmallenbach and produced by Deglon, it won first prize in the 5th European Cutlery Design Award.",
                           @"numLeads": @"281",
                           @"price": @"$700",
                           @"commission": @"10%",
                           @"photoName": @"delgon",
                           };
    [array addObject:item];
    
    item = @{@"name": @"Bluetooth Speaker",
                           @"company": @"JBL",
                           @"description": @"With long-lasting battery life and Bluetooth technology, JBL portable wireless speakers are the best way to enjoy your music away from home.",
                           @"numLeads": @"236",
                           @"price": @"$200",
                           @"commission": @"10%",
                           @"photoName": @"jbl",
                           };
    [array addObject:item];
    
    item = @{@"name": @"Tesla Model S",
             @"company": @"Tesla",
             @"description": @"The world's first premium electric sedan. Designed from the ground up as an electric car, Model S provides an unprecedented driving range of up to 300 miles and can accelerate from 0 to 60 in 5.6 seconds without burning a drop of gasoline.",
             @"numLeads": @"543",
             @"price": @"$69000",
             @"commission": @"15%",
             @"photoName": @"tesla",
             };
    
    [array addObject:item];
    
    return [NSArray arrayWithArray:array];
    
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
